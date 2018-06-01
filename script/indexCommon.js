//index
//再次播放歌单音频
// function fnBoFangyinpinxinxiing(play) {
//     playgedan = rets.data[play].id;
//
//     fnBFid(playgedan);
//     api.ajax({
//       url: host + apiUri + '/sound/' + playgedan,
//       method: 'get',
//       dataType: 'json',
//       headers: {
//           "source": api.systemType,
//           "version": version,
//           "session": token
//       }
//     }, function(ret, err) {
//
//       if(ret){
//       if(ret.status == 200){
//
//             if (playlistid) {
//                 api.sendEvent({
//                     name: 'netbofangsssssss',
//                     extra: {
//                         a: playgedan,
//                         playlistid: playlistid,
//                         bofang: bofang,
//                         playUrli:playUrli
//                     }
//                 });
//             }
//             api.sendEvent({
//                 name: 'neiJianTingGood',
//                 extra: {
//                     bookId:ret.data.id
//                 }
//             });
//             if(ret.data.user_id){
//               var userId = ret.data.user_id;
//               var userUrl = ret.data.url;
//               url = userRecord + userId + '/'+ userUrl;
//               fnFuZhiAudio(url);
//             }else{
//               fnFuZhiAudio(host+'/'+ret.data.url);
//             }
//             titlename = ret.data.title;
//             reciter = ret.data.reciter;
//             desc = ret.data.body;
//             singerName = ret.data.author_name;
//             api.sendEvent({
//                 name: 'jibenxinxi',
//                 extra: {
//                     titlename: titlename,
//                     desc: desc,
//                     reciter: reciter,
//                     singerName: singerName,
//                     comment_total: comment_total,
//                     collection: is_collection
//                 }
//             });
//
//       }else{
//         netRecordingModuleing(playgedan);
//       }
//     }else{
//        netRecordingModuleing(playgedan);
//     }
//     });
// }
//播放歌单音频
function fnBoFangyinpinxinxi() {

    playgedan = rets.data[play].id;
    fnBFid(playgedan);
    api.ajax({
      url: host + apiUri + '/sound/' + playgedan,
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
            if (playlistid) {
                api.sendEvent({
                    name: 'netbofangsssssss',
                    extra: {
                        a: playgedan,
                        playlistid: playlistid,
                        bofang: bofang,
                        playUrli:playUrli
                    }
                });
            }
            api.sendEvent({
                name: 'neiJianTingGood',
                extra: {
                    bookId:ret.data.id
                }
            });
            if(ret.data.user_id){
              var userId = ret.data.user_id;
              var userUrl = ret.data.url;
              url = userRecord + userId + '/'+ userUrl;
              fnFuZhiAudio(url);

            }else{
              fnFuZhiAudio(host+'/'+ret.data.url);
            }
            titlename = ret.data.title;
            reciter = ret.data.reciter;
            desc = ret.data.body;
            singerName = ret.data.author_name;
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
        netRecordingModule(playgedan);
      }
    }else{
      netRecordingModule(playgedan);
    }
    });
}

function netRecordingModule(playgedans) {
  playgedan = playgedans;
    var appIds=api.appId;
    var bbbbb = api.systemType;
    var pathAdd = $api.getStorage('pathAdd');
    var uelr = '/storage/emulated/0/UZMap/';
    if(bbbbb == "ios"){
       uelr ='/var/mobile/Containers/Data/Application'+pathAdd+'/Documents/uzfs/';
    }

    var appid=appIds;
    url = uelr+appid+'/caogaoxiang/'+playgedan ;

    fnFuZhiAudio(url);
    titlename = rets.data[play].name;
    desc = rets.data[play].desc;
    singerName = rets.data[play].singerName;
    author_id = rets.data[play].author_id;
    api.sendEvent({
        name: 'jibenxinxi',
        extra: {
            titlename: titlename,
            desc: desc,
            singerName: singerName,
            author_id: author_id,
        }
    });
    api.sendEvent({
        name: 'netbofangsssssss',
        extra: {
            a: playgedan,
            bofang: bofang
        }
    });
}

