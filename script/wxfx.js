//shareType  分享类型
//session（会话）
//timeline（朋友圈）
//favorite（收藏）

function initWx() {
    var wx = api.require('wx');
    //微信分享
    wx.isInstalled(function(ret, err) {
        if (ret.installed) {
            // alert("当前设备已安装微信客户端");
            shareMp3();
        } else {
            api.toast({
                msg: '当前设备未安装微信客户端',
                duration: 2000,
                location: 'bottom'
            });
        }
    });
}

function shareMp3() {
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
                                    wx.shareWebpage({
                                        apiKey: '',
                                        scene: 'session',
                                        title: '测试标题',
                                        description: '分享内容的描述',
                                        thumb: 'widget://a.jpg',
                                        contentUrl: 'http://www.kmzhidao.com'
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
function fnintnQQ(Types,TypesId) {
  var TypesAll;
  // 单曲
  var Single = '47.100.11.38//kmzd/m/share1.html?id='
  // 听单
  var Listening = '47.100.11.38/kmzd/m/share11.html？id='
  // 专辑
  var Album  =  '47.100.11.38/kmzd/m/share111.html？id='
  // 类型
  console.log(Types);
  // id
  console.log(TypesId);
  if (Types = Single) {
      TypesAll =  Single;
  }else if (Types = Listening) {
      TypesAll =  SinListeninggle;
      console.log(Types);
      console.log(TypesId);

  }else if (Types = Album) {
      TypesAll =  Album;
  }
    // var qq = api.require('qq');
    // qq.shareNews({
    //     url: TypesAll + TypesId,
    //     title: '新闻分享',
    //     description: '新闻描述',
    //     imgUrl: 'http://upload.wabei.cn/2011/0807/20110807025817844.jpg'
    // });
}
// 微信评友圈
function initTimeline() {
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
                                    wx.shareWebpage({
                                        apiKey: '',
                                        scene: 'timeline',
                                        title: '测试标题',
                                        description: '分享内容的描述',
                                        thumb: 'widget://a.jpg',
                                        contentUrl: 'http://www.kmzhidao.com'
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
