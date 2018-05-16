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
            alert('当前设备未安装微信客户端');
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
                        console.log(JSON.stringify(ret));
                        if (ret.status) {
                            // openId 字符串类型；授权用户唯一标识
                            //accessToken 字符串类型；接口调用凭证，传给 getUserInfo 接口 获取用户信息；有效期2小时
                            //dynamicToken 当 accessToken过期时该值传给refreshToken接口刷新accessToken的有效期dynamicToken的有效期为30天
                            //expires 数字类型；accessToken 有效期，单位（秒）
                            var accessToken = ret.accessToken;
                            var openId = ret.openId;
                            if (ret.expires < 100) {
                                // wx.refreshToken({
                                //     dynamicToken: ret.dynamicToken
                                // }, function(ret, err) {
                                //     if (ret.status) {
                                //         // $api.setStorage('dynamicToken',ret.dynamicToken);
                                //         // $api.setStorage('expires',ret.expires);
                                //         // $api.setStorage('accessToken',ret.accessToken);
                                //         // $api.setStorage('openId',ret.openId);
                                //         accessToken = ret.accessToken;
                                //         openId = ret.openId;
                                //
                                //     } else {
                                //         alert(err.code);
                                //     }
                                // });
                            }
                            wx.getUserInfo({
                                accessToken: accessToken,
                                openId: openId
                            }, function(ret, err) {
                                if (ret.status) {
                                    var wx = api.require('wx');
                                    // wx.shareWebpage({
                                    //     apiKey: '',
                                    //     scene: 'session',
                                    //     title: '测试标题',
                                    //     description: '分享内容的描述',
                                    //     thumb: 'widget://a.jpg',
                                    //     contentUrl: 'http://www.kmzhidao.com'
                                    // }, function(ret, err) {
                                    //     if (ret.status) {
                                    //         alert('分享成功');
                                    //     } else {
                                    //         alert(err.code);
                                    //     }
                                    // });
                                    // var wx = api.require('wx');
                                    var mp3 = 'http://47.100.11.38/bgmp3/010.mp3';
                                    var img = 'widget://res/01.jpg';
                                      wx.shareMusic({
                                          title: '测试标题',
                                          scene: 'session',
                                          description: '分享内容的描述',
                                          // thumb: img,
                                          contentUrl: mp3
                                      }, function(ret, err) {
                                          if (ret.status) {
                                              alert('分享成功');
                                          } else {
                                              alert(err.code);
                                          }
                                      });
                                    // var wx = api.require('wx');
                                    // wx.shareText({
                                    //     scene: 'timeline',
                                    //     text: '我分享的文本'
                                    // }, function(ret, err) {
                                    //     if (ret.status) {
                                    //         alert('分享成功');
                                    //     } else {
                                    //         alert(err.code);
                                    //     }
                                    // });
                                } else {
                                    alert(err.code);
                                }
                            });
                            // alert(JSON.stringify(ret));
                        } else {
                            alert(err.code);
                        }
                    });
                } else {
                    alert(err.code);
                }
            });
        } else {
            alert('当前设备未安装微信客户端');
        }
    });
}