// function netRecordingModuleing(playgedans) {
//     playgedan = playgedans;
//     var appIds=api.appId;
//     var bbbbb = api.systemType;
//     var pathAdd = $api.getStorage('pathAdd');
//     var uelr = '/storage/emulated/0/UZMap/';
//     if(bbbbb == "ios"){
//       uelr ='/var/mobile/Containers/Data/Application'+pathAdd+'/Documents/uzfs/';
//     }
//
//     var appid=appIds;
//     url=uelr+appid+'/caogaoxiang/'+playgedan;
//     fnFuZhiAudio(url);
//
//     titlename = rets.data[play].name;
//     desc = rets.data[play].desc;
//     singerName = rets.data[play].singerName;
//     author_id = rets.data[play].author_id;
//     api.sendEvent({
//         name: 'jibenxinxi',
//         extra: {
//             titlename: titlename,
//             desc: desc,
//             singerName: singerName,
//             author_id: author_id,
//         }
//     });
//     api.sendEvent({
//         name: 'netbofangsssssss',
//         extra: {
//             a: playgedan,
//             bofang: bofang
//         }
//     });
// }
//audio标签赋值
function fnFuZhiAudio(url) {
    var stylelist = $api.byId('yinpin');
    var html = '<audio id="myAudio" ><source src="' + url + '" type="audio/mp3"></audio>';
    $api.html(stylelist, html);
    if (html) {
        kaishibofang();
    }
}
//开始播放
function kaishibofang() {
    netAudioPlay();
    addtime();
    jindutiao();
}
//音频播放模块
function netAudioPlay() {
    var myAudio = document.getElementById("myAudio");
    myAudio.play();
    fnBoFangmoshiid();
    initEventListennerBoFangMoshi();
    api.sendEvent({
        name: 'jibenxinxi',
        extra: {
            titlename: titlename,
            desc: desc,
            singerName: singerName,
        }
    });
    if(bofang == 8){
      bofang = 9;
    }else if(bofang == 6){
      bofang = 7;
    }else if (bofang == 4) {
      bofang = 5;
    }else if (bofang == 2) {
      bofang = 3;
    }else if(bofang == 0){
      bofang = 1;
    }else if (!bofang) {
      bofang = 1;
    }

    api.sendEvent({
        name: 'netBoFangId',
        extra: {
            bofang: bofang
        }
    });


}

//关闭音频
function netAudioPause() {
    var myAudio = document.getElementById("myAudio");
    myAudio.pause();
    if (bofang == 9) {
      bofang = 8;
    }else if(bofang == 7){
      bofang = 6;
    }else if (bofang == 5) {
      bofang = 4;
    }else if (bofang == 3) {
      bofang = 2;
    }else if (bofang == 1) {
      bofang = 0;
    }
    api.sendEvent({
        name: 'netBoFangId',
        extra: {
            bofang: bofang
        }
    });
}

