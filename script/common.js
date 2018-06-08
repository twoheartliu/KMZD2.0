// var host = 'http://47.100.11.38';
var host = 'https://api.kmzhidao.com';
var version = '2.0';
var apiUri = '/kmzd/2.0';
//
var http = 'http://47.100.11.38/kmzd/public/uploads/';
//用户头像
var updatePhotoUrl = 'http://47.100.11.38/kmzd/public/uploads/photo/';
var listeningImg = 'http://47.100.11.38/kmzd/public/uploads/listening/';
// 用户作品
var userRecord = 'http://47.100.11.38/kmzd/public/uploads/records/';
//banner;
var uploadsBanner = 'http://47.100.11.38/kmzd/public/uploads/banner/';


//token
//    var token = $api.getStorage('token');

//用户id
//    var user_id = $api.getStorage('user_id');

//用户昵称
//    var nick_name = $api.getStorage('nick_name');

//用户头像
//    var photo = $api.getStorage('photo');
//



// if(token){
//   tokens = token;
// }
// var fs = api.require('fs');
// fs.open({
//     path: 'fs://token/token.txt',
//     flags: 'read_write'
// }, function(ret, err) {
//   // console.log(3333);
//     if (ret.status) {
//         fs.read({
//             fd: ret.fd,
//             offset: 0
//         }, function(ret, err) {
//             if (ret.status) {
//
//                  token = ret.data;
//                 console.log(token);
//
//             } else {
//                 alert(JSON.stringify(err));
//             }
//         });
//     } else {
//         alert(JSON.stringify(err));
//     }
// });
