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
// function fnBoFangyinpinxinxi() {
//     fnUserFollow();
//     clearInterval(timer2);
//     clearInterval(timer1);
//     playgedan = rets.data[play].id;
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
//       if(ret){
//       if(ret.status == 200){
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
//
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
//         netRecordingModule(playgedan);
//       }
//     }else{
//       netRecordingModule(playgedan);
//     }
//     });
// }
//
// function netRecordingModule(playgedans) {
//   playgedan = playgedans;
//     var appIds=api.appId;
//     var bbbbb = api.systemType;
//     var pathAdd = $api.getStorage('pathAdd');
//     var uelr = '/storage/emulated/0/UZMap/';
//     if(bbbbb == "ios"){
//        uelr ='/var/mobile/Containers/Data/Application'+pathAdd+'/Documents/uzfs/';
//     }
//
//     var appid=appIds;
//     url = uelr+appid+'/caogaoxiang/'+playgedan ;
//
//     fnFuZhiAudio(url);
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

//播放歌单音频
function fnBoFangyinpinxinxi() {
  var myAudio = document.getElementById("myAudio");
  if(myAudio){
    myAudio.pause();
  }
    fnUserFollow();
    clearInterval(timer2);
    clearInterval(timer1);

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
                        playUrli:playUrli,
                        bofangmoshiid:bofangmoshiid,
                        playType:playType,
                    }
                });
            }
            fnBFid(ret.data.id);
            api.sendEvent({
                name: 'neiJianTingGood',
                extra: {
                    bookId:ret.data.id,
                    bofangmoshiid:bofangmoshiid
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
                fnFuZhiAudio(host+'/'+ret.data.url);
              }
            }

            titlename = ret.data.title;
            reciter = ret.data.reciter;
            desc = ret.data.body;
            singerName = ret.data.author_name;
            cover_big = ret.data.cover_big;
            api.sendEvent({
                name: 'jibenxinxi',
                extra: {
                    titlename: titlename,
                    desc: desc,
                    reciter: reciter,
                    singerName: singerName,
                    comment_total: comment_total,
                    collection: is_collection,
                    bofangmoshiid:bofangmoshiid,
                    cover_big:cover_big
                }
            });
            fnBoFangmoshiid();
      }else{
        netMessage(ret);
      }
    }else{
      netWork(err);
    }
    });
}
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
var aaaaaa;
var readyStateS;
function record_starts(){
  var myAudio = document.getElementById("myAudio");
  timesss = myAudio.currentTime
  if(timesss > 0){
    aaaaaa = 2;
    if(aaaaaa == 2){
      api.sendEvent({
          name: 'aaaaaaPlay',
          extra: {
              aaaaaa: aaaaaa,
          }
      });
    }
    myAudio.removeEventListener('timeupdate', record_starts);
  }
}
function record_startSs(){
  var myAudio = document.getElementById("myAudio");
  readyStateS = myAudio.readyState
  if(readyStateS == 4){

    myAudio.removeEventListener('readyState', record_startSs);
  }

}
// function record_startSs(){
//   var myAudio = document.getElementById("myAudio");
//   readyStateS = myAudio.readyState
//   if(readyStateS == 4){
//
//     myAudio.removeEventListener('readyState', record_startSs);
//   }
//
// }
var aaa;
function fnJianTing(sss){
  aaa = sss;
}

