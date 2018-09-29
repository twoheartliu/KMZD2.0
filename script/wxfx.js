//shareType  分享类型
//session（会话）
//timeline（朋友圈）
//favorite（收藏）
var token;
token = $api.getStorage('token');
var Single;
Single = 'http://m.kmzhidao.com' + '/share/share1.html?id='
// 专辑
var Listening;
 Listening = 'http://m.kmzhidao.com' + '/share/share11.html?id='
// 听单
var Album ;
Album  =  'http://m.kmzhidao.com' +'/share/share111.html?id='
// 分享单曲
// 分享微信
function shareMp3Single(songListID,title,savePath) {
    var wx = api.require('wx');
            // // 单曲
            // var Single = playHost + '/kmzd/m/share1.html?id='
            // // 专辑
            // var Listening = playHost + '/kmzd/m/share11.html?id='
            // // 听单
            // var Album  =  playHost +'/kmzd/m/share111.html?id='
              var wx = api.require('wx');
              var savePaths;
              if (!savePath) {
                // console.log(10);
                savePaths = 'fs://image/my/fnShareImg.jpg'
                // host + 'logo_144x144.png'
              }else {

                  savePaths =  savePath
              }
              var listening_description;

              listening_description = listening_description ? listening_description : '习孔孟之道，做有德之人。';
              // console.log(songListID);
              // console.log(title);
              // console.log(savePaths);
              // console.log(listening_description);
              // console.log(Single+songListID);
              wx.shareWebpage({
                  apiKey: '',
                  scene: 'session',
                  title: title,
                  description: listening_description,
                  thumb: savePaths,
                  contentUrl: Single+songListID
              }, function(ret, err) {
                  if (ret) {
                          api.ajax({
                            url: host + apiUri + '/extra/share',
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
                                      id: songListID,
                                      model: 'book',
                                      share_to:'wechat'
                                  }
                              }
                          },function(ret, err){
                              if (ret) {
                                api.addEventListener({
                                    name:'resume'
                                }, function(ret, err){
                                  api.toast({
                                      msg: '分享成功',
                                      duration: 2000,
                                      location: 'middle'
                                  });
                                });
                              } else {

                              }
                          });
                  } else {
                    api.toast({
                        msg: '分享失败',
                        duration: 2000,
                        location: 'middle'
                    });
                  }
              });
}
// QQ
function fnintnQQSingle(songListID,title,savePath) {

  var smas;
  if (savePath == 'undefined' ) {
    smas = playHost + '/logo_144x144.png'
    // fnOpenPlayShare(id, titleName,sma);
  }else {
    // fnOpenPlayShare(id, titleName,sma);
    smas = savePath
  }

  // // 单曲
  // var Single = playHost + '/kmzd/m/share1.html?id='
  // // 专辑
  // var Listening = playHost + '/kmzd/m/share11.html?id='
  // // 听单
  // var Album  =  playHost +'/kmzd/m/share111.html?id='
  var qq = api.require('qq');
  var listening_description = listening_description ? listening_description : '习孔孟之道，做有德之人。';
  qq.shareNews({
      url: Single+songListID,
      title: title,
      description: listening_description,
      imgUrl: smas
  });

  api.ajax({
    url: host + apiUri + '/extra/share',
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
              id: songListID,
              model: 'book',
              share_to:'q_zone'
          }
      }
  },function(ret, err){
      if (ret) {
        api.addEventListener({
            name:'resume'
        }, function(ret, err){
          api.toast({
              msg: '分享成功',
              duration: 2000,
              location: 'middle'
          });
        });
      } else {
        api.toast({
            msg: '分享成功',
            duration: 2000,
            location: 'middle'
        });
      }
  });
  // var qq = api.require('qq');
  //   qq.shareNews({
  //       url: 'http://baidu.com',
  //       title: title,
  //       description: '',
  //       imgUrl: ''
  //   });
}
// 微信评友圈
function initTimelineSingle(songListID,title,savePath) {

    var wx = api.require('wx');
    // 单曲
    // var Single = playHost + '/kmzd/m/share1.html?id='
    // // 专辑
    // var Listening = playHost + '/kmzd/m/share11.html?id='
    // // 听单
    // var Album  =  playHost +'/kmzd/m/share111.html?id='
    var savePaths;
    if (!savePath) {
      // console.log(10);
      savePaths = 'fs:/image/my/fnShareImg.jpg'
    }else {
        savePaths = savePath
    }
    var listening_description;

    listening_description = listening_description ? listening_description : '习孔孟之道，做有德之人。';

    wx.shareWebpage({
        apiKey: '',
        scene: 'timeline',
        title: title,
        description: listening_description,
        thumb: savePaths,
        contentUrl: Single+songListID
    }, function(ret, err) {
        if (ret) {

          api.ajax({
            url: host + apiUri + '/extra/share',
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
                      id: songListID,
                      model: 'book',
                      share_to:'we_friends'
                  }
              }
          },function(ret, err){
              if (ret) {
                api.addEventListener({
                    name:'resume'
                }, function(ret, err){

                  api.toast({
                      msg: '分享成功',
                      duration: 2000,
                      location: 'middle'
                  });
                });
              } else {
                api.toast({
                    msg: '失败',
                    duration: 2000,
                    location: 'middle'
                });
              }
          });
        } else {
            api.toast({
                msg: '分享失败',
                duration: 2000,
                location: 'middle'
            });
        }
    });

}
// QQ空间
function fnQQZoneSingle(songListID,title,savePath) {
  // alert(1);
  // 单曲
  // var Single = playHost + '/kmzd/m/share1.html?id='
  // // 专辑
  // var Listening = playHost + '/kmzd/m/share11.html?id='
  // // 听单
  // var Album  =  playHost +'/kmzd/m/share111.html?id='
  var qq = api.require('qq');
  var listening_description;

  listening_description = listening_description ? listening_description : '习孔孟之道，做有德之人。';
  qq.shareNews({
      type: 'QFriend',
      url: Single+songListID,
      title: title,
      description: listening_description,
      imgUrl: savePath
      // 'http://47.100.11.38/logo_144x144.png'
  });

  api.ajax({
    url: host + apiUri + '/extra/share',
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
              id: songListID,
              model: 'book',
              share_to:'qq'
          }
      }
  },function(ret, err){
      if (ret) {
        api.addEventListener({
            name:'resume'
        }, function(ret, err){
          api.toast({
              msg: '分享成功',
              duration: 2000,
              location: 'middle'
          });
        });
          // console.log( JSON.stringify( ret ) );
      } else {
        api.toast({
            msg: '失败',
            duration: 2000,
            location: 'middle'
        });
      }
  });
  // var qq = api.require('qq');
  //   qq.shareNews({
  //       url: 'http://baidu.com',
  //       title: title,
  //       description: '',
  //       imgUrl: ''
  //   });
}

