//index

//播放歌单音频
function fnBoFangyinpinxinxis(id) {
  var myAudio = document.getElementById("myAudio");
  if(myAudio){
    myAudio.pause();
  }
  fnUserFollow();
  clearInterval(timer2);
  clearInterval(timer1);
    api.ajax({
      url: host + apiUri + '/sound/' + id,
      method: 'get',
      dataType: 'json',
      headers: {
          "source": api.systemType,
          "version": version,
          "session": token
      }
    }, function(ret, err) {
      if(ret){
        if(ret.status == 200){
          setTimeout(function(){
              api.sendEvent({
                  name: 'listen_to_',
                  extra: {
                      listen_to_ : 0
                  }
              });
            },1000)
              api.sendEvent({
                  name: 'netbofangsssssss',
                  extra: {
                      a: id,
                      bofang: bofang,
                      playType:playType
                  }
              });
              var urlUrl = ret.data.url;
              var sandBox = urlUrl.substring(0, 4);
              if (sandBox == 'http') {
                  url =  urlUrl;
                  fnFuZhiAudio(url);
              }else {
                if(ret.data.user_id){
                  var userId = ret.data.user_id;
                  var userUrl = ret.data.url;
                  url = userRecord + userId + '/'+ userUrl;
                  fnFuZhiAudio(url);

                }else{
                  fnFuZhiAudio(playHost+'/'+ret.data.url);
                }
              }

              titlename = ret.data.title;
              reciter = ret.data.reciter;
              desc = ret.data.body;
              singerName = ret.data.author_name;
              comment_total = ret.data.comment_total;
              is_collection =ret.data.is_collection;
              cover_big = ret.data.cover_mid;
              console.log(cover_big);
              api.sendEvent({
                  name: 'neiJianTingGood',
                  extra: {
                      bookId:ret.data.id,
                      bofangmoshiid:bofangmoshiid
                  }
              });
              api.sendEvent({
                  name: 'jibenxinxi',
                  extra: {
                      titlename: titlename,
                      desc: desc,
                      reciter: reciter,
                      singerName: singerName,
                      cover_big:cover_big
                  }
              });
            fnBoFangmoshiids
        }else{
          netMessage(ret);
        }
      }else{
        netWork(err);
      }
    });
}


//歌单上一首
function fnGeDanShangYis(a) {
    var myAudio = document.getElementById("myAudio");
    netAudioPause();
    myAudio.currentTime = 0;
    clearInterval(timer2);
    clearInterval(timer1);

    setTimeout(function(){
        fnBoFangyinpinxinxis(a);
    },3000)
}
//歌单下一首
function fnGeDanxiaYis(a) {
    var myAudio = document.getElementById("myAudio");
    netAudioPause();
    myAudio.currentTime = 0;
    myAudio.load();
    clearInterval(timer2);
    clearInterval(timer1);
    setTimeout(function(){
        fnBoFangyinpinxinxis(a);
    },3000)
}

//当前播放id
function fnBFids(id) {
    DangQianbofangid = id;
    api.sendEvent({
        name: 'netPlaying',
        extra: {
            playing: DangQianbofangid,
            bofang:bofang,
            playType:playType
        }
    });
}





//随机播放歌曲
function suijis() {
    var myAudio = document.getElementById("myAudio");
    clearInterval(shunxuplays);
    suijiplays = setInterval(function() {
        if (myAudio.ended) {
          netAudioPause();
          fnUserFollow();
        }
    }, 1000);
    bofangmoshiid = 1;
    fnBFMoshis(bofangmoshiid);
}
//顺序播放
function shunxus() {
    var myAudio = document.getElementById("myAudio");
    clearInterval(danquplays);

    shunxuplays = setInterval(function() {
      if(myAudio){
        if (myAudio.ended) {
          netAudioPause();
          fnUserFollow();
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
    fnBFMoshis(bofangmoshiid);
}
//单曲播放
function bfdanqus() {
    var myAudio = document.getElementById("myAudio");
    clearInterval(suijiplays);
    danquplays = setInterval(function() {
        if (myAudio.ended) {
            fndanqubofangmoshis();
        }
    }, 1000);
    bofangmoshiid = 2;
    fnBFMoshis(bofangmoshiid);
}
//单曲循环播放更新
function fndanqubofangmoshis() {
    netAudioPause();
    fnUserFollow();
    myAudio.currentTime = 0;
    clearInterval(timer1);
    clearInterval(timer2);
    setTimeout(function(){
        kaishibofang();
    },3000)

}

function fnBFMoshis(MoShiId) {
    bofangmoshiid = MoShiId;
}

//判断播放模式
function fnBoFangmoshiids() {
    if (bofangmoshiid == '0') {
        shunxus();
    } else if (bofangmoshiid == '1') {
        suijis();
    } else if (bofangmoshiid == '2') {
        bfdanqus();
    }

}

// function fnBOFangJians(bofangs, aa) {
//     a = aa;
//     bofang = bofangs;
// }

function fnCollections(cccc){
  is_collection = cccc;
}
//监听播放模式

function initEventListennerBoFangMoshiDanQu() {
    // 监听播放模式
    api.addEventListener({
        name: 'bofangmoshiDanQu'
    }, function(ret, err) {
        if (ret) {
            fnBFMoshis(ret.value.bofangmoshi);
            fnBoFangmoshiids();
        }
    });
    // api.addEventListener({
    //     name: 'collection'
    // }, function(ret, err) {
    //     if (ret) {
    //         fnCollections(ret.value.is_collection);
    //     }
    // });
}

function initEventListennerBofangDanQu() {
    api.addEventListener({
        name: 'netPlayUrlDanQu'
    }, function(ret, err) {
        if (ret) {
            var bofang = ret.value.bofang;
            var id = ret.value.id;
            fnBFids(id);
            fnBoFangyinpinxinxis(id)
            fnBOFangJian(bofang, id);
        }
    });
    //GeDan上一首
    api.addEventListener({
        name: 'GeDanshangyis'
    }, function(ret, err) {
        if (ret) {
            fnGeDanShangYis(ret.value.c);
        }
    });
    //GeDan下一首
    api.addEventListener({
        name: 'GeDanxiayis'
    }, function(ret, err) {
        if (ret) {
            fnGeDanxiaYis(ret.value.c);
        }
    });
    api.addEventListener({
        name: 'netPlayDanQu'
    }, function(ret, err) {
        netAudioPlay();
    });
    //监听暂停音频
    api.addEventListener({
        name: 'netAudiopauseSssDanqu'
    }, function(ret, err) {
        if (ret) {
            netAudioPause();
        }
    });
}
