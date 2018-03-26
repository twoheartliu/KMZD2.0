api.setStatusBarStyle({
    style: 'light',
    color: '#000'
});

      api.parseTapmode();
      $api.fixStatusBar($api.dom('header'));
      api.addEventListener({
          name: 'keyback'
      }, function(ret, err) {
          api.toast({
              msg: '再点一次退出应用',
              duration: 2000,
              location: 'bottom'
          });
          api.addEventListener({
              name: 'keyback'
          }, function(ret, err) {
              api.closeWidget({
                  silent: true
              });
          });
          setTimeout(function() {
              exitApp();
          }, 2000)
      });

  function upimg() {
      api.actionSheet({
          title: '上传照片',
          cancelTitle: '取消',
          buttons: ['拍照', '手机相册']
      }, function(ret, err) {
          if (ret) {
              getPicture(ret.buttonIndex);
          }
      });
  }

  function getPicture(sourceType) {
      //相机拍照
      if (sourceType == 1) {
          api.getPicture({
              sourceType: 'camera',
              encodingType: 'jpg',
              mediaValue: 'pic',
              allowEdit: false,
              quality: 96,
              saveToPhotoAlbum: false
          }, function(ret, err) {
              // 获取拍照图像并剪辑
              if (ret) {
                  $api.byId('box').style.visibility = 'visible';
                  var FNImageClip = api.require('FNImageClip');
                  FNImageClip.open({
                      rect: {
                          x: 0,
                          y: 0,
                          w: api.winWidth,
                          h: api.winHeight - document.querySelector('#box').offsetHeight
                      },
                      srcPath: ret.data,
                      mode: 'image',
                      style: {
                          mask: 'rgba(0,0,0,0.75)',
                          clip: {
                              w: 200,
                              h: 200,
                              x: (api.frameWidth - 200) / 2,
                              y: (api.frameHeight - 200) / 2,
                              borderColor: '#0f0',
                              borderWidth: 1,
                              appearance: 'rectangle'
                          }
                      },
                  }, function(ret, err) {});
              }
          });
      } else if (sourceType == 2) {
          //手机相册选图片
          var obj = api.require('UIMediaScanner');
          obj.open({
              type: 'picture',
              column: 4,
              max: 1,
              sort: {
                  key: 'time',
                  order: 'desc'
              },
              texts: {
                  stateText: '已选择*项',
                  cancelText: '取消',
                  finishText: '完成'
              },
              styles: {
                  bg: '#fff',
                  mark: {
                      icon: '',
                      position: 'bottom_right',
                      size: 20
                  },
                  nav: {
                      bg: '#eee',
                      stateColor: '#000',
                      stateSize: 18,
                      cancleBg: 'rgba(0,0,0,0)',
                      cancelColor: '#000',
                      cancelSize: 18,
                      finishBg: 'rgba(0,0,0,0)',
                      finishColor: '#000',
                      finishSize: 18
                  }
              }
          }, function(ret) {
              //将选择的图像进行剪辑
              if (ret.eventType == 'cancel') {} else if (ret.list.length > 0) {
                  $api.byId('box').style.visibility = 'visible';
                  var FNImageClip = api.require('FNImageClip');
                  FNImageClip.open({
                      rect: {
                          x: 0,
                          y: 0,
                          w: api.winWidth,
                          h: api.winHeight - document.querySelector('#box').offsetHeight
                      },
                      srcPath: ret.list[0].path,
                      mode: 'image',
                      style: {
                          mask: 'rgba(0,0,0,0.75)',
                          clip: {
                              w: 200,
                              h: 200,
                              x: (api.frameWidth - 200) / 2,
                              y: (api.frameHeight - 200) / 2,
                              borderColor: '#0f0',
                              borderWidth: 0,
                              appearance: 'rectangle'
                          }
                      },
                  }, function(ret, err) {});
              }
          });
      }
  }

  //保存剪辑图像
  function save() {
      var FNImageClip = api.require('FNImageClip');
      var nubs = nub(1000, 3000);
      FNImageClip.save({
          destPath: 'fs://tx_' + nubs + '.jpg',
          copyToAlbum: false,
          quality: 1
      }, function(ret, err) {
          $api.byId('box').style.visibility = 'hidden';
          var tx = ret.destPath;
          FNImageClip.close();
          //上传剪辑后的图像到服务器
          api.ajax({
              report: true,
              url: 'http://nfyx.cn/app/up_img.php',
              method: 'post',
              cache: 'false',
              timeout: 30,
              dataTpye: 'json',
              data: {
                  files: {
                      file: tx
                  }
              }
          }, function(ret, err) {
              var b0 = ret.progress;
              $api.byId('jd').style.width = b0 + '%';
              //上传进度
              if (ret.body.ok == 0) {
                  api.toast({
                      msg: '上传错误',
                      duration: 3000,
                      location: 'bottom'
                  });
              } else if (ret.body.ok == 1) {
                  $api.byId('tx').innerHTML = '<img src="http://nfyx.cn/app/img/' + ret.body.name + '">';
                  api.toast({
                      msg: '上传成功',
                      duration: 3000,
                      location: 'bottom'
                  });
              } else if (ret.body.ok == 2) {
                  api.toast({
                      msg: '图像无效',
                      duration: 3000,
                      location: 'bottom'
                  });
              }
          });
      });
  }

  function nub(minNum, maxNum) {
      switch (arguments.length) {
          case 1:
              return parseInt(Math.random() * minNum + 1);
              break;
          case 2:
              return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
              break;
          default:
              return 0;
              break;
      }
  }
