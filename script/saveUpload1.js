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
                    var systemType = api.systemType;
                    if(systemType == "ios"){
                      var pathAdd = path.substring(39,76);
                      $api.setStorage('pathAdd',pathAdd);
                    }
                    if (ret.eventType == 'left') {

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
                                    "format": userFormate,
                                    "size": userSize,
                                    "time": userTime,
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
                        var dialogBox = api.require('dialogBox');
                        dialogBox.close({
                            dialogName: 'alert'
                        });
                    }
                    if (ret.eventType == 'right') {
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
                                      "format": userFormate,
                                      "size": userSize,
                                      "time": userTime,
                                  }
                              }
                          }, function(ret, err) {
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
                        var dialogBox = api.require('dialogBox');
                        dialogBox.close({
                            dialogName: 'alert'
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