//音频播放模块
function netAudioPlay() {
  aaaaaa = 1;
  api.sendEvent({
      name: 'aaaaaaPlay',
      extra: {
          aaaaaa: aaaaaa,
      }
  });
    var myAudio = document.getElementById("myAudio");
    myAudio.addEventListener('timeupdate', record_starts);
    myAudio.addEventListener('readyState', record_startSs);
    myAudio.play();
    if(myAudio.networkState == 3){
      setTimeout(function(){
        myAudio.pause();
        myAudio.play();
      },1000)
    }
    var phoneListener = api.require('phoneListener');
    phoneListener.headphonePluggedListener({
            enable : true
        },function(ret) {
          if(ret.state == false){
           if(aaa == 'undefined'){
             fnJianTing('false');
           }else if(aaa == 'true'){
             netAudioPause();
             api.sendEvent({
                 name: 'netBoFangId',
                 extra: {
                     bofang: 2,
                     playType:playType
                 }
             });
             api.sendEvent({
                 name: 'netBoFangPlayType',
                 extra: {
                     bofang: 2,
                     playType:playType
                 }
             });
             fnJianTing('false');
           }else if(aaa == 'false'){
             fnJianTing('true');
           }
        }else if(ret.state == true){
          fnJianTing('true');
        }
    });
    // alert();
    // api.startRecord({
    //     path: 'fs://luyin/ssssssssssssss.amr'
    // });
    // var audioStreamer = api.require('audioStreamer');
    // audioStreamer.onNormal();
    // var agoraVideo = api.require('agoraVideo');
    // agoraVideo.isSpeakerphoneEnabled(function(ret) {
    //     if (ret.status) {
    //         alert('扬声器');
    //     }else{
    //         alert('ssss');
    //     }
    // });
    api.sendEvent({
        name: 'bFbbbbb',
        extra: {
            bFbbbbb: 2,
        }
    });
    // audio.volume=volumevalue;
    // fnBoFangmoshiid()
    api.addEventListener({
        name: 'playPlay'
    }, function(ret, err) {
        if (ret) {
            netAudioPause();
        }
    });
    // var phoneListener = api.require('phoneListener');
    // phoneListener.headphonePluggedListener({
    //         enable : false
    //     },
    //     function(ret) {
    //      alert(JSON.stringify(ret));
    // });
    initEventListennerBoFangMoshi();
    api.sendEvent({
        name: 'jibenxinxi',
        extra: {
            titlename: titlename,
            desc: desc,
            singerName: singerName,
            bofangmoshiid:bofangmoshiid,
            cover_big:cover_big
        }
    });
    if(bofang == 2) {
      bofang = 3;
    }

    api.sendEvent({
        name: 'netBoFangId',
        extra: {
            bofang: bofang,
            playType:playType
        }
    });


}

