var host = 'http://47.100.11.38';
var version = '2.0';
var apiUri = '/kmzd/2.0';

apiready = function() {

  getToken();

}
// console.log(token);
function getToken(){
  // console.log(1111);
  var fs = api.require('fs');
  fs.open({
      path: 'fs://token/token.txt',
      flags: 'read_write'
  }, function(ret, err) {
    // console.log(3333);
      if (ret.status) {
          fs.read({
              fd: ret.fd,
              offset: 0
          }, function(ret, err) {
              if (ret.status) {


                // console.log(token);
                  fnFuZhi(ret.data);
              } else {
                  alert(JSON.stringify(err));
              }
          });
      } else {
          alert(JSON.stringify(err));
      }
  });

}
function fnFuZhi(data_){
     tokens = data_;
     return tokens;
}
