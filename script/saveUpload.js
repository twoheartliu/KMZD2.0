//保存
function fnLuYinBaoCun() {
    if (a == 2) {
        //fs 文件管理 删除  拷贝  移除等
        //拷贝文件
        if (path) {
            if (c > 9) {
                var dialogBox = api.require('dialogBox');
                dialogBox.alert({
                    texts: {
                        title: '选择保存方式',
                        content: '保存后将清除试听文件',
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
                            color: '#000',
                            size: 12
                        },
                        right: {
                            marginB: 7,
                            marginL: 10,
                            w: 130,
                            h: 35,
                            corner: 2,
                            bg: '#f2f2f2',
                            color: '#000',
                            size: 12
                        }
                    },
                    tapClose: true
                }, function(ret) {
                    var timestampssss = new Date().getTime();
                    if (ret.eventType == 'left') {
                        var fs = api.require('fs');
                        fs.copyTo({
                            oldPath: path,
                            newPath: 'fs://caogaoxiang'
                        }, function(ret, err) {
                          // console.log(111);
                            var paths = 'fs://caogaoxiang/' + timestamps + jubenid;
                            if (ret.status) {
                                var fs = api.require('fs');

                                fs.rename({
                                    oldPath: paths,
                                    newPath: 'fs://caogaoxiang/' + timestampssss + jubenid
                                }, function(ret, err) {
                                  // console.log(222);
                                    if (ret.status) {
                                      console.log(666666);
                                        api.toast({              
                                            msg:   '已保存',
                                            duration:  2000,
                                            location:   'middle'          
                                        });

                                        fs.rmdir({
                                            path: 'fs://luyin'
                                        }, function(ret, err) {
                                            if (ret.status) {
                                              console.log(8888);
                                                // alert(JSON.stringify(ret));
                                            } else {
                                                alert(JSON.stringify(err));
                                            }
                                        });
                                        path = '';
                                        timeCsss();

                                    } else {
                                        alert(JSON.stringify(err));
                                    }
                                });
                            } else {
                                alert(JSON.stringify(err));
                            }
                        });
                        cgxid = '' + timestampssss + '' + jubenid + '';
                        api.getPrefs({
                            key: 'cgxlist'
                        }, function(ret, err) {
                            if (ret) {
                                var flag = false; //是否增加历史记录
                                var historyUrlText = ret.value;
                                var historyUrlArray = historyUrlText.split(',');
                                for (var i = 0; i < historyUrlArray.length; i++) {
                                    historyUrlArray[i] == cgxid && (flag = true);
                                }!flag && historyUrlArray.splice(1, 0, cgxid, title, name, body, author_id);
                                !flag && api.setPrefs({
                                    key: 'cgxlist',
                                    value: historyUrlArray.join(',')
                                });
                            } else {
                                // alert(JSON.stringify(err));
                            }
                        });
                        var dialogBox = api.require('dialogBox');
                        dialogBox.close({
                            dialogName: 're'
                        });
                    }
                    if (ret.eventType == 'right') {
                      var connectionType = api.connectionType;
                      	if(connectionType == "none"){
                          api.toast({              
                              msg: '请先连接网络',
                              duration:  2000,
                              location:   'middle'          
                          });
                      	}else{
                          var fs = api.require('fs');
                          console.log(path);
                          console.log(timestamps);
                          fs.copyTo({
                              oldPath: path,
                              newPath: 'fs://shangchuanxiang'
                          }, function(ret, err) {
                              var paths = 'fs://shangchuanxiang/' + timestamps + jubenid;
                              console.log(JSON.stringify(ret));
                              console.log(JSON.stringify(err));
                              console.log(path);
                              console.log(timestamps);
                              if (ret.status) {
                                  fs.rename({
                                      oldPath: paths,
                                      newPath: 'fs://shangchuanxiang/' + timestamp + jubenid + '.amr'
                                  }, function(ret, err) {
                                    console.log(JSON.stringify(ret));
                                    console.log(JSON.stringify(err));
                                      if (ret.status) {

                                          // alert('已上传');
                                          uri = '/upload/user_records';
                                          api.ajax({
                                              url: host + apiUri + uri,
                                              method: 'post',
                                              dataType: 'json',
                                              timeout:10,
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
                                            console.log(JSON.stringify(ret));
                                            console.log(JSON.stringify(err));
                                            if(ret){
                                              if (ret.status == 200) {
                                                  // console.log(ret.status);
                                                  fs.rmdir({
                                                      path: 'fs://shangchuanxiang'
                                                  }, function(ret, err) {
                                                      if (ret.status) {} else {
                                                          alert(JSON.stringify(err));
                                                      }
                                                  });
                                                  fs.rmdir({
                                                      path: 'fs://luyin'
                                                  }, function(ret, err) {
                                                      if (ret.status) {} else {
                                                          alert(JSON.stringify(err));
                                                      }
                                                  });
                                                  path = '';
                                                  timeCsss();

                                                  uri = '/user/records';
                                                  api.ajax({
                                                      url: host + apiUri + uri,
                                                      method: 'post',
                                                      dataType: 'json',
                                                      timeout:10,
                                                      headers: {
                                                          "source": api.systemType,
                                                          "version": version,
                                                          "session": token
                                                      },
                                                      data: {
                                                          values: {
                                                              "script_id": jubenid,
                                                              "title": name,
                                                              "author_id": author_id,
                                                              "lyric": body,
                                                              "records": ret.data.records,
                                                              "format": ret.data.formate,
                                                              "size": ret.data.size,
                                                              "time": ret.data.time,
                                                          }
                                                      }
                                                  }, function(ret, err) {
                                                      // console.log(JSON.stringify(ret));
                                                      if(ret){
                                                        if (ret.status == 200) {
                                                            api.toast({              
                                                                msg:   '已上传',
                                                                duration:  2000,
                                                                location:   'middle'          
                                                            });

                                                        } else {
                                                            netMessage(ret);
                                                        }
                                                      }else{
                                                        netWork(err);
                                                      }
                                                  });
                                              } else {

                                                  netMessage(ret);
                                              }
                                            }else{
                                              netWork(err);
                                            }
                                          });



                                      } else {
                                        console.log(111);
                                          alert(JSON.stringify(err));
                                      }
                                  });
                              } else {
                                console.log(222);
                                  alert(JSON.stringify(err));
                              }
                          });
                      	}
                        var dialogBox = api.require('dialogBox');
                        dialogBox.close({
                            dialogName: 're'
                        });
                    }
                });
            } else {
                // alert(JSON.stringify(ret.message));
                timeCsss();
                var fs = api.require('fs');
                api.toast({              
                    msg:   '录制时间较短，请重新录制',
                    duration:  2000,
                    location:   'middle'          
                });
                fs.rmdir({
                    path: 'fs://luyin'
                }, function(ret, err) {
                    if (ret.status) {} else {
                        // alert(JSON.stringify(err));
                    }
                });
            }
        } else {
            api.toast({              
                msg:   '请先录音',
                duration:  2000,
                location:   'middle'          
            });
        }

    } else {
        fnAletrssss();
    }
}
function timeCsss(){
  var stylelist = $api.byId('appTime');
  var stylelists = $api.byId('totalTime');
  var htmls = '00:00';
  $api.html(stylelists, htmls);
  c = 0;
  // c = c + 1;
  var temp = c;
  minute = parseInt(temp / 60);
  if (c < 10) {
      var html = "0" + minute + ":0" + c + "";
  } else if (9 < c) {
      if (c < 60) {
          var html = "0" + minute + ":" + c + "";
      } else {
          var m = c - minute * 60;
          if (minute < 10) {
              if (m == 0) {
                  var html = "0" + minute + ":00";
              } else {
                  if (m < 10) {
                      var html = "0" + minute + ":0" + m + "";
                  } else {
                      var html = "0" + minute + ":" + m + "";
                  }

              }
          } else {
              if (m == 0) {
                  var html = "" + minute + ":00";
              } else {
                  if (m < 10) {
                      var html = "" + minute + ":0" + m + "";
                  } else {
                      var html = "" + minute + ":" + m + "";
                  }

              }
          }
      }
  }
  $api.html(stylelist, html);
}
