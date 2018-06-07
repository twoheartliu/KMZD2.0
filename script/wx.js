//shareType  分享类型
//session（会话）
//timeline（朋友圈）
//favorite（收藏）


var wx;
var is_wx = 0;

var wxApiKey = "wxee4b5978056a41ba";
function initWx(){
    wx = api.require('wx');
    //微信分享
    wx.isInstalled(function(ret, err) {
        console.log("查看微信是否已安装");
        if (ret.installed) {
            is_wx = 1;
        } else {
            //alert('当前设备未安装微信客户端');
        }
    });
}


function shareImg(shareType,img,callback){
    console.log("调用微信图片分享："+shareType+","+img);
    api.download({
        url: img,
        savePath: 'fs://image/download/tmp.jpg',
        report: true,
        //cache: true,
        allowResume: true
    }, function(ret, err) {
        if (ret.state == 1) {
            shareImgDo(shareType,'fs://image/download/tmp.jpg');
        } else {
        }
    });
}

function shareImgDo(shareType,img){
    wx.shareImage({
        apiKey: wxApiKey,
        scene: shareType,
        contentUrl: img
    }, function(ret, err) {
        console.log("wx.js微信分享返回成功消息："+JSON.stringify(ret));
        console.log("wx.js微信分享返回错误消息："+JSON.stringify(err));
        if (ret.status) {
            var uid = getUid();
            if(uid)
                add_sore_log(getUid(),2,"分享图片");
            api.toast({msg: '分享成功',duration: 2000,location: 'bottom'});
            console.log("分享成功");
        } else {
            if(err.code == 2){
                api.toast({msg: '取消分享',duration: 2000,location: 'bottom'});
            }else if(err.code == 2){
                api.toast({msg: '发送失败',duration: 2000,location: 'bottom'});
            }else{
                api.toast({msg: '分享失败',duration: 2000,location: 'bottom'});
            }
            console.log("分享失败");
        }
    });
}


function shareText(shareType,text,callback){
    wx.shareText({
        apiKey: wxApiKey,
        scene: shareType,
        text: text
    }, function(ret, err) {
        console.log("wx.js微信分享返回成功消息："+JSON.stringify(ret));
        console.log("wx.js微信分享返回错误消息："+JSON.stringify(err));
        if (ret.status) {
            var uid = getUid();
            if(uid)
                add_sore_log(getUid(),2,"分享文字");
            api.toast({msg: '分享成功',duration: 2000,location: 'bottom'});
            console.log("分享成功");
            if(callback)
                callback.callback();
        } else {
            if(err.code == 2){
                api.toast({msg: '取消分享',duration: 2000,location: 'bottom'});
            }else if(err.code == 2){
                api.toast({msg: '发送失败',duration: 2000,location: 'bottom'});
            }else{
                api.toast({msg: '分享失败',duration: 2000,location: 'bottom'});
            }
            console.log("分享失败");
        }
    });
}


function shareHtml(shareType,title,url,callback){
    wx.shareWebpage({
        apiKey: wxApiKey,
        scene: shareType,
        title: title,
        description: '小夫子科技传媒有限公司',
        thumb:"widget://image/system.png",
        contentUrl: url
    }, function(ret, err) {
        console.log("wx.js微信分享返回成功消息："+JSON.stringify(ret));
        console.log("wx.js微信分享返回错误消息："+JSON.stringify(err));
        if (ret.status) {
            var uid = getUid();
            if(uid)
                add_sore_log(getUid(),2,"分享网页");
            api.toast({msg: '分享成功',duration: 2000,location: 'bottom'});
            console.log("分享成功");
            if(callback)
                callback.callback();
        } else {
            if(err.code == 2){
                api.toast({msg: '取消分享',duration: 2000,location: 'bottom'});
            }else if(err.code == 2){
                api.toast({msg: '发送失败',duration: 2000,location: 'bottom'});
            }else{
                api.toast({msg: '分享失败',duration: 2000,location: 'bottom'});
            }
            console.log("分享失败");
        }
    });
}
