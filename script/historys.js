/**
 * Created by Administrator on 2015/11/10.
 */
apiready = function () {
    var clear = $api.byId('clear');
    $api.addEvt(clear, 'click', function () {
        ClearHistory();
    });
    InitHistory();

};

function InitHistory() {
    var history = $api.byId('history');
    api.getPrefs({
        key: 'historys'
    }, function (ret, err) {
        var historyText = ret.value || '';
        var historyArray = historyText.split(',');
        var li = '<li class="history" data-index="{index}">{text}<img class="historyImg" src="../image/x.png" alt="" style="float: right;"></li>';
        for (var i = 0; i < historyArray.length; i++) {
            if (historyArray[i].length == 0)
                continue;
            var tempLi = li.replace(/\{index\}/g, i);
            tempLi = tempLi.replace(/\{text\}/g, decodeURIComponent(historyArray[i]));
            history.appendHTML(tempLi);
    
        }

    });
}


function ClearHistory(index) {
    var history = $api.byId('history');
    if (!index) {
        history.innerHTML = '';
        api.removePrefs({
            key: 'historys'
        });
        api.toast({
            msg: '已清空所有历史记录'
        });
    } else {
        api.getPrefs({
            key: 'historys'
        }, function (ret, err) {
            var historyText = ret.value;
            var historyArray = historyText.split(',');
            historyArray.splice(index, 1);
            api.setPrefs({
                key: 'historys',
                value: historyArray.join(',')
            });
            api.toast({
                msg: '已清除历史记录'
            });
        });
    }
}

function AppendHistory(text) {
    var history = $api.byId('history');
    var index = history.children.length;
    var li = '<li class="history" data-index="' + index + '">' + text + '<img src="../image/x.png" alt="" style="float: right;"></li>';
    history.appendHTML(li);
}

document.addEventListener('click', function (e) {
    var target = e.target;
    var targetClassName = target.className && target.className.trim().toLowerCase() || null;
    if (targetClassName == 'history') {
        api.openWin({
            name: 'result',
            url: '../html/result1.html',
            delay: 500,
            pageParam: {
                text: target.innerText,
                addHistory: true
            }
        });

    }
}, false);
