/**
 * Created by Administrator on 2015/11/10.
 */
apiready = function () {

    var header = $api.byId('header');
    //适配iOS 7+和Android 4.4+沉浸式状态栏
    $api.fixStatusBar(header);

    var headerPos = $api.offset(header);


    exitApp();
};


function OpenSearch() {
    api.openWin({
        name: 'search',
        url: '../html/search1.html',
        delay: 150
    });
}

function exitApp(){
        api.addEventListener({
            name: 'keyback'
        }, function(ret, err){
            api.toast({
                    msg: '再按一次返回键退出'+api.appName,
                    duration:2000,
                    location: 'bottom'
                });

                api.addEventListener({
                    name: 'keyback'
                }, function(ret, err){
                    api.closeWidget({
                            id: 'A6060006152771',     //这里改成自己的应用ID
                            retData: {name:'closeWidget'},
                            silent:true
                        });
                });

                setTimeout(function(){
                        exitApp();
                },3000)
        });
}
