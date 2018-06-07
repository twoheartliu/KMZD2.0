//shareType  分享类型
//session（会话）
//timeline（朋友圈）
//favorite（收藏）


// 分享单曲
// 分享微信
function shareMp3Single(songListID,title) {
    var wx = api.require('wx');
    wx.isInstalled(function(ret, err) {
        if (ret.installed) {
            wx.auth({}, function(ret, err) {
                if (ret.status) {
                    wx.getToken({
                        code: ret.code
                    }, function(ret, err) {
                        if (ret.status) {
                            // openId 字符串类型；授权用户唯一标识
                            //accessToken 字符串类型；接口调用凭证，传给 getUserInfo 接口 获取用户信息；有效期2小时
                            //dynamicToken 当 accessToken过期时该值传给refreshToken接口刷新accessToken的有效期dynamicToken的有效期为30天
                            //expires 数字类型；accessToken 有效期，单位（秒）
                            var accessToken = ret.accessToken;
                            var openId = ret.openId;
                            if (ret.expires < 100) {}
                            wx.getUserInfo({
                                accessToken: accessToken,
                                openId: openId
                            }, function(ret, err) {
                                if (ret.status) {
                                  // 单曲
                                  var Single = 'http://47.100.11.38//kmzd/m/share1.html?id='
                                  // 专辑
                                  var Listening = 'http://47.100.11.38/kmzd/m/share11.html?id='
                                  // 听单
                                  var Album  =  'http://47.100.11.38/kmzd/m/share111.html?id='
                                    var wx = api.require('wx');
                                    wx.shareWebpage({
                                        apiKey: '',
                                        scene: 'session',
                                        title: title,
                                        description: '',
                                        thumb: 'http://47.100.11.38/logo_144x144.png',
                                        contentUrl: Single+songListID
                                    }, function(ret, err) {
                                        if (ret.status) {
                                          api.toast({
                                              msg: '分享成功',
                                              duration: 2000,
                                              location: 'bottom'
                                          });
                                        } else {
                                            api.toast({
                                                msg: err.code,
                                                duration: 2000,
                                                location: 'bottom'
                                            });
                                        }
                                    });
                                } else {
                                    api.toast({
                                        msg: '已取消',
                                        duration: 2000,
                                        location: 'bottom'
                                    });
                                }
                            });
                        } else {

                          api.toast({
                              msg: '失败',
                              duration: 2000,
                              location: 'bottom'
                          });
                        }
                    });
                } else {
                  api.toast({
                      msg: '失败',
                      duration: 2000,
                      location: 'bottom'
                  });
                }
            });
        } else {
            api.toast({
                msg: '当前设备未安装微信客户端',
                duration: 2000,
                location: 'bottom'
            });
        }
    });
}
// QQ
function fnintnQQSingle(songListID,title) {
  // 单曲
  var Single = 'http://47.100.11.38//kmzd/m/share1.html?id='
  // 专辑
  var Listening = 'http://47.100.11.38/kmzd/m/share11.html?id='
  // 听单
  var Album  =  'http://47.100.11.38/kmzd/m/share111.html?id='
  var qq = api.require('qq');
  qq.shareNews({
      url: Single+songListID,
      title: title,
      description: '',
      imgUrl: 'http://47.100.11.38/logo_144x144.png'
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
function initTimelineSingle(songListID,title) {
    var wx = api.require('wx');
    wx.isInstalled(function(ret, err) {
        if (ret.installed) {
            wx.auth({}, function(ret, err) {
                if (ret.status) {
                    wx.getToken({
                        code: ret.code
                    }, function(ret, err) {
                        if (ret.status) {
                            // openId 字符串类型；授权用户唯一标识
                            //accessToken 字符串类型；接口调用凭证，传给 getUserInfo 接口 获取用户信息；有效期2小时
                            //dynamicToken 当 accessToken过期时该值传给refreshToken接口刷新accessToken的有效期dynamicToken的有效期为30天
                            //expires 数字类型；accessToken 有效期，单位（秒）
                            var accessToken = ret.accessToken;
                            var openId = ret.openId;
                            if (ret.expires < 100) {}
                            wx.getUserInfo({
                                accessToken: accessToken,
                                openId: openId
                            }, function(ret, err) {
                                if (ret.status) {
                                    var wx = api.require('wx');
                                    // 单曲
                                    var Single = 'http://47.100.11.38//kmzd/m/share1.html?id='
                                    // 专辑
                                    var Listening = 'http://47.100.11.38/kmzd/m/share11.html?id='
                                    // 听单
                                    var Album  =  'http://47.100.11.38/kmzd/m/share111.html?id='
                                    wx.shareWebpage({
                                        apiKey: '',
                                        scene: 'timeline',
                                        title: title,
                                        description: '',
                                        thumb: 'http://47.100.11.38/logo_144x144.png',
                                        contentUrl: Single+songListID
                                    }, function(ret, err) {
                                        if (ret.status) {
                                            api.toast({
                                                msg: '分享成功',
                                                duration: 2000,
                                                location: 'bottom'
                                            });
                                        } else {
                                            api.toast({
                                                msg: '分享失败',
                                                duration: 2000,
                                                location: 'bottom'
                                            });
                                        }
                                    });
                                } else {
                                  api.toast({
                                      msg: '分享失败',
                                      duration: 2000,
                                      location: 'bottom'
                                  });
                                }
                            });
                        } else {
                          api.toast({
                              msg: '失败',
                              duration: 2000,
                              location: 'bottom'
                          });
                        }
                    });
                } else {
                  api.toast({
                      msg: '失败',
                      duration: 2000,
                      location: 'bottom'
                  });
                }
            });
        } else {
            api.toast({
                msg: '当前设备未安装微信客户端',
                duration: 2000,
                location: 'bottom'
            });
        }
    });
}


// 分享听单
// 分享微信
function shareMp3Listening(name,listening_description,l_id,savePath) {
    var wx = api.require('wx');
    wx.isInstalled(function(ret, err) {
        if (ret.installed) {
            wx.auth({}, function(ret, err) {
                if (ret.status) {
                    wx.getToken({
                        code: ret.code
                    }, function(ret, err) {
                        if (ret.status) {
                            // openId 字符串类型；授权用户唯一标识
                            //accessToken 字符串类型；接口调用凭证，传给 getUserInfo 接口 获取用户信息；有效期2小时
                            //dynamicToken 当 accessToken过期时该值传给refreshToken接口刷新accessToken的有效期dynamicToken的有效期为30天
                            //expires 数字类型；accessToken 有效期，单位（秒）
                            var accessToken = ret.accessToken;
                            var openId = ret.openId;
                            if (ret.expires < 100) {}
                            wx.getUserInfo({
                                accessToken: accessToken,
                                openId: openId
                            }, function(ret, err) {
                                if (ret.status) {
                                  // 单曲
                                  var Single = 'http://47.100.11.38//kmzd/m/share1.html?id='
                                  // 专辑
                                  var Listening = 'http://47.100.11.38/kmzd/m/share11.html?id='
                                  // 听单
                                  var Album  =  'http://47.100.11.38/kmzd/m/share111.html?id='
                                    var wx = api.require('wx');
                                    wx.shareWebpage({
                                        apiKey: '',
                                        scene: 'session',
                                        title: name,
                                        description: listening_description,
                                        thumb: savePath,
                                        contentUrl: Album + l_id
                                    }, function(ret, err) {
                                        if (ret.status) {
                                          api.toast({
                                              msg: '分享成功',
                                              duration: 2000,
                                              location: 'bottom'
                                          });
                                          var fs = api.require('fs');
                                          fs.remove({
                                              path: 'fs:' + savePath
                                          }, function(ret, err) {
                                              if (ret.status) {

                                              } else {

                                              }
                                          });
                                        } else {
                                            api.toast({
                                                msg: err.code,
                                                duration: 2000,
                                                location: 'bottom'
                                            });
                                        }
                                    });
                                } else {
                                    api.toast({
                                        msg: '已取消',
                                        duration: 2000,
                                        location: 'bottom'
                                    });
                                }
                            });
                        } else {

                          api.toast({
                              msg: '失败',
                              duration: 2000,
                              location: 'bottom'
                          });
                        }
                    });
                } else {
                  api.toast({
                      msg: '失败',
                      duration: 2000,
                      location: 'bottom'
                  });
                }
            });
        } else {
            api.toast({
                msg: '当前设备未安装微信客户端',
                duration: 2000,
                location: 'bottom'
            });
        }
    });
}
// QQ
function fnintnQQListening(name,listening_description,l_id,savePath) {
  // var TypesAll;
  // 单曲
  var Single = 'http://47.100.11.38//kmzd/m/share1.html?id='
  // 专辑
  var Listening = 'http://47.100.11.38/kmzd/m/share11.html?id='
  // 听单
  var Album  =  'http://47.100.11.38/kmzd/m/share111.html?id='
  // }
    var qq = api.require('qq');
    qq.shareNews({
        url: Album + l_id,
        title: name,
        description: listening_description,
        imgUrl: imgUrlListening_cover
    });
}
// 微信评友圈
function initTimelineListening(name,listening_description,l_id,savePath) {
    wx.isInstalled(function(ret, err) {
        if (ret.installed) {
            wx.auth({}, function(ret, err) {
                if (ret.status) {
                    wx.getToken({
                        code: ret.code
                    }, function(ret, err) {
                        if (ret.status) {
                            // openId 字符串类型；授权用户唯一标识
                            //accessToken 字符串类型；接口调用凭证，传给 getUserInfo 接口 获取用户信息；有效期2小时
                            //dynamicToken 当 accessToken过期时该值传给refreshToken接口刷新accessToken的有效期dynamicToken的有效期为30天
                            //expires 数字类型；accessToken 有效期，单位（秒）
                            var accessToken = ret.accessToken;
                            var openId = ret.openId;
                            if (ret.expires < 100) {}
                            wx.getUserInfo({
                                accessToken: accessToken,
                                openId: openId
                            }, function(ret, err) {
                                if (ret.status) {
                                  // 单曲
                                  var Single = 'http://47.100.11.38//kmzd/m/share1.html?id='
                                  // 专辑
                                  var Listening = 'http://47.100.11.38/kmzd/m/share11.html?id='
                                  // 听单
                                  var Album  =  'http://47.100.11.38/kmzd/m/share111.html?id='
                                  console.log(savePath);
                                    var wx = api.require('wx');
                                    wx.shareWebpage({
                                        apiKey: '',
                                        scene: 'timeline',
                                        title: name,
                                        description: listening_description,
                                        thumb:  savePath,
                                        contentUrl: Album + l_id
                                    }, function(ret, err) {
                                        if (ret.status) {
                                          var fs = api.require('fs');
                                          fs.rmdir({
                                              path: savePath
                                          }, function(ret, err) {
                                              if (ret.status) {
                                                api.toast({
                                                    msg: '分享成功',
                                                    duration: 2000,
                                                    location: 'bottom'
                                                });
                                              } else {
                                              }
                                          });
                                        } else {
                                            api.toast({
                                                msg: '分享失败',
                                                duration: 2000,
                                                location: 'bottom'
                                            });
                                        }
                                    });
                                } else {
                                  api.toast({
                                      msg: '分享失败',
                                      duration: 2000,
                                      location: 'bottom'
                                  });
                                }
                            });
                        } else {
                          api.toast({
                              msg: '失败',
                              duration: 2000,
                              location: 'bottom'
                          });
                        }
                    });
                } else {
                  api.toast({
                      msg: '失败',
                      duration: 2000,
                      location: 'bottom'
                  });
                }
            });
        } else {
            api.toast({
                msg: '当前设备未安装微信客户端',
                duration: 2000,
                location: 'bottom'
            });
        }
    });
}



// 分享专辑
// 分享微信
function shareMp3Album(name,listening_description,l_id,savePath) {
  var listening_descriptions;
  if (listening_description == 'at') {
    listening_descriptions = ''
  }else {
    listening_descriptions = listening_description;
  }
  //   console.log(name);
  //   console.log(listening_description);
  //   console.log(l_id);
  //   console.log(savePath);
    var wx = api.require('wx');
    wx.isInstalled(function(ret, err) {
        if (ret.installed) {
            wx.auth({}, function(ret, err) {
                if (ret.status) {
                    wx.getToken({
                        code: ret.code
                    }, function(ret, err) {
                        if (ret.status) {
                            // openId 字符串类型；授权用户唯一标识
                            //accessToken 字符串类型；接口调用凭证，传给 getUserInfo 接口 获取用户信息；有效期2小时
                            //dynamicToken 当 accessToken过期时该值传给refreshToken接口刷新accessToken的有效期dynamicToken的有效期为30天
                            //expires 数字类型；accessToken 有效期，单位（秒）
                            var accessToken = ret.accessToken;
                            var openId = ret.openId;
                            if (ret.expires < 100) {}
                            wx.getUserInfo({
                                accessToken: accessToken,
                                openId: openId
                            }, function(ret, err) {
                                if (ret.status) {
                                  // 单曲
                                  var Single = 'http://47.100.11.38//kmzd/m/share1.html?id='
                                  // 专辑
                                  var Listening = 'http://47.100.11.38/kmzd/m/share11.html?id='
                                  // 听单
                                  var Album  =  'http://47.100.11.38/kmzd/m/share111.html?id='
                                    var wx = api.require('wx');
                                    wx.shareWebpage({
                                        apiKey: '',
                                        scene: 'session',
                                        title: name,
                                        description: listening_descriptions,
                                        thumb: savePath,
                                        contentUrl: Listening + l_id
                                    }, function(ret, err) {
                                        if (ret.status) {
                                          var fs = api.require('fs');
                                          fs.rmdir({
                                              path: savePath
                                          }, function(ret, err) {
                                              if (ret.status) {
                                                api.toast({
                                                    msg: '分享成功',
                                                    duration: 2000,
                                                    location: 'bottom'
                                                });
                                              } else {
                                              }
                                          });
                                        } else {
                                            api.toast({
                                                msg: err.code,
                                                duration: 2000,
                                                location: 'bottom'
                                            });
                                        }
                                    });
                                } else {
                                    api.toast({
                                        msg: '已取消',
                                        duration: 2000,
                                        location: 'bottom'
                                    });
                                }
                            });
                        } else {

                          api.toast({
                              msg: '失败',
                              duration: 2000,
                              location: 'bottom'
                          });
                        }
                    });
                } else {
                  api.toast({
                      msg: '失败',
                      duration: 2000,
                      location: 'bottom'
                  });
                }
            });
        } else {
            api.toast({
                msg: '当前设备未安装微信客户端',
                duration: 2000,
                location: 'bottom'
            });
        }
    });
}
// QQ
function fnintnQQAlbum(name,listening_description,l_id,savePath) {
  var listening_descriptions;
  if (listening_description == 'at') {
    listening_descriptions = ''
  }else {
    listening_descriptions = listening_description;
  }
  // 单曲
  var Single = 'http://47.100.11.38//kmzd/m/share1.html?id='
  // 专辑
  var Listening = 'http://47.100.11.38/kmzd/m/share11.html?id='
  // 听单
  var Album  =  'http://47.100.11.38/kmzd/m/share111.html?id='
    var qq = api.require('qq');
    qq.shareNews({
        url: Listening + l_id,
        title: name,
        description: listening_descriptions,
        imgUrl: savePath
    });
}
// 微信评友圈
function initTimelineAlbum(name,listening_description,l_id,savePath) {
  var listening_descriptions;
  if (listening_description == 'at') {
    listening_descriptions = ''
  }else {
    listening_descriptions = listening_description;
  }
  //   console.log(name);
  //   console.log(listening_description);
  //   console.log(l_id);
  //   console.log(savePath);
    var wx = api.require('wx');
    wx.isInstalled(function(ret, err) {
        if (ret.installed) {
            wx.auth({}, function(ret, err) {
                if (ret.status) {
                    wx.getToken({
                        code: ret.code
                    }, function(ret, err) {
                        if (ret.status) {
                            // openId 字符串类型；授权用户唯一标识
                            //accessToken 字符串类型；接口调用凭证，传给 getUserInfo 接口 获取用户信息；有效期2小时
                            //dynamicToken 当 accessToken过期时该值传给refreshToken接口刷新accessToken的有效期dynamicToken的有效期为30天
                            //expires 数字类型；accessToken 有效期，单位（秒）
                            var accessToken = ret.accessToken;
                            var openId = ret.openId;
                            if (ret.expires < 100) {}
                            wx.getUserInfo({
                                accessToken: accessToken,
                                openId: openId
                            }, function(ret, err) {
                                if (ret.status) {
                                  var listening_descriptions;
                                  if (listening_description == 'at') {
                                    listening_descriptions = ''
                                  }else {
                                    listening_descriptions = listening_description;
                                  }
                                  // 单曲
                                  var Single = 'http://47.100.11.38//kmzd/m/share1.html?id='
                                  // 专辑
                                  var Listening = 'http://47.100.11.38/kmzd/m/share11.html?id='
                                  // 听单
                                  var Album  =  'http://47.100.11.38/kmzd/m/share111.html?id='
                                    var wx = api.require('wx');
                                    wx.shareWebpage({
                                        apiKey: '',
                                        scene: 'timeline',
                                        title: name,
                                        description: listening_descriptions,
                                        thumb: savePath,
                                        contentUrl: Listening + l_id
                                    }, function(ret, err) {
                                        if (ret.status) {
                                          var fs = api.require('fs');
                                          fs.rmdir({
                                              path: savePath
                                          }, function(ret, err) {
                                              if (ret.status) {
                                                api.toast({
                                                    msg: '分享成功',
                                                    duration: 2000,
                                                    location: 'bottom'
                                                });
                                              } else {
                                              }
                                          });
                                        } else {
                                            api.toast({
                                                msg: '分享失败',
                                                duration: 2000,
                                                location: 'bottom'
                                            });
                                        }
                                    });
                                } else {
                                  api.toast({
                                      msg: '分享失败',
                                      duration: 2000,
                                      location: 'bottom'
                                  });
                                }
                            });
                        } else {
                          api.toast({
                              msg: '失败',
                              duration: 2000,
                              location: 'bottom'
                          });
                        }
                    });
                } else {
                  api.toast({
                      msg: '失败',
                      duration: 2000,
                      location: 'bottom'
                  });
                }
            });
        } else {
            api.toast({
                msg: '当前设备未安装微信客户端',
                duration: 2000,
                location: 'bottom'
            });
        }
    });
}
