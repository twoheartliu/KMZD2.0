var timeOut = 2000;
function netMessage(ret){

  if(ret.status == 10102){
    api.toast({              
        msg:  '曲目评论失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10101){
    api.toast({              
        msg:  '评论失败,请检测您的网络状态或重试',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10201){
    api.toast({              
        msg:  '您的账号未登录',
        duration:  timeOut,
        location:   'middle'          
    });

    setTimeout("turn_login()",timeOut);
  }
  if(ret.status == 10202){
    api.toast({              
        msg:  '密码过期，请重新登陆',
        duration:  timeOut,
        location:   'middle'          
    });
    setTimeout("turn_login()",timeOut);
  }
  if(ret.status == 10203){
    api.toast({              
        msg:  '验证失败，请输入正确验证码',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10204){
    api.toast({              
        msg:  '验证码已失效,请重新获取验证码',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10205){
    api.toast({              
        msg:  '注册失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10206){
    api.toast({              
        msg:  '用户名或密码错误',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10207){
    api.toast({              
        msg:  '该账户已被封停',
        duration:  timeOut,
        location:   'middle'          
    });
    setTimeout("turn_login()",timeOut);
  }
  if(ret.status == 10208){
    api.toast({              
        msg:  '登录失败，请重试',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10209){
    api.toast({              
        msg:  '该手机号码已存在',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10210){
    api.toast({              
        msg:  '登录失败，请重试',
        duration:  timeOut,
        location:   'middle'          
    });
    setTimeout("turn_login()",timeOut);
  }
  if(ret.status == 10211){
    api.toast({              
        msg:  '重置密码失败',
        duration:  timeOut,
        location:   'middle'          
    });
    setTimeout("turn_login()",timeOut);
  }
  if(ret.status == 10301){
    api.toast({              
        msg:  '验证码发送失败，请重试',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10302){
    api.toast({              
        msg:  '请勿重复获取验证码',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10303){
    api.toast({              
        msg:  '同一时段内获取次数超限，请稍后再试',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10401){
    api.toast({              
        msg:  '今日已签到',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10402){
    api.toast({              
        msg:  '签到失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10403){
    api.toast({              
        msg:  '关注失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10404){
    api.toast({              
        msg:  '取消关注失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10405){
    api.toast({              
        msg:  '更新用户信息失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10406){
    api.toast({              
        msg:  '上传作品失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10407){
    api.toast({              
        msg:  '已绑定过',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10408){
    api.toast({              
        msg:  '绑定失败，请重试',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10409){
    api.toast({              
        msg:  '解除绑定失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10410){
    api.toast({              
        msg:  '添加宝宝失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10411){
    api.toast({              
        msg:  '更新宝宝信息失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10412){
    api.toast({              
        msg:  '删除宝宝信息失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10413){
    api.toast({              
        msg:  '删除失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10414){
    api.toast({              
        msg:  '设置密码失败，请重试',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10415){
    api.toast({              
        msg:  '您还未绑定',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10416){
    api.toast({              
        msg:  '保存失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10501){
    api.toast({              
        msg:  '新建听单失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10502){
    api.toast({              
        msg:  '修改听单失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10503){
    api.toast({              
        msg:  '删除听单失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10504){
    api.toast({              
        msg:  '听单评论失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10505){
    api.toast({              
        msg:  '添加到听单失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10506){
    api.toast({              
        msg:  '曲目已存在',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10507){
    api.toast({              
        msg:  '删除曲目失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10601){
    api.toast({              
        msg:  '点赞失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10602){
    api.toast({              
        msg:  '取消收藏失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10603){
    api.toast({              
        msg:  '收藏失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10604){
    api.toast({              
        msg:  '已收藏过',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10701){
    api.toast({              
        msg:  '消息发送失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10702){
    api.toast({              
        msg:  '删除消息失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10801){
    // api.toast({              
    //     msg:  '参数错误',
    //     duration:  timeOut,
    //     location:   'middle'          
    // });
  }
  if(ret.status == 10802){
    api.toast({              
        msg:  '上传文件失败',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10803){
    api.toast({              
        msg:  '非法操作',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10900){
    api.toast({              
        msg:  '缺少源信息或源信息错误',
        duration:  timeOut,
        location:   'middle'          
    });
  }
  if(ret.status == 10901){
    var dialogBox = api.require('dialogBox');
    dialogBox.alert({
        texts: {
            title: '当前版本不可用，请升级到最新版本',
            leftBtnTitle: '暂不升级',
            rightBtnTitle: '立刻升级'
        },
        styles: {
            bg: '#fff',
            w: 300,
            title: {
                marginT: 20,
                icon: 'widget://res/gou.png',
                iconSize: 40,
                titleSize: 14,
                titleColor: '#666'
            },
            content: {
                color: '#ccc',
                size: 14
            },
            left: {
                marginB: 7,
                marginL: 20,
                w: 130,
                h: 35,
                corner: 2,
                bg: '#ccc',
                color: '#FFF',
                size: 12
            },
            right: {
                marginB: 7,
                marginL: 10,
                w: 130,
                h: 35,
                corner: 2,
                bg: '#89211b',
                color: '#fff',
                size: 12
            }
        }
    }, function(ret) {
        if (ret.eventType == 'right') {

            dialogBox.close({
                dialogName: 'alert'
            });
        } else if (ret.eventType == 'left') {
          setTimeout("turn_login()",2100);
            dialogBox.close({
                dialogName: 'alert'
            });
        }
    });

  }
  if(ret.status == 10902){
    message = ret.message;
    data = ret.data;
    setTimeout("turn_logins()",2100);
  }
}
function netWork(err){
  if(err.code == 0){
    api.toast({              
        msg: '网络未连接',
        duration: timeOut,
        location: 'middle'          
    });
  }
  if(err.code == 1){
    api.toast({              
        msg: '网络未连接',
        duration: timeOut,
        location: 'middle'          
    });
  }
  if(err.code == 2){
    api.toast({              
        msg: '网络未连接',
        duration: timeOut,
        location: 'middle'          
    });
  }
  if(err.code == 3){
    api.toast({              
        msg: '网络未连接',
        duration: timeOut,
        location: 'middle'          
    });
  }
}

function netWorkNone(ok){
    api.toast({              
        msg: '网络未连接',
        duration: timeOut,
        location: 'middle'          
    });
    api.openFrame({
        name: 'oops',
        url: '../oops.html',
        rect: {
            x: 0,
            y: 0,
            w: 'auto',
            h: 'auto'
        },
        pageParam: {
            ok: ok
        },
        bounces: true,
        bgColor: 'rgba(0,0,0,0)',
        vScrollBarEnabled: true,
        hScrollBarEnabled: true
    });
}

function turn_login(){
//   api.closeToWin({
//     name: 'login'
// });
$api.rmStorage('token');
  api.sendEvent({
      name: 'bFaaaaa',
      extra: {
          bFaaaaa: 1,

      }
  });
  // api.closeWin();
  api.closeToWin({
    name: 'login'
  });
  // setTimeout("Playlogin()",timeOut);
}
function turn_logins(){
$api.rmStorage('token');
  api.sendEvent({
      name: 'bFaaaaa',
      extra: {
          bFaaaaa: 1,

      }
  });
  api.sendEvent({
      name: 'wwwwwwww',
      extra: {
          wwwwwwww: 10902,

      }
  });
  api.closeToWin({
    name: 'login'
  });
}