//获取当前歌曲的歌长
function jindutiao() {
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
function adjust() {
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
function addtime() {
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

//歌单上一首
function fnGeDanShangYi() {
    var myAudio = document.getElementById("myAudio");
    netAudioPause();
    myAudio.currentTime = 0;
    clearInterval(timer2);
    clearInterval(timer1);
    play--;
    if (play < 0) {
        play = rets.data.length - 1;
    }
    fnBoFangyinpinxinxi(play);
}
//歌单下一首
function fnGeDanxiaYi() {
    var myAudio = document.getElementById("myAudio");
    netAudioPause();
    myAudio.currentTime = 0;
    myAudio.load();
    clearInterval(timer2);
    clearInterval(timer1);
    play++;
    if (play > rets.data.length - 1) {
        play = 0;
    }
    fnBoFangyinpinxinxi(play);
}
//获取歌单歌曲id
function netPlayLieIdUrl(playlistid,playUrli) {
    if(playlistid){
      uri = playUrli;
        api.ajax({
            url: host + apiUri + uri + playlistid,
            method: 'get',
            dataType: 'json',
            headers: {
                "source": api.systemType,
                "version": version,
                "session": token
            }
        }, function(ret, err) {
         if(ret){
          //  console.log(JSON.stringify(ret));
          if (ret.status == 200) {
              fnZhuanJiZhanshi(ret);
          } else {
            netMessage(ret);
          }
        }else{
          netWork(err);
        }
        });
      }


}
//当前播放id
function fnBFid(id) {
    DangQianbofangid = id;
    api.sendEvent({
        name: 'netPlaying',
        extra: {
            playing: DangQianbofangid,
        }
    });
}

//获取 草稿箱列表歌曲
function netPlayLieCgx(cgxnewid) {
    api.getPrefs({
        key: 'cgxlist'
    }, function(ret, err) {
        var historyUrlText = '' || ret.value;
        historyUrlArray = historyUrlText.split(',');
        cgxPlay(cgxnewid);
    });
}

function cgxPlay(cgxnewid) {
    var cgxnewids = cgxnewid - 1;
    ret = '';
    var length = historyUrlArray.length - 1;
    for (var i = 0; i < length / 5 + 1; i++) {
        if (historyUrlArray[i].length == 0)
            continue;
        caogaoId = '';
        caogaoId += historyUrlArray[i * 5 - 4];
        caogaoTitle = '';
        caogaoTitle += historyUrlArray[i * 5 - 3];
        caogaoName = '';
        caogaoName += historyUrlArray[i * 5 - 2];
        caogaoBody = '';
        caogaoBody += historyUrlArray[i * 5 - 1];
        caogaoAuthor_id = '';
        caogaoAuthor_id += historyUrlArray[i * 5];
        clearInterval(timer2);
        clearInterval(timer1);
        dataArray.push({
            "id": caogaoId,
            "name": caogaoTitle,
            "singerName": caogaoName,
            "desc": caogaoBody,
            "author_id":caogaoAuthor_id
        });
        rets = {
            "data": dataArray
        };
    }
    fnDQBF(cgxnewids);
}
//草稿箱  当前播放
function fnBFcgx(id) {
    DangQianbofangid = id;
    api.sendEvent({
        name: 'netPlaying',
        extra: {
            playing: DangQianbofangid,
        }
    });
}

function fnDQBF(y) {
    play = y;
    fnBoFangyinpinxinxi(play);
}

function fnZhuanJiZhanshi(data_) {
    rets = data_;
    console.log();
    for (y = 0; y < rets.data.length; y++) {
        var id1 = rets.data[y].id;
        var id2 = DangQianbofangid;
        if (id1 == id2) {
            clearInterval(timer1);
            clearInterval(timer2);
            fnDQBF(y);
        }
    }
}

//随机播放歌曲
function suiji() {
    clearInterval(shunxuplays);
    var Range = 0 - rets.data.length;
    var Rand = Math.random();
    var n = rets.data.length + Math.floor(Rand * Range);
    suijiplays = setInterval(function() {
        if (myAudio.ended) {
            if (n == rets.data.length) {
                n == rets.data.length - 1;
                fnSuiJiBoFangMoShiGeQuid(n);
            } else {
                fnSuiJiBoFangMoShiGeQuid(n);
            }
        }
    }, 1000);
    bofangmoshiid = 1;
    fnBFMoshi(bofangmoshiid);
}
//顺序播放
function shunxu() {
    var myAudio = document.getElementById("myAudio");
    clearInterval(danquplays);
    shunxuplays = setInterval(function() {
      if(myAudio){
        if (myAudio.ended) {
            fnGeDanxiaYi();
        }
      }

    }, 1000);
    bofangmoshiid = 0;
    fnBFMoshi(bofangmoshiid);
}
//单曲播放
function bfdanqu() {
    var myAudio = document.getElementById("myAudio");
    clearInterval(suijiplays);
    danquplays = setInterval(function() {
        if (myAudio.ended) {
            fndanqubofangmoshi();
        }
    }, 1000);
    bofangmoshiid = 2;
    fnBFMoshi(bofangmoshiid);
}
//随机播放歌曲跟新
function fnSuiJiBoFangMoShiGeQuid(n) {
    play = n;
    var myAudio = document.getElementById("myAudio");
    netAudioPause();
    myAudio.currentTime = 0;
    clearInterval(timer2);
    clearInterval(timer1);
    fnBoFangyinpinxinxi(play);
}
//单曲循环播放更新
function fndanqubofangmoshi() {
    netAudioPause();
    myAudio.currentTime = 0;
    clearInterval(timer1);
    clearInterval(timer2);
    fnBoFangyinpinxinxi(play);

}

function fnBFMoshi(MoShiId) {
    bofangmoshiid = MoShiId;
}

//判断播放模式
function fnBoFangmoshiid() {
    if (bofangmoshiid == '0') {
        shunxu();
    } else if (bofangmoshiid == '1') {
        suiji();
    } else if (bofangmoshiid == '2') {
        bfdanqu();
    }

}

function fnBOFangJian(bofangs, aa, playlist,playUrlis) {
    if (playlistid) {


        playlistid = playlist;
        playUrli = playUrli;
    }
    if(aa) {
        a = aa;

    }
    bofang = bofangs;
}
// function fnBOFangJianss(bofangs, aa, danQus) {
//
//         a = aa;
//         bofang = bofangs;
//         danQu = danQus;
//
// }
function fnCollection(cccc){
  is_collection = cccc;
}
//监听播放模式
function initEventListennerBoFangMoshi() {
    //监听播放模式
    api.addEventListener({
        name: 'bofangmoshi'
    }, function(ret, err) {
        if (ret) {
            fnBFMoshi(ret.value.bofangmoshi);
            fnBoFangmoshiid();
        }
    });
    api.addEventListener({
        name: 'collection'
    }, function(ret, err) {
        if (ret) {
            fnCollection(ret.value.is_collection);
        }
    });
}

function initEventListennerBofang() {
    api.addEventListener({
        name: 'netPlayUrl'
    }, function(ret, err) {
        if (ret) {
            fnBFid(ret.value.id);
        }
    });
    api.addEventListener({
        name: 'netPlayLieIdUrl'
    }, function(ret, err) {
        if (ret) {
            netPlayLieIdUrl(ret.value.playlistid,ret.value.playUrli);
        }
    });
    // 草稿箱  当前播放
    api.addEventListener({
        name: 'netPlayCgx'
    }, function(ret, err) {
        if (ret) {
            fnBFcgx(ret.value.id);
            netPlayLieCgx(ret.value.id);
        }
    });
    // 草稿箱  当前播放
    api.addEventListener({
        name: 'netPlayingCgx'
    }, function(ret, err) {
        if (ret.value.id) {
            netAudioPlay();
        }
    });
    // 当前播放
    api.addEventListener({
        name: 'netPlayingUrl'
    }, function(ret, err) {
        if (ret.value.id) {
            netAudioPlay();
        }
    });
    //监听暂停音频
    api.addEventListener({
        name: 'netAudiopauseSss'
    }, function(ret, err) {
        if (ret) {
            netAudioPause();
        }
    });
    //GeDan上一首
    api.addEventListener({
        name: 'GeDanshangyi'
    }, function(ret, err) {
        if (ret) {
            fnGeDanShangYi();
        }
    });
    //GeDan下一首
    api.addEventListener({
        name: 'GeDanxiayi'
    }, function(ret, err) {
        if (ret) {
            fnGeDanxiaYi();
        }
    });
    api.addEventListener({
        name: 'neizhiliebiaoPlay'
    }, function(ret, err) {
        var bofang = ret.value.bofang;
        var a = ret.value.a;
        var playlistid = ret.value.playlistid;
        var playUrli = ret.value.playUrli;
        if (playlistid) {
            fnBOFangJian(bofang, a, playlistid,playUrli);
        } else {
            fnBOFangJian(bofang, a);
        }
    });
    api.addEventListener({
        name: 'netPlay'
    }, function(ret, err) {
        netAudioPlay();
    });
}
