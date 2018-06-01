//index

//播放歌单音频
function fnXunTingXinXi() {
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
    console.log(JSON.stringify(ret));
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
              fnBFids(ret.data.user_id);
                  api.sendEvent({
                      name: 'netbofangsssssss',
                      extra: {
                          a: ret.data.user_id,
                          bofang: bofang
                      }
                  });
                  if(ret.data.user_id){
                    var userId = ret.data.user_id;
                    var userUrl = ret.data.url;
                    url = userRecord + userId + '/'+ userUrl;
                    fnFuZhiAudios(url);
                  }else{
                    fnFuZhiAudios(host+'/'+ret.data.url);
                  }

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
              fnBFids(ret.data.user_id);
                  api.sendEvent({
                      name: 'netbofangsssssss',
                      extra: {
                          a: ret.data.user_id,
                          bofang: bofang
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
//开始播放
function kaishibofangs() {
    netAudioPlay();
    addtime();
    jindutiao();
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
        console.log(1111);
          var bofang = ret.value.bofang;
          // fnBFids(id);
          fnXunTingXinXi();
          fnBOFangJian(bofang);
      }
  });
    //下一首
    api.addEventListener({
        name: 'xunTingXiaYi'
    }, function(ret, err) {
        if (ret) {
          console.log(22222);
            fnXunTingXinXis();
        }
    });
    api.addEventListener({
        name: 'netPlayXunTing'
    }, function(ret, err) {
        netAudioPlay();
        addtime();
        jindutiao();
    });
    //监听暂停音频
    api.addEventListener({
        name: 'netAudiopauseXunTing'
    }, function(ret, err) {
        if (ret) {
            netAudioPause();
        }
    });
}
