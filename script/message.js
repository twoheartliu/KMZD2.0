function netMessage(){
  if(ret.status == 10101){
    api.toast({              
        msg:  '评论失败,请检测您的网络状态或重试',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10201){
    api.toast({              
        msg:  '您的账号未登录，请登陆后再试',
        duration:  2000,
        location:   'middle'          
    });
    $api.rmStorage('token');
    api.openWin({
        name: 'login',
        url: '../login.html',
        pageParam: {
            name: 'test'
        }
    });

  }
  if(ret.status == 10202){
    api.toast({              
        msg:  '密码过期，请重新登陆',
        duration:  2000,
        location:   'middle'          
    });
    $api.rmStorage('token');
    api.openWin({
        name: 'login',
        url: '../login.html',
        pageParam: {
            name: 'test'
        }
    });
  }
  if(ret.status == 10203){
    api.toast({              
        msg:  '验证失败，请输入正确验证码',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10204){
    api.toast({              
        msg:  '验证码已失效,请重新获取验证码',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10205){
    api.toast({              
        msg:  '注册失败',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10206){
    api.toast({              
        msg:  '用户名或密码错误',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10207){
    api.toast({              
        msg:  '该账户已被封停',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10208){
    api.toast({              
        msg:  '登录失败，请重试',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10209){
    api.toast({              
        msg:  '该手机号码已存在',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10210){
    api.toast({              
        msg:  '登录失败，请重试',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10301){
    api.toast({              
        msg:  '验证码发送失败，请重试',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10302){
    api.toast({              
        msg:  '请勿重复获取验证码',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10303){
    api.toast({              
        msg:  '同一时段内获取次数超限，请稍后再试',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10401){
    api.toast({              
        msg:  '今日已签到',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10402){
    api.toast({              
        msg:  '签到失败',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10403){
    api.toast({              
        msg:  '关注失败',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10404){
    api.toast({              
        msg:  '取消关注失败',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10405){
    api.toast({              
        msg:  '更新用户信息失败',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10406){
    api.toast({              
        msg:  '上传作品失败',
        duration:  2000,
        location:   'middle'          
    });
  }
  if(ret.status == 10407){
    api.toast({              
        msg:  '已绑定过',
        duration:  2000,
        location:   'middle'          
    });
  }
}