// 分享听单
// 分享微信
function shareMp3Listening(name,listening_description,l_id,savePath) {
    var wx = api.require('wx');
  // 单曲
  // var Single = playHost + '/kmzd/m/share1.html?id='
  // // 专辑
  // var Listening = playHost + '/kmzd/m/share11.html?id='
  // // 听单
  // var Album  =  playHost +'/kmzd/m/share111.html?id='
    var wx = api.require('wx');
    var listening_description;

    listening_description = listening_description ? listening_description : '习孔孟之道，做有德之人。';
    wx.shareWebpage({
        apiKey: '',
        scene: 'session',
        title: name,
        description: listening_description,
        thumb: savePath,
        contentUrl: Album + l_id
    }, function(ret, err) {
        if (ret) {
          api.ajax({
            url: host + apiUri + '/extra/share',
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
                      id: l_id,
                      model: 'listen',
                      share_to:'wechat'
                  }
              }
          },function(ret, err){
              if (ret) {
                api.addEventListener({
                    name:'resume'
                }, function(ret, err){
                  api.toast({
                      msg: '分享成功',
                      duration: 2000,
                      location: 'middle'
                  });
                });
                  // console.log( JSON.stringify( ret ) );
              } else {
                api.toast({
                    msg: '失败',
                    duration: 2000,
                    location: 'middle'
                });
              }
          });
          // var fs = api.require('fs');
          // fs.remove({
          //     path: 'fs:' + savePath
          // }, function(ret, err) {
          //     if (ret.status) {
          //       api.toast({
          //           msg: '分享成功',
          //           duration: 2000,
          //           location: 'middle'
          //       });
          //     } else {
          //       api.toast({
          //           msg: '分享失败',
          //           duration: 2000,
          //           location: 'middle'
          //       });
          //     }
          // });
        } else {
            api.toast({
                msg: '分享失败',
                duration: 2000,
                location: 'middle'
            });
        }
    });

}
// QQ
function fnintnQQListening(name,listening_description,l_id,savePath) {
  // var TypesAll;
  // 单曲
  // var Single = playHost + '/kmzd/m/share1.html?id='
  // // 专辑
  // var Listening = playHost + '/kmzd/m/share11.html?id='
  // // 听单
  // var Album  =  playHost +'/kmzd/m/share111.html?id='
  // }
  var listening_description;

      listening_description = listening_description ? listening_description : '习孔孟之道，做有德之人。';

    var qq = api.require('qq');
    qq.shareNews({
        url: Album + l_id,
        title: name,
        description: listening_description,
        imgUrl: imgUrlListening_cover
    });
    api.ajax({
      url: host + apiUri + '/extra/share',
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
                id: songListID,
                model: 'listen',
                share_to:'qq'
            }
        }
    },function(ret, err){
        if (ret) {
          api.addEventListener({
              name:'resume'
          }, function(ret, err){
            api.toast({
                msg: '分享成功',
                duration: 2000,
                location: 'middle'
            });
          });
            // console.log( JSON.stringify( ret ) );
        } else {
          api.toast({
              msg: '失败',
              duration: 2000,
              location: 'middle'
          });
        }
    });
}
// 微信评友圈
function initTimelineListening(name,listening_description,l_id,savePath) {
      // 单曲
      // var Single = playHost + '/kmzd/m/share1.html?id='
      // // 专辑
      // var Listening = playHost + '/kmzd/m/share11.html?id='
      // // 听单
      // var Album  =  playHost +'/kmzd/m/share111.html?id='
      var listening_description;

      listening_description = listening_description ? listening_description : '习孔孟之道，做有德之人。';
        var wx = api.require('wx');
        wx.shareWebpage({
            apiKey: '',
            scene: 'timeline',
            title: name,
            description: listening_description,
            thumb:  savePath,
            contentUrl: Album + l_id
        }, function(ret, err) {
            if (ret) {
              api.ajax({
                url: host + apiUri + '/extra/share',
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
                          id: songListID,
                          model: 'listen',
                          share_to:'we_friends'
                      }
                  }
              },function(ret, err){
                  if (ret) {
                    api.addEventListener({
                        name:'resume'
                    }, function(ret, err){
                      api.toast({
                          msg: '分享成功',
                          duration: 2000,
                          location: 'middle'
                      });
                    });
                      // console.log( JSON.stringify( ret ) );
                  } else {
                    api.toast({
                        msg: '失败',
                        duration: 2000,
                        location: 'middle'
                    });
                  }
              });
              // var fs = api.require('fs');
              // fs.rmdir({
              //     path: savePath
              // }, function(ret, err) {
              //     if (ret.status) {
              //       api.toast({
              //           msg: '分享成功',
              //           duration: 2000,
              //           location: 'middle'
              //       });
              //     } else {
              //       api.toast({
              //           msg: '分享失败',
              //           duration: 2000,
              //           location: 'middle'
              //       });
              //     }
              // });
            } else {
                api.toast({
                    msg: '分享失败',
                    duration: 2000,
                    location: 'middle'
                });
            }
        });

}
// QQ空间
function fnQQZoneListening(name,listening_description,l_id,savePath) {
  // var TypesAll;
  // 单曲
  // var Single = playHost + '/kmzd/m/share1.html?id='
  // // 专辑
  // var Listening = playHost + '/kmzd/m/share11.html?id='
  // // 听单
  // var Album  =  playHost +'/kmzd/m/share111.html?id='
  // }
  var listening_description;

  listening_description = listening_description ? listening_description : '习孔孟之道，做有德之人。';
    var qq = api.require('qq');
    qq.shareNews({
        type: 'QFriend',
        url: Album + l_id,
        title: name,
        description: listening_description,
        imgUrl: imgUrlListening_cover,

    });
    api.ajax({
      url: host + apiUri + '/extra/share',
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
                id: l_id,
                model: 'listen',
                share_to:'q_zone'
            }
        }
    },function(ret, err){
        if (ret) {
          api.addEventListener({
              name:'resume'
          }, function(ret, err){
            api.toast({
                msg: '分享成功',
                duration: 2000,
                location: 'middle'
            });
          });
            // console.log( JSON.stringify( ret ) );
        } else {
          api.toast({
              msg: '失败',
              duration: 2000,
              location: 'middle'
          });
        }
    });
}


