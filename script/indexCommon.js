//index

var play;
var timer2;
var timer1;
var historyUrlArray;
var y;
var rets;
var shunxuplays;
var danquplays;
var suijiplays;
var bofangmoshiid;
var playTime;
var a;
var bofang;
var playlistid;
var lenth;
var dataArray = new Array();
var caogaoId;
var caogaoTitle;
var caogaoName;
var caogaoBody;
var DangQianbofangid;
var titlename;
var desc;
var singerName;
var reciter;
//播放音频信息
function fnBoFangSouSuoyinpinxinxi() {
    var id = historyUrlArray[play];
    api.ajax({
        url: 'http://47.100.11.38/kongmeng/thirdParty/search_songs_by_id.php?id= ' + id,
        method: 'get',
        dataType: 'json',
    }, function(ret, err) {
        if (ret) {
            fnFuZhiAudio(ret.data[0].url);
            var singerName = ret.data[0].singerName;
        } else {
            alert(JSON.stringify(err));
        }
    });
}
//再次播放歌单音频
function fnBoFangyinpinxinxiing(play) {
    var playgedan = rets.data[play].id;
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
      if(ret.code == 200){
        if (JSON.stringify(ret.data) == '[]') {
            netRecordingModuleing(playgedan);
        } else {
            if (playlistid) {
                api.sendEvent({
                    name: 'netbofangsssssss',
                    extra: {
                        a: playgedan,
                        playlistid: playlistid,
                        bofang: bofang
                    }
                });
            }
            netAudioPlay(host+'/'+ret.data.url);
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
                    singerName: singerName
                }
            });
        }
      }else{
        alert(ret.message);
        $api.rmStorage('token');
        api.openWin({
            name: 'login',
            url: '../login.html'
        });
      }

    });
}
//播放歌单音频
function fnBoFangyinpinxinxi() {
    var playgedan = rets.data[play].id;
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
      if(ret.code == 200){
        if (JSON.stringify(ret.data) == '[]') {
            netRecordingModule(playgedan);
        } else {
            if (playlistid) {
                api.sendEvent({
                    name: 'netbofangsssssss',
                    extra: {
                        a: playgedan,
                        playlistid: playlistid,
                        bofang: bofang
                    }
                });
            }
            fnFuZhiAudio(host+'/'+ret.data.url);
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
                    singerName: singerName
                }
            });
        }
      }else{
        alert(ret.message);
        $api.rmStorage('token');
        api.openWin({
            name: 'login',
            url: '../login.html'
        });
      }

    });
}

function netRecordingModule(playgedan) {
    var appIds = api.appId;
    var uelr = '/storage/emulated/0/UZMap/';
    var appid = appIds;
    url = '' + uelr + '' + appid + '/caogaoxiang/' + playgedan + '';
    fnFuZhiAudio(url);
    titlename = rets.data[play].name;
    desc = rets.data[play].desc;
    singerName = rets.data[play].singerName;
    api.sendEvent({
        name: 'jibenxinxi',
        extra: {
            titlename: titlename,
            desc: desc,
            singerName: singerName
        }
    });
}

function netRecordingModuleing(playgedan) {
    var appIds = api.appId;
    var uelr = '/storage/emulated/0/UZMap/';
    var appid = appIds;
    url = '' + uelr + '' + appid + '/caogaoxiang/' + playgedan + '';
    fnFuZhiAudio(url);
    titlename = rets.data[play].name;
    desc = rets.data[play].desc;
    singerName = rets.data[play].singerName;
    api.sendEvent({
        name: 'jibenxinxi',
        extra: {
            titlename: titlename,
            desc: desc,
            singerName: singerName
        }
    });
}
//audio标签赋值
function fnFuZhiAudio(url) {
    var stylelist = $api.byId('yinpin');
    var html = '<audio id="myAudio" ><source src=  "' + url + '" type="audio/mpeg"></audio>';
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
    initEventListennerBoFangMoshi();
    api.sendEvent({
        name: 'jibenxinxi',
        extra: {
            titlename: titlename,
            desc: desc,
            singerName: singerName
        }
    });
    fnBoFangmoshiid();
}

//关闭音频
function netAudioPause() {
    var myAudio = document.getElementById("myAudio");
    myAudio.pause();
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
        api.sendEvent({
            name: 'zongJinDusss',
            extra: {
                lenth: lenth,
                html: html
            }
        });
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
        api.sendEvent({
            name: 'zongJinDu',
            extra: {
                cur: curs,
                lenth: lenth
            }
        });
        api.sendEvent({
            name: 'jibenxinxi',
            extra: {
                titlename: titlename,
                desc: desc,
                singerName: singerName
            }
        });
    }, 1000);
}

