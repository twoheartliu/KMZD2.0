//保存
function fnLuYinBaoCun() {
    var dialogBox = api.require('dialogBox');
    dialogBox.alert({
        texts: {
            content: '选择保存方式',
            leftBtnTitle: '草稿箱',
            rightBtnTitle: '发布作品'
        },
        styles: {
            bg: '#fff',
            w: 300,
            title: {
                marginT: 20,
                icon: 'widget://res/gou.png',
                iconSize: 40,
                titleSize: 14,
                titleColor: '#000'
            },
            content: {
                color: '#000',
                size: 14
            },
            left: {
                marginB: 7,
                marginL: 20,
                w: 130,
                h: 35,
                corner: 2,
                bg: '#f2f2f2',
                color:'#000',
                size: 12
            },
            right: {
                marginB: 7,
                marginL: 10,
                w: 130,
                h: 35,
                corner: 2,
                bg: '#f2f2f2',
                color:'#000',
                size: 12
            }
        },
        tapClose: true
    }, function(ret) {
        if (ret.eventType == 'left') {
          if(a == 2){
            //fs 文件管理 删除  拷贝  移除等
            //拷贝文件
            if(path){
              var fs = api.require('fs');
              fs.copyTo({
                  oldPath: path,
                  newPath: 'fs://caogaoxiang'
              }, function(ret, err) {
                  var paths = 'fs://caogaoxiang/' + timestamps + jubenid;
                  if (ret.status) {
                    var fs = api.require('fs');
                    fs.rename({
                      oldPath: paths,
                      newPath: 'fs://caogaoxiang/' + timestamp + jubenid
                    }, function(ret, err) {
                      if (ret.status) {
                          alert('已保存');
                          fs.rmdir({
                              path: 'fs://luyin'
                          }, function(ret, err) {
                              if (ret.status) {
                                  // alert(JSON.stringify(ret));
                              } else {
                                  alert(JSON.stringify(err));
                              }
                          });
                      } else {
                          alert(JSON.stringify(err));
                      }
                    });
                  } else {
                      alert(JSON.stringify(err));
                  }
              });
                cgxid = ''+ timestamp + '' + jubenid + '';
              api.getPrefs({
                  key: 'cgxlist'
              }, function(ret, err) {
                  if (ret) {
                      var flag = false; //是否增加历史记录
                      var historyUrlText = ret.value;
                      var historyUrlArray = historyUrlText.split(',');
                      for (var i = 0; i < historyUrlArray.length; i++) {
                          historyUrlArray[i] == cgxid && (flag = true);
                      }!flag && historyUrlArray.splice(1, 0, cgxid,title,name,body);
                      !flag && api.setPrefs({
                          key: 'cgxlist',
                          value: historyUrlArray.join(',')
                      });
                  } else {
                      alert(JSON.stringify(err));
                  }
              });

            }else{
              alert("请先录音");
            }

          }else{
            fnAletrssss();
          }

            var dialogBox = api.require('dialogBox');
            dialogBox.close({
                dialogName: 're'
            });
        }
        if(ret.eventType == 'right'){
          if(a == 2){
            //fs 文件管理 删除  拷贝  移除等
            //拷贝文件
            if(path){
              var fs = api.require('fs');
              fs.copyTo({
                  oldPath: path,
                  newPath: 'fs://shangchuanxiang'
              }, function(ret, err) {
                  var paths = 'fs://shangchuanxiang/' + timestamps + jubenid;
                  if (ret.status) {
                      fs.rename({
                          oldPath: paths,
                          newPath: 'fs://shangchuanxiang/' + timestamp + jubenid + '.amr'
                      }, function(ret, err) {
                          if (ret.status) {
                              // alert('已上传');
                              uri = '/upload/user_records';
                              api.ajax({
                                  url: host + apiUri + uri,
                                  method: 'post',
                                  dataType: 'json',
                                  headers: {
                                      "source": api.systemType,
                                      "version": version,
                                      "session": token
                                  },
                                  data: {
                                      files: {
                                          records: 'fs://shangchuanxiang/' + timestamp + jubenid + '.amr'
                                      }
                                  }
                              }, function(ret, err) {
                                  // console.log('fs://shangchuanxiang/' + timestamp + jubenid + '.amr');
                                  // console.log(JSON.stringify(ret));
                                  if (ret.status == 200) {
                                      // console.log(ret.status);
                                      fs.rmdir({
                                          path: 'fs://shangchuanxiang'
                                      }, function(ret, err) {
                                          if (ret.status) {
                                          } else {
                                              alert(JSON.stringify(err));
                                          }
                                      });
                                      fs.rmdir({
                                          path: 'fs://luyin'
                                      }, function(ret, err) {
                                          if (ret.status) {
                                          } else {
                                              alert(JSON.stringify(err));
                                          }
                                      });
                                      uri = '/user/records';
                                      api.ajax({
                                          url: host + apiUri + uri,
                                          method: 'post',
                                          dataType: 'json',
                                          headers: {
                                              "source": api.systemType,
                                              "version": version,
                                              "session": token
                                          },
                                          data: {
                                              values: {
                                                  "script_id":jubenid,
                                                  "title": name,
                                                  "author_id":5177,
                                                  "lyric": body,
                                                  "records": ret.data.records,
                                                  "format": ret.data.formate,
                                                  "size": ret.data.size,
                                                  "time": ret.data.time,
                                              }
                                          }
                                      }, function(ret, err) {
                                        // console.log(JSON.stringify(ret));
                                          if (ret.status == 200) {
                                          alert('已上传');

                                          } else {

                                          }
                                      });
                                  } else {

                                  }
                              });



                          } else {
                              alert(JSON.stringify(err));
                          }
                      });
                  } else {
                      alert(JSON.stringify(err));
                  }
              });
            }else{
              alert("请先录音");
            }

          }else{
            fnAletrssss();
          }
          var dialogBox = api.require('dialogBox');
          dialogBox.close({
              dialogName: 're'
          });
        }
    });
}