//关闭音频
function netAudioPause() {
    var myAudio = document.getElementById("myAudio");
    myAudio.pause();

    // api.stopRecord(function(ret, err) {
    //     if (ret) {
    //         path = ret.path;
    //         duration = ret.duration;
    //     }
    // });
    // fs.rmdir({
    //     path: 'fs://luyin'
    // }, function(ret, err) {
    //     if (ret.status) {} else {
    //         // alert(JSON.stringify(err));
    //     }
    // });
    // myAudio.muted=true();
    if (bofang == 3) {
      bofang = 2;
    }

    api.sendEvent({
        name: 'netBoFangId',
        extra: {
            bofang: bofang,
            bofangmoshiid:bofangmoshiid,
            playType:playType
        }
    });
    // api.addEventListener({
    //     name: 'bFaaaaa'
    // }, function(ret, err) {
    //     if (ret) {
    //       api.addEventListener({
    //           name: 'bFbbbbb'
    //       }, function(ret, err) {
    //           if (ret) {
    //             var myAudio = document.getElementById("myAudio");
    //             myAudio.pause();
    //               myAudio.currentTime = 0;
    //               clearInterval(timer2);
    //               clearInterval(timer1);
    //           }
    //       });
    //
    //     }
    // });
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
        minuteFollow = minute;
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
    setTimeout(function(){
        fnBoFangyinpinxinxi(play);
    },1000)

}
//歌单下一首
function fnGeDanxiaYi() {
    var myAudio = document.getElementById("myAudio");
    netAudioPause();
    myAudio.currentTime = 0;
    // myAudio.load();

    clearInterval(timer2);
    clearInterval(timer1);
    play++;
    if (play > rets.data.length - 1) {
        play = 0;
    }

    setTimeout(function(){
        fnBoFangyinpinxinxi(play);
    },3000)
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
            },
            data:{
              values:{
                'is_play_all':1
              }
            }
        }, function(ret, err) {
         if(ret){
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

function netPlayLieIdUrlAll(playlistid,playUrli,is_play_all) {
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
            },
            data:{
              values:{
                'is_play_all':1
              }
            }
        }, function(ret, err) {
         if(ret){
          if (ret.status == 200) {
            rets = ret;
            play = 0;
            fnBoFangyinpinxinxi(play);
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
    var bofangI = bofang;
    var playTypes = playType;
    api.sendEvent({
        name: 'netPlaying',
        extra: {
            playing: DangQianbofangid,
            bofang:bofangI,
            playType:playTypes
        }
    });


}

// //获取 草稿箱列表歌曲
// function netPlayLieCgx(cgxnewid) {
//     api.getPrefs({
//         key: 'cgxlist'
//     }, function(ret, err) {
//         var historyUrlText = '' || ret.value;
//         historyUrlArray = historyUrlText.split(',');
//         cgxPlay(cgxnewid);
//     });
// }
//
// function cgxPlay(cgxnewid) {
//     var cgxnewids = cgxnewid - 1;
//     ret = '';
//     var length = historyUrlArray.length - 1;
//     for (var i = 0; i < length / 5 + 1; i++) {
//         if (historyUrlArray[i].length == 0)
//             continue;
//         caogaoId = '';
//         caogaoId += historyUrlArray[i * 5 - 4];
//         caogaoTitle = '';
//         caogaoTitle += historyUrlArray[i * 5 - 3];
//         caogaoName = '';
//         caogaoName += historyUrlArray[i * 5 - 2];
//         caogaoBody = '';
//         caogaoBody += historyUrlArray[i * 5 - 1];
//         caogaoAuthor_id = '';
//         caogaoAuthor_id += historyUrlArray[i * 5];
//         clearInterval(timer2);
//         clearInterval(timer1);
//         dataArray.push({
//             "id": caogaoId,
//             "name": caogaoTitle,
//             "singerName": caogaoName,
//             "desc": caogaoBody,
//             "author_id":caogaoAuthor_id
//         });
//         rets = {
//             "data": dataArray
//         };
//     }
//     fnDQBF(cgxnewids);
// }
// //草稿箱  当前播放
// function fnBFcgx(id) {
//     DangQianbofangid = id;
//     api.sendEvent({
//         name: 'netPlaying',
//         extra: {
//             playing: DangQianbofangid,
//         }
//     });
// }

function fnDQBF(y) {
    play = y;
    fnBoFangyinpinxinxi(play);
}
function fnUserFollow(){
  if(minuteFollow){
    api.ajax({
        url: host + apiUri + '/user/update_learn_time',
        method: 'post',
        dataType: 'json',
        headers: {
            "source": api.systemType,
            "version": version,
            "session": token
        },
        data:{
          values:{
            learn_time:minuteFollow
          }
        }
    }, function(ret, err) {
     if(ret){
      if (ret.status == 200) {
          // fnZhuanJiZhanshi(ret);
      } else {
        netMessage(ret);
      }
    }else{
      netWork(err);
    }
    });
  }
}


function fnZhuanJiZhanshi(data_) {
  rets = data_;
  // api.addEventListener({
  //     name: 'netPlayAotu'
  // }, function(ret, err) {
  //     if (ret) {
  //         fnPlayAotu();
  //         return false;
  //     }
  //     return false;
  // });
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
    // console.log(Range);
    var Rand = Math.random();
    console.log(Rand);
    var n = rets.data.length + Math.floor((Math.random()) * (0 - rets.data.length));
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
    bofangmoshiid = 1;
    fnBFMoshi(bofangmoshiid);
    myAudio.currentTime = 0;
    clearInterval(timer2);
    clearInterval(timer1);
    setTimeout(function(){
        fnBoFangyinpinxinxi(play);
    },3000)
}
//单曲循环播放更新
function fndanqubofangmoshi() {
    netAudioPause();
    myAudio.currentTime = 0;
    clearInterval(timer1);
    clearInterval(timer2);
    setTimeout(function(){
        fnBoFangyinpinxinxi(play);
    },3000)

}

function fnBFMoshi(MoShiId) {
    bofangmoshiid = MoShiId;
    api.sendEvent({
        name: 'neiJianTingBFms',
        extra: {
            bofangmoshiid: MoShiId,
        }
    });

}

//判断播放模式
function fnBoFangmoshiid() {
    if (bofangmoshiid == 1) {
        suiji();
    } else if (bofangmoshiid == 2) {
        bfdanqu();
    }else{
      shunxu();
    }
}

function fnBOFangJian(bofangs,playTypes, aa, playlist,playUrlis) {
    if (playlistid) {
        playlistid = playlist;
        playUrli = playUrli;
    }
    if(aa) {
        a = aa;
    }
    bofang = bofangs;
    playType=playTypes;
}
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
          // api.sendEvent({
          //     name: 'neiJianTingGood',
          //     extra: {
          //         bofangmoshiid:ret.value.bofangmoshi
          //     }
          // });
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
          if(ret.value.is_play_all){
            netPlayLieIdUrlAll(ret.value.playlistid,ret.value.playUrli,ret.value.is_play_all);
          }else{
            netPlayLieIdUrl(ret.value.playlistid,ret.value.playUrli);
          }

        }
    });
    // 草稿箱  当前播放
    // api.addEventListener({
    //     name: 'netPlayCgx'
    // }, function(ret, err) {
    //     if (ret) {
    //         fnBFcgx(ret.value.id);
    //         netPlayLieCgx(ret.value.id);
    //     }
    // });
    // 草稿箱  当前播放
    // api.addEventListener({
    //     name: 'netPlayingCgx'
    // }, function(ret, err) {
    //     if (ret.value.id) {
    //         netAudioPlay();
    //     }
    // });
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
        var playType = ret.value.playType;
        if (playlistid) {
            fnBOFangJian(bofang ,playType, a, playlistid,playUrli);
        } else {
            fnBOFangJian(bofang ,playType, a);
        }
    });
    api.addEventListener({
        name: 'netPlay'
    }, function(ret, err) {
        netAudioPlay();
    });
}