//添加搜索历史id
function netUrl(id) {
    api.getPrefs({
        key: 'sousuohistoryurl'
    }, function(ret, err) {
        if (ret) {
            var flag = false; //是否增加历史记录
            var historyUrlText = ret.value;
            var historyUrlArray = historyUrlText.split(',');
            for (var i = 0; i < historyUrlArray.length; i++) {
                historyUrlArray[i] == id && (flag = true);
            }!flag && historyUrlArray.splice(1, 0, id);
            !flag && api.setPrefs({
                key: 'sousuohistoryurl',
                value: historyUrlArray.join(',')
            });
            fnHistoryUrl(id);
        } else {
            alert(JSON.stringify(err));
        }
    });
}
//循环搜索历史id
function fnHistoryUrl(id) {
    var yinpin = $api.byId('yinpin');
    api.getPrefs({
        key: 'sousuohistoryurl'
    }, function(ret, err) {
        var historyUrlText = '' || ret.value;
        historyUrlArray = historyUrlText.split(',');
        for (var i = 0; i < historyUrlArray.length; i++) {
            if (historyUrlArray[i].length == 0)
                continue;
            var id1 = historyUrlArray[i];
            var id2 = id;
            var w = i;
            if (id1 == id2) {
                fnAudio(i);
            }
        }
    });
}

function fnAudio(i) {
    play = i;
    fnBoFangSouSuoyinpinxinxi();
}
//上一首
function fnShangYi() {
    var myAudio = document.getElementById("myAudio");
    myAudio.currentTime = 0;
    netAudioPause();
    play = play - 1;
    if (play == 0) {
        play = historyUrlArray.length - 1;
    }
    fnBoFangSouSuoyinpinxinxi();
}
//下一首
function fnxiaYi() {
    var myAudio = document.getElementById("myAudio");
    myAudio.currentTime = 0;
    netAudiopause();
    play = play + 1;
    if (play > historyUrlArray.length - 1) {
        play = 1;
    }
    fnBoFangSouSuoyinpinxinxi();
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
function netPlayLieIdUrl(playlistid) {
    if(playlistid){
      uri = '/album/song_list';
      api.ajax({
          url: host + apiUri + uri + '/' + playlistid,
          method: 'get',
          dataType: 'json',
          headers: {
              "source": api.systemType,
              "version": version,
              "session": token
          }
      }, function(ret, err) {

        if (ret.code == 200) {
            fnZhuanJiZhanshi(ret);
        } else {
          alert(ret.message);
          $api.rmStorage('token');
          api.openWin({
              name: 'login',
              url: '../login.html'
          });
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
    for (var i = 0; i < length / 4 + 1; i++) {
        if (historyUrlArray[i].length == 0)
            continue;
        caogaoId = '';
        caogaoId += historyUrlArray[i * 4 - 3];
        caogaoTitle = '';
        caogaoTitle += historyUrlArray[i * 4 - 2];
        caogaoName = '';
        caogaoName += historyUrlArray[i * 4 - 1];
        caogaoBody = '';
        caogaoBody += historyUrlArray[i * 4];
        clearInterval(timer2);
        clearInterval(timer1);
        dataArray.push({
            "id": caogaoId,
            "name": caogaoTitle,
            "singerName": caogaoName,
            "desc": caogaoBody
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
        if (myAudio.ended) {
            fnGeDanxiaYi();
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
    if (!bofangmoshiid) {
        shunxu();
    } else {
        if (bofangmoshiid == '0') {
            shunxu();
        } else if (bofangmoshiid == '1') {
            suiji();
        } else if (bofangmoshiid == '2') {
            bfdanqu();
        }
    }
}

function fnBOFangJian(bofangs, aa, playlist) {
    if (playlistid) {
        a = aa;
        bofang = bofangs;
        playlistid = playlist;
    } else {
        a = aa;
        bofang = bofangs;
    }
}

//监听播放模式
function initEventListennerBoFangMoshi() {
    //监听播放模式
    api.addEventListener({
        name: 'bofangmoshi'
    }, function(ret, err) {
        if (ret) {
            fnBFMoshi(ret.value.bofangmoshi);
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

    //监听url
    api.addEventListener({
        name: 'netUrl'
    }, function(ret, err) {
        if (ret) {
            netUrl(ret.value.id);
        }
    });
    api.addEventListener({
        name: 'netPlayLieIdUrl'
    }, function(ret, err) {
        if (ret) {
            netPlayLieIdUrl(ret.value.playlistid);
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
        name: 'netAudioPause'
    }, function(ret, err) {
        if (ret) {
            netAudioPause();
        }
    });
    //上一首
    api.addEventListener({
        name: 'bofangshangyi'
    }, function(ret, err) {
        if (ret) {
            fnShangYi();
        }
    });
    //下一首
    api.addEventListener({
        name: 'bofangxiayi'
    }, function(ret, err) {
        if (ret) {
            fnGeDanxiaYi();
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
        if (playlistid) {
            fnBOFangJian(bofang, a, playlistid);
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
