var host = 'https://api.kmzhidao.com';
var version = '2.0';
var apiUri = '/kmzd/2.0';
//
var http = 'https://api.kmzhidao.com/kmzd/public/uploads/';
//用户头像
var updatePhotoUrl = 'https://api.kmzhidao.com/kmzd/public/uploads/photo/';
var listeningImg = 'https://api.kmzhidao.com/kmzd/public/uploads/listening/';
// 用户作品
var userRecord = 'https://api.kmzhidao.com/kmzd/public/uploads/records/';
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
