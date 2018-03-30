/**
 * Created by Administrator on 2015/11/10.
 */
var UIInput, text, language = 1;

apiready = function () {
    var header = $api.byId('header');
    //适配iOS 7+和Android 4.4+沉浸式状态栏
    $api.fixStatusBar(header);
    var headerPos = $api.offset(header);
    var clear = $api.byId('clear');
    var trans = $api.byId('trans');
    var cancel = $api.byId('cancel');
    var search = $api.byId('search');
    var main = $api.byId('main');
    var mainPos = $api.offset(main);
    $api.addEvt(clear, 'click', ClearInputBox);
    $api.addEvt(trans, 'click', TransInputBox);
    $api.addEvt(cancel, 'click', BackMainWindow);
    $api.addEvt(search, 'click', OpenResult);

    api.openFrame({
        name: 'history3',
        url: '../html/history3.html',
        bounces: false,
        rect: {
            x: 0,
            y: headerPos.h,
            w: 'auto',
            h: mainPos.h
        }
    });

    setTimeout(OpenInputBox, 50);
};

function OpenInputBox() {
    var input = $api.byId('input');
    var inputPos = $api.offset(input);
    UIInput = api.require('UIInput');
    UIInput.open({
        rect: {
            x: inputPos.l,
            y: 25,
            w: inputPos.w-1,
            h: input.clientHeight
        },
        styles: {
            bgColor: '#fff',
            size: 16,
            color: '#000',
            placeholder: {
                color: '#ccc'
            }
        },
        maxRows: 1,
        placeholder: '请输入关键词搜索...',
        keyboardType: 'search',
        fixedOn: ''
    }, function (ret) {
        UIInput.value(function (ret) {
            if (ret.status) {
                text = ret.msg;
                ChangeButton(ret.msg.trim().length);
            }
        });
        if (ret.eventType == 'search')
            UIInput.value(function (ret) {
                if (ret.status) {
                    text = ret.msg;
                    //console.log(text);
                    OpenResult();
                }
            });
    });
}

function BackMainWindow() {
    api.closeWin();
}

function ClearInputBox() {
    UIInput.value({
        msg: ''
    });
    text = undefined;
}

function TransInputBox() {
    UIInput.value(function (ret, err) {
        if (ret.status) {
            language == 1 && UIInput.value({
                msg: text = traditionalized(ret.msg)
            });

            language == -1 && UIInput.value({
                msg: text = simplized(ret.msg)
            });

            language *= -1;
        }
    });

}

function OpenResult() {
    if (text.trim().length == 0) {
        return;
    }
    //console.log(text);
    AddHistory(text);
}

function ChangeButton(flag) {
    var search = $api.byId('search');
    var cancel = $api.byId('cancel');
    if (flag == 0) {
        $api.removeCls(search, 'active');
        $api.addCls(cancel, 'active');
    } else {
        $api.removeCls(cancel, 'active');
        $api.addCls(search, 'active');
    }
}

//增加历史记录
function AddHistory(words, fromRoot) {

    api.getPrefs({
        key: 'history3'
    }, function (ret, err) {
      //console.log(JSON.stringify(ret));
        //alert(JSON.stringify(ret));
        var flag = false;//是否增加历史记录
        var historyText3 = '' || ret.value ;

        var historyArray3 = historyText3.split(',');
        for (var i = 0; i < historyArray3.length; i++) {
            decodeURIComponent(historyArray3[i]) == words && (flag = true);
        }
        !flag && historyArray3.splice(1,0,encodeURIComponent(words));
        !flag && api.setPrefs({
            key: 'history3',
            value: historyArray3.join(',')
        });
        api.openWin({
            name: 'result',
            url: '../html/result3.html',
            delay: 500,
            pageParam: {
                text: words,
                fromRoot: fromRoot || false,
                addHistory: flag
            }
        });
    });
}