// 分享专辑
// 分享微信
function shareMp3Album(name,listening_description,l_id,savePath) {
  var listening_description;

  listening_description = listening_description ? listening_description : '习孔孟之道，做有德之人。';
                        // 单曲
    // var Single = playHost + '/kmzd/m/share1.html?id='
    // // 专辑
    // var Listening = playHost + '/kmzd/m/share11.html?id='
    // // 听单
    // var Album  =  playHost +'/kmzd/m/share111.html?id='
    var wx = api.require('wx');
    wx.shareWebpage({
        apiKey: '',
        scene: 'session',
        title: name,
        description: listening_description,
        thumb: savePath,
        contentUrl: Listening + l_id
    }, function(ret, err) {
        if (ret) {
          api.ajax({
            url: host + apiUri + '/extra/share',
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
                      id: l_id,
                      model: 'album',
                      share_to:'wechat'
                  }
              }
          },function(ret, err){
              console.log(JSON.stringify(ret));
              if (ret) {
                api.addEventListener({
                    name:'resume'
                }, function(ret, err){
                  api.toast({
                      msg: '分享成功',
                      duration: 2000,
                      location: 'middle'
                  });
                });
                  // console.log( JSON.stringify( ret ) );
              } else {
                api.toast({
                    msg: '失败',
                    duration: 2000,
                    location: 'middle'
                });
              }
          });
          // var fs = api.require('fs');
          // fs.rmdir({
          //     path: savePath
          // }, function(ret, err) {
          //     if (ret.status) {
          //       api.toast({
          //           msg: '分享成功',
          //           duration: 2000,
          //           location: 'middle'
          //       });
          //     } else {
          //       api.toast({
          //           msg: '分享失败',
          //           duration: 2000,
          //           location: 'middle'
          //       });
          //     }
          // });
        } else {
          api.toast({
              msg: '分享失败',
              duration: 2000,
              location: 'middle'
          });
        }
    });

}
// QQ
function fnintnQQAlbum(name,listening_description,l_id,savePath) {
  var listening_description;

  listening_description = listening_description ? listening_description : '习孔孟之道，做有德之人。';
  // 单曲
  // var Single = playHost + '/kmzd/m/share1.html?id='
  // // 专辑
  // var Listening = playHost + '/kmzd/m/share11.html?id='
  // // 听单
  // var Album  =  playHost +'/kmzd/m/share111.html?id='
    var qq = api.require('qq');
    qq.shareNews({
        url: Listening + l_id,
        title: name,
        description: listening_description,
        imgUrl: savePath
    });
    api.ajax({
      url: host + apiUri + '/extra/share',
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
                id: l_id,
                model: 'album',
                share_to:'qq'
            }
        }
    },function(ret, err){
        if (ret) {
          api.addEventListener({
              name:'resume'
          }, function(ret, err){
            api.toast({
                msg: '分享成功',
                duration: 2000,
                location: 'middle'
            });
          });
            // console.log( JSON.stringify( ret ) );
        } else {
          api.toast({
              msg: '失败',
              duration: 2000,
              location: 'middle'
          });
        }
    });
}
// 微信评友圈
function initTimelineAlbum(name,listening_description,l_id,savePath) {
          var listening_description;

          listening_description = listening_description ? listening_description : '习孔孟之道，做有德之人。';
          // 单曲
          // var Single = playHost + '/kmzd/m/share1.html?id='
          // // 专辑
          // var Listening = playHost + '/kmzd/m/share11.html?id='
          // // 听单
          // var Album  =  playHost +'/kmzd/m/share111.html?id='
            var wx = api.require('wx');
            wx.shareWebpage({
                apiKey: '',
                scene: 'timeline',
                title: name,
                description: listening_description,
                thumb: savePath,
                contentUrl: Listening + l_id
            }, function(ret, err) {
                if (ret) {
                  api.ajax({
                    url: host + apiUri + '/extra/share',
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
                              id: l_id,
                              model: 'album',
                              share_to:'we_friends'
                          }
                      }
                  },function(ret, err){
                      if (ret) {
                        api.addEventListener({
                            name:'resume'
                        }, function(ret, err){
                          api.toast({
                              msg: '分享成功',
                              duration: 2000,
                              location: 'middle'
                          });
                        });
                          // console.log( JSON.stringify( ret ) );
                      } else {
                        api.toast({
                            msg: '失败',
                            duration: 2000,
                            location: 'middle'
                        });
                      }
                  });
                  var fs = api.require('fs');
                  fs.rmdir({
                      path: savePath
                  }, function(ret, err) {
                      if (ret) {
                        api.toast({
                            msg: '分享成功',
                            duration: 2000,
                            location: 'middle'
                        });
                      } else {
                        api.toast({
                            msg: '分享失败',
                            duration: 2000,
                            location: 'middle'
                        });
                      }
                  });
                } else {
                    api.toast({
                        msg: '分享失败',
                        duration: 2000,
                        location: 'middle'
                    });
                }
            });

}
// QQ空间
function fnQQZoneAlbum(name,listening_description,l_id,savePath) {
  var listening_description;

  listening_description = listening_description ? listening_description : '习孔孟之道，做有德之人。';
  // 单曲
  // var Single = playHost + '/kmzd/m/share1.html?id='
  // // 专辑
  // var Listening = playHost + '/kmzd/m/share11.html?id='
  // // 听单
  // var Album  =  playHost +'/kmzd/m/share111.html?id='
    var qq = api.require('qq');
    qq.shareNews({
        type: 'QFriend',
        url: Listening + l_id,
        title: name,
        description: listening_description,
        imgUrl: savePath,

    });
    api.ajax({
      url: playHost + apiUri + '/extra/share',
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
                id: l_id,
                model: 'album',
                share_to:'q_zone'
            }
        }
    },function(ret, err){
        if (ret) {
          api.addEventListener({
              name:'resume'
          }, function(ret, err){
            api.toast({
                msg: '分享成功',
                duration: 2000,
                location: 'middle'
            });
          });
            // console.log( JSON.stringify( ret ) );
        } else {
          api.toast({
              msg: '失败',
              duration: 2000,
              location: 'middle'
          });
        }
    });
}
