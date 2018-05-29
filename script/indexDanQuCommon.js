//index
//获取当前歌曲的歌长
function jindutiaos() {
    var myAudio = document.getElementById("myAudio");
    timer1 = setInterval(function() {
        cur = parseInt(myAudio.currentTime);
        lenth = myAudio.duration;
        lenths = parseInt(myAudio.duration);
        temps = lenths;
        minutes = parseInt(temps / 60);
        if (lenths % 60 < 10) {
            if (minutes < 10) {
                html = "0" + minutes + ":0" + lenths % 60 + "";
            } else {
                html = "" + minutes + ":0" + lenths % 60 + "";
            }
        } else {
            if (minutes < 10) {
                html = "0" + minutes + ":" + lenths % 60 + "";
            } else {
                html = "" + minutes + ":" + lenths % 60 + "";
            }
        }
        cur = myAudio.currentTime; //获取当前的播放时间
        if(lenth > 0){
          api.sendEvent({
              name: 'zongJinDusss',
              extra: {
                  lenth: lenth,
                  html: html
              }
          });
        }

    }, 1000)
}

//调整播放进度
function adjusts() {
    api.addEventListener({
        name: 'playTime'
    }, function(ret, err) {
        if (ret) {
            var myAudio = document.getElementById("myAudio");
            playTime = ret.value.playTime;
            myAudio.currentTime = playTime;
        }
    });
}

//播放时间
function addtimes() {
    var myAudio = document.getElementById("myAudio");
    timer2 = setInterval(function() {
        curs = parseInt(myAudio.currentTime);
        lenth = myAudio.duration;
        temp = curs;
        minute = parseInt(temp / 60);
        if (curs % 60 < 10) {
            if (minute < 10) {
                html = "0" + minute + ":0" + curs % 60 + "";
            } else {
                html = "" + minute + ":0" + curs % 60 + "";
            }
        } else {
            if (minute < 10) {
                html = "0" + minute + ":" + curs % 60 + "";
            } else {
                html = "" + minute + ":" + curs % 60 + "";
            }
        }
        api.sendEvent({
            name: 'bofangshijian',
            extra: {
                bofangshijian: html,
            }
        });
        if(lenth > 0){
          api.sendEvent({
              name: 'zongJinDu',
              extra: {
                  cur: curs,
                  lenth: lenth
              }
          });
        }

        api.sendEvent({
            name: 'jibenxinxi',
            extra: {
                titlename: titlename,
                desc: desc,
                singerName: singerName,
                author_id: author_id
            }
        });
    }, 1000);
}




//播放歌单音频
function fnBoFangyinpinxinxis(id) {
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
              api.sendEvent({
                  name: 'netbofangsssssss',
                  extra: {
                      a: id,
                      bofang: bofang
                  }
              });
              fnFuZhiAudios(host+'/'+ret.data.url);
              titlename = ret.data.title;
              reciter = ret.data.reciter;
              desc = ret.data.body;
              singerName = ret.data.author_name;
              comment_total = ret.data.comment_total;
              is_collection =ret.data.is_collection;
              api.sendEvent({
                  name: 'jibenxinxi',
                  extra: {
                      titlename: titlename,
                      desc: desc,
                      reciter: reciter,
                      singerName: singerName,
                      comment_total: comment_total,
                      collection: is_collection
                  }
              });

        }else{
          netMessage(ret);
        }
      }else{
        netWork(err);
      }
    });
}


//歌单上一首
function fnGeDanShangYis() {
    var myAudio = document.getElementById("myAudio");
    netAudioPauses();
    myAudio.currentTime = 0;
    clearInterval(timer2);
    clearInterval(timer1);
    fnBoFangyinpinxinxis(a);
}
//歌单下一首
function fnGeDanxiaYis() {
    var myAudio = document.getElementById("myAudio");
    netAudioPauses();
    myAudio.currentTime = 0;
    myAudio.load();
    clearInterval(timer2);
    clearInterval(timer1);
    fnBoFangyinpinxinxis(a);
}

//当前播放id
function fnBFids(id) {
    DangQianbofangid = id;
    api.sendEvent({
        name: 'netPlaying',
        extra: {
            playing: DangQianbofangid,
        }
    });
}

//audio标签赋值
function fnFuZhiAudios(url) {
    var stylelist = $api.byId('yinpin');
    var html = '<audio id="myAudio" ><source src="' + url + '" type="audio/mp3"></audio>';
    $api.html(stylelist, html);
    console.log(html);
    if (html) {
        kaishibofangs();
    }
}
//开始播放
function kaishibofangs() {
    netAudioPlays();
    addtimes();
    jindutiaos();
}
//音频播放模块
function netAudioPlays() {
    var myAudio = document.getElementById("myAudio");
    readyState = null;
    myAudio.autoplay=true;

    readyState = setInterval(function() {
        myAudio.readyState
        console.log(readyState);
    }, 500);
    if(readyState == 4){
      myAudio.play();
    }
    if(readyState == 2){
      myAudio.play();
    }
    // console.log(222);
    // console.log(myAudio.networkState);
    // // console.log(myAudio.error.code);
    // console.log();
    fnBoFangmoshiids();
    initEventListennerBoFangMoshiDanQu();
    if(comment_total){
      api.sendEvent({
          name: 'jibenxinxi',
          extra: {
              titlename: titlename,
              desc: desc,
              singerName: singerName,
              comment_total:comment_total,
              collection:is_collection
          }
      });
    }else{
      api.sendEvent({
          name: 'jibenxinxi',
          extra: {
              titlename: titlename,
              desc: desc,
              singerName: singerName,
              collection:is_collection
          }
      });
    }
}

//关闭音频
function netAudioPauses() {
    var myAudio = document.getElementById("myAudio");
    myAudio.pause();
}

//随机播放歌曲
function suijis() {
    var myAudio = document.getElementById("myAudio");
    clearInterval(shunxuplays);
    suijiplays = setInterval(function() {
        if (myAudio.ended) {
          netAudioPauses();
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
          netAudioPauses();
          myAudio.currentTime = 0;
          clearInterval(timer1);
          clearInterval(timer2);
            kaishibofangs();
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
    netAudiopauseSssDanqu();
    myAudio.currentTime = 0;
    clearInterval(timer1);
    clearInterval(timer2);
    kaishibofangs();

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

function fnBOFangJians(bofangs, aa) {
    a = aa;
    bofang = bofangs;
}

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
            fnBOFangJians(bofang, id);
        }
    });
    //GeDan上一首
    api.addEventListener({
        name: 'GeDanshangyis'
    }, function(ret, err) {
        if (ret) {
            fnGeDanShangYis();
        }
    });
    //GeDan下一首
    api.addEventListener({
        name: 'GeDanxiayis'
    }, function(ret, err) {
        if (ret) {
            fnGeDanxiaYis();
        }
    });
    api.addEventListener({
        name: 'neizhiliebiaoPlayDanqu'
    }, function(ret, err) {
        var bofang = ret.value.bofang;
        var a = ret.value.a;
        fnBOFangJians(bofang, a);

    });
    api.addEventListener({
        name: 'netPlayDanQu'
    }, function(ret, err) {
        netAudioPlays();
    });
    //监听暂停音频
    api.addEventListener({
        name: 'netAudiopauseSssDanqu'
    }, function(ret, err) {
        if (ret) {
            netAudioPauses();
        }
    });
}
