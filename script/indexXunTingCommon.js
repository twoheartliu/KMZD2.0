//index

//播放歌单音频
function fnXunTingXinXi() {
  var myAudio = document.getElementById("myAudio");
  if(myAudio){
    myAudio.pause();
    console.log(22222);
  }
  fnUserFollow();
  clearInterval(timer2);
  clearInterval(timer1);
  api.ajax({
    url: host + apiUri + '/index/personal_music',
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
        api.ajax({
          url: host + apiUri + '/sound/' + ret.data.id,
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
              fnBFids(ret.data.id);
                  api.sendEvent({
                      name: 'netbofangsssssss',
                      extra: {
                          a: ret.data.id,
                          bofang: bofang,
                          playType:playType
                      }
                  });

                  var urlUrl = ret.data.url;
                  var sandBox = urlUrl.substring(0, 4);
                  if (sandBox == 'http') {
                      url =  urlUrl;
                      fnFuZhiAudios(url);
                  }else {
                    if(ret.data.user_id){
                      var userId = ret.data.user_id;
                      var userUrl = ret.data.url;
                      url = userRecord + userId + '/'+ userUrl;
                      fnFuZhiAudios(url);

                    }else{
                      fnFuZhiAudios(host+'/'+ret.data.url);
                    }
                  }
                  titlename = ret.data.title;
                  reciter = ret.data.reciter;
                  desc = ret.data.body;
                  singerName = ret.data.author_name;
                  comment_total = ret.data.comment_total;
                  is_collection =ret.data.is_collection;
                  cover_big = ret.data.cover_big;
                  api.sendEvent({
                      name: 'neiJianTingGood',
                      extra: {
                          bookId:ret.data.id
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

            }else{
              netMessage(ret);
            }
          }else{
            netWork(err);
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

//audio标签赋值
function fnFuZhiAudios(url) {
    var stylelist = $api.byId('yinpin');
    var html = '<audio id="myAudio" ><source src="' + url + '" type="audio/mp3"></audio>';
    $api.html(stylelist, html);
    kaishibofangs();
}


//开始播放
function kaishibofangs() {
    // netAudioPlay();
    var myAudio = document.getElementById("myAudio");
    myAudio.play();
    if(myAudio.networkState == 3){
      setTimeout(function(){
        myAudio.pause();
        myAudio.play();
      },500)
    }
    addtime();
    jindutiao();
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
            bofang: bofang,
            playType:playType
        }
    });
    fnXiaYiXunHuan();

}
function fnXiaYiXunHuan(){
  setInterval(function() {
    if(myAudio){
      if (myAudio.ended == true) {
        fnUserFollow();
        myAudio.currentTime = 0;
        clearInterval(timer2);
        clearInterval(timer1);

          fnXunTingXinXis();
      }
    }

  }, 1000);
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

function fnBOFangJians(bofangs, aa) {

    bofang = bofangs;
    playType = aa
}

function fnCollections(cccc){
  is_collection = cccc;
}
//监听播放模式

function initEventListennerShouCangXunTing() {
    // 监听播放模式

    // api.addEventListener({
    //     name: 'collection'
    // }, function(ret, err) {
    //     if (ret) {
    //         fnCollections(ret.value.is_collection);
    //     }
    // });
}

function initEventListennerBofangXunTing() {
  api.addEventListener({
      name: 'netPlayUrlXunTing'
  }, function(ret, err) {
      if (ret) {
          var bofang = ret.value.bofang;
          var playType = ret.value.playType;
          fnXunTingXinXi();
          fnBOFangJians(bofang,playType);
      }
  });
    //下一首
    api.addEventListener({
        name: 'xunTingXiaYi'
    }, function(ret, err) {
        if (ret) {
            fnXunTingXinXi();
        }
    });
    api.addEventListener({
        name: 'netPlayXunTing'
    }, function(ret, err) {
      fnBOFangJian(ret.value.bofang,ret.value.playType,ret.value.a);
      kaishibofangs();
        // netAudioPlay();
        // addtime();
        // jindutiao();

    });
    //监听暂停音频
    api.addEventListener({
        name: 'netAudiopauseXunTing'
    }, function(ret, err) {
        if (ret) {
            netAudioPause();
        }
    });
    // //监听暂停音频
    // api.addEventListener({
    //     name: 'netAudiopauseXunTing'
    // }, function(ret, err) {
    //     if (ret) {
    //         netAudioPause();
    //     }
    // });
}
