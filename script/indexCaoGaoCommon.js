

//播放歌单音频
function fnBoFangCaoGaoXiangXinXi(id) {
  var myAudio = document.getElementById("myAudio");
  if(myAudio){
    myAudio.pause();
  }
  clearInterval(timer1);
  clearInterval(timer2);
    api.ajax({
      url: host + apiUri + '/user/drafts',
      method: 'get',
      dataType: 'json',
      timeout:10,
      headers: {
          "source": api.systemType,
          "version": version,
          "session": token
      }
    }, function(ret, err) {
      if(ret){
      if(ret.status == 200){
        var h;
        for (i = 0; i < ret.data.length; i++) {
          if(ret.data[i].url == id){
              h = i;
          }
        }
        api.sendEvent({
            name: 'netbofangsssssss',
            extra: {
                a: ret.data[h].url,
                bofang: bofang
            }
        });
        api.sendEvent({
            name: 'neiJianTingGood',
            extra: {
                // bookId:ret.data.id,
                bofangmoshiid:bofangmoshiid
            }
        });
        var userId = ret.data[h].user_id;
        var userUrl = ret.data[h].url;
        var url = userRecord + userId + '/'+ userUrl;
        fnFuZhiAudio(url);
        titlename = ret.data[h].title;
        desc = ret.data[h].body;
        api.sendEvent({
            name: 'jibenxinxi',
            extra: {
                titlename: titlename,
                desc: desc,
            }
        });
          fnBoFangmoshiidsssss
      }else{
        netMessage(ret);
      }
    }else{
      netWork(err);
    }
    });
}

//歌单上一首
function fnCaoGaoXiangShangYi(a) {
    var myAudio = document.getElementById("myAudio");
    netAudioPause();
    myAudio.currentTime = 0;
    clearInterval(timer2);
    clearInterval(timer1);
    setTimeout(function(){
        fnBoFangCaoGaoXiangXinXi(a);
    },3000)
}
//歌单下一首
function fnCaoGaoXiangxiaYi(a) {
    var myAudio = document.getElementById("myAudio");
    netAudioPause();
    myAudio.currentTime = 0;
    myAudio.load();
    clearInterval(timer2);
    clearInterval(timer1);
    setTimeout(function(){
        fnBoFangCaoGaoXiangXinXi(a);
    },3000)
}

//当前播放id
function fnBFidCaoGaoXiang(id) {
    DangQianbofangid = id;
    api.sendEvent({
        name: 'netPlaying',
        extra: {
            playing: DangQianbofangid,
        }
    });
}

//随机播放歌曲
function suijiCaoGaoXiang() {
    clearInterval(shunxuplays);
    var Range = 0 - rets.data.length;
    var Rand = Math.random();
    var n = rets.data.length + Math.floor(Rand * Range);
    suijiplays = setInterval(function() {
        if (myAudio.ended) {
            netAudioPause();
        }
    }, 1000);
    bofangmoshiid = 1;
    fnBFMoshiCgx(bofangmoshiid);
}
//顺序播放
function shunxuCaoGaoXiang() {
    var myAudio = document.getElementById("myAudio");
    clearInterval(danquplays);
    shunxuplays = setInterval(function() {
      if(myAudio){
        if (myAudio.ended) {
          netAudioPause();
          myAudio.currentTime = 0;
          clearInterval(timer1);
          clearInterval(timer2);
          setTimeout(function(){
              kaishibofang();
          },3000)
        }
      }

    }, 1000);
    bofangmoshiid = 0;
    fnBFMoshiCgx(bofangmoshiid);
}
//单曲播放
function bfdanquCaoGaoXiang() {
    var myAudio = document.getElementById("myAudio");
    clearInterval(suijiplays);
    danquplays = setInterval(function() {
        if (myAudio.ended) {
          netAudioPause();
          myAudio.currentTime = 0;
          clearInterval(timer1);
          clearInterval(timer2);
          setTimeout(function(){
              kaishibofang();
          },3000)
        }
    }, 1000);
    bofangmoshiid = 2;
    fnBFMoshiCgx(bofangmoshiid);
}
function fnBFMoshiCgx(MoShiId) {
    bofangmoshiid = MoShiId;

}
//判断播放模式
function fnBoFangmoshiidsssss() {
    if (!bofangmoshiid) {
        shunxuCaoGaoXiang();
    } else if (bofangmoshiid == '1') {
        suijiCaoGaoXiang();
    } else if (bofangmoshiid == '2') {
        bfdanquCaoGaoXiang();
    }

}

//监听播放模式
function initEventListennerBoFangCaoGaoXiangMoshi() {
    //监听播放模式
    api.addEventListener({
        name: 'bofangmoshicCgx'
    }, function(ret, err) {
        if (ret) {
            fnBFMoshiCgx(ret.value.bofangmoshi);
            fnBoFangmoshiidsssss();
        }
    });

}

function initEventListennerBofangCaoGaoXiang() {
    api.addEventListener({
        name: 'netPlayCaoGaoXiang'
    }, function(ret, err) {
        if (ret) {
          var bofang = ret.value.bofang;
          var id = ret.value.id;
          fnBFidCaoGaoXiang(id);
          fnBoFangCaoGaoXiangXinXi(id)
          fnBOFangJian(bofang, id);
        }
    });

    //草稿上一首
    api.addEventListener({
        name: 'caoGaoXiangshangyi'
    }, function(ret, err) {
        if (ret) {
            fnCaoGaoXiangShangYi(ret.value.c);
        }
    });
    //草稿下一首
    api.addEventListener({
        name: 'caoGaoXiangxiayi'
    }, function(ret, err) {
        if (ret) {
            fnCaoGaoXiangxiaYi(ret.value.c);
        }
    });
    api.addEventListener({
        name: 'netPlayingCaoGaoXiang'
    }, function(ret, err) {
        netAudioPlay();
    });
    //监听暂停音频
    api.addEventListener({
        name: 'netAudiopauseCaoGaoXiang'
    }, function(ret, err) {
        if (ret) {
            netAudioPause();
        }
    });

}
