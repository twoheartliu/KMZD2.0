//index

//播放歌单音频
function fnXunTingXinXi() {
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
//播放歌单音频
function fnXunTingXinXis() {
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
                          bofang: bofang
                      }
                  });

                    fnFuZhiAudiossss(host+'/'+ret.data.url);


                  titlename = ret.data.title;
                  reciter = ret.data.reciter;
                  desc = ret.data.body;
                  singerName = ret.data.author_name;
                  comment_total = ret.data.comment_total;
                  is_collection =ret.data.is_collection;
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
}

//audio标签赋值
function fnFuZhiAudiossss(url) {
    var stylelist = $api.byId('yinpin');
    var html = '<audio id="myAudio" ><source src="' + url + '" type="audio/mp3"></audio>';
    $api.html(stylelist, html);
    kaishibofangs()
}
//开始播放
function kaishibofangs() {
    // netAudioPlay();
    var myAudio = document.getElementById("myAudio");
    myAudio.play();
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
            bofang: bofang
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
            bofang:bofang
        }
    });
}

function fnBOFangJians(bofangs, aa) {
    if(aa){
        a = aa;
    }
    bofang = bofangs;
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
          fnXunTingXinXi();
          fnBOFangJian(bofang);
      }
  });
    //下一首
    api.addEventListener({
        name: 'xunTingXiaYi'
    }, function(ret, err) {
        if (ret) {
            fnXunTingXinXis();
        }
    });
    api.addEventListener({
        name: 'netPlayXunTing'
    }, function(ret, err) {
      fnBOFangJian(ret.value.bofang);
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