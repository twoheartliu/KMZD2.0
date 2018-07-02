//保存
function fnLuYinBaoCun() {
  var loadEffect = $api.byId('loadEffect');
  htmlloadEffect = '<div class="loadEffect"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>'
  $api.html(loadEffect, htmlloadEffect);
  // api.toast({              
  //     msg:   '正在保存，请稍后...',
  //     duration:  500,
  //     location:   'middle'          
  // });
  setTimeout(function(){
    if (a == 2) {
      // 刚开始的时候加载loading

        //fs 文件管理 删除  拷贝  移除等
        //拷贝文件
        if (path) {
            if (c > 9) {
              api.confirm({
                  title: '选择保存方式',
                  msg: '保存后将清除试听文件',
                  buttons: ['草稿箱', '发布作品']
              }, function(ret, err) {
                var systemType = api.systemType;
                if(systemType == "ios"){
                  var pathAdd = path.substring(39,76);
                  $api.setStorage('pathAdd',pathAdd);
                }
                  var index = ret.buttonIndex;
                  if (index == 1) {
                    if(userId){
                      uri = '/user/save_drafts/' + draftsId;
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
                                  "title": title,
                                  "author_id": author_id,
                                  "lyric": body,
                                  "records": userRecords,
                                  "format": userTime,
                                  "size": userFormate,
                                  "time": userSize,
                              }
                          }
                      }, function(ret, err) {
                          if(ret){
                            if (ret.status == 200) {
                              // 刚开始的时候加载loading
                              var loadEffect = $api.byId('loadEffect');
                              htmlloadEffect = ''
                              $api.html(loadEffect, htmlloadEffect);
                                api.toast({              
                                    msg:   '已保存',
                                    duration:  2000,
                                    location:   'middle'          
                                });
                                var fs = api.require('fs');
                                fs.rmdir({
                                    path: 'fs://luyin'
                                }, function(ret, err) {
                                    if (ret.status) {} else {
                                        // alert(JSON.stringify(err));
                                    }
                                });
                                path = '';
                                timeCsss();
                            } else {
                                netMessage(ret);
                            }
                          }else{
                            netWork(err);
                          }
                      });
                      return false;
                    }
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
                              records: path
                          }
                      }
                    }, function(ret, err) {
                    if(ret){
                      if (ret.status == 200) {
                          uri = '/user/save_drafts/' + ret.data.drafts_id;
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
                                      "title": title,
                                      "author_id": author_id,
                                      "lyric": body,
                                      "records": ret.data.records,
                                      "format": ret.data.formate,
                                      "size": ret.data.size,
                                      "time": ret.data.time,
                                  }
                              }
                          }, function(ret, err) {
                              if(ret){
                                if (ret.status == 200) {
                                    api.toast({              
                                        msg:   '已保存',
                                        duration:  2000,
                                        location:   'middle'          
                                    });
                                    var fs = api.require('fs');
                                    fs.rmdir({
                                        path: 'fs://luyin'
                                    }, function(ret, err) {
                                        if (ret.status) {} else {
                                            // alert(JSON.stringify(err));
                                        }
                                    });
                                    path = '';
                                    timeCsss();
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
                    if(userId){
                      // console.log(title);
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
                                  "title": title,
                                  "author_id": author_id,
                                  "lyric": body,
                                  "records": userRecords,
                                  "format": userTime,
                                  "size": userFormate,
                                  "time": userSize,
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
                                var fs = api.require('fs');
                                fs.rmdir({
                                    path: 'fs://luyin'
                                }, function(ret, err) {
                                    if (ret.status) {} else {
                                        // alert(JSON.stringify(err));
                                    }
                                });
                                path = '';
                                timeCsss();
                            } else {
                                netMessage(ret);
                            }
                          }else{
                            netWork(err);
                          }
                      });
                      return false;
                    }


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
                                  records: path
                              }
                          }
                      }, function(ret, err) {
                        if(ret){
                          if (ret.status == 200) {
                              // console.log(ret.status);

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
                                          "title": title,
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
                                        var fs = api.require('fs');
                                        fs.rmdir({
                                            path: 'fs://luyin'
                                        }, function(ret, err) {
                                            if (ret.status) {} else {
                                                alert(JSON.stringify(err));
                                            }
                                        });
                                        path = '';
                                        timeCsss();
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
          console.log(JSON.stringify(path));
            api.toast({              
                msg:   '请先录音',
                duration:  2000,
                location:   'middle'          
            });
        }

    } else {
        fnAletrssss();
    }
  },500)

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
