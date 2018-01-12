/**
 * Created by Administrator on 2015/11/10.
 */
apiready = function () {

};

function AddHistory(words, fromRoot) {
    api.getPrefs({
        key: 'history'
    }, function (ret, err) {
        var flag = false;//历史记录是否存在
        var historyText = ret.value || '';
        var historyArray = historyText.split(',');
        for (var i = 0; i < historyArray.length; i++) {
            decodeURIComponent(historyArray[i]) == words && (flag = true);
        }
        !flag && historyArray.push(encodeURIComponent(words));
        !flag && api.setPrefs({
            key: 'history',
            value: historyArray.join(',')
        });
        api.openWin({
            name: 'result',
            url: '../html/result.html',
            delay: 500,
            pageParam: {
                text: words,
                fromRoot: fromRoot || false,
                addHistory: flag
            }
        });
    });
}


document.addEventListener('click', function (e) {
    var target = e.target;
    var targetClassName = target.className && target.className.trim().toLowerCase() || null;
    if (targetClassName == 'words') {
        AddHistory(target.innerText.trim(), true);
    }
}, false);