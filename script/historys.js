/**
 * Created by Administrator on 2015/11/10.
 */
apiready = function () {
    var clear = $api.byId('clear');
    var history = $api.byId('history');
    $api.addEvt(clear, 'click', function () {
        ClearHistory();
    });
    InitHistory();
    api.parseTapmode();
};

function InitHistory() {

    var history = $api.byId('history');
    api.getPrefs({
        key: 'historys'
    }, function (ret, err) {
      //alert(JSON.stringify(ret));
        var historyText = ret.value || '';
        var historyArray = historyText.split(',');
        var li = '<li class="history" data-index="{index}">{text}<img class="historyImg" src="../image/x.png" alt="" style="float: right;"  ></li>';

        for (var i = 0; i < historyArray.length; i++) {
            if (historyArray[i].length == 0)
                continue;
            var tempLi = li.replace(/\{index\}/g, i);
            tempLi = tempLi.replace(/\{text\}/g, decodeURIComponent(historyArray[i]));
            history.appendHTML(tempLi);
            fnnone();
        }

    });
}
function fnnone() {
  var ul = document.getElementById('history');
  var ul_lis = ul.getElementsByClassName('historyImg');
  var ul_lisdiv = ul.getElementsByClassName('history')
  var j;
  for (var i = 0; i < ul_lis.length; i++) {
      ul_lis[i].index = i;
      ul_lis[i].onclick = function() {
          j = this.index;
          $api.addCls(ul_lisdiv[j], 'active');
          var b = j + 1;
            ClearHistory(b);

      }
  }
}
function ClearHistory(index) {
    alert(index);
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
            // history.innerHTML = '';
            // InitHistory();
            api.toast({
                msg: '已清除历史记录'
            });
        });
    }
}

function AppendHistory(text) {
    var history = $api.byId('history');
    var a = history.children.length;
    var index = a;
    var li = '<li class="history" data-index="' + index + '">' + text + '<img  class="historyImg" src="../image/x.png" alt="" style="float: right;" ></li>';
    history.appendHTML(li);
    fnnone(index);
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
