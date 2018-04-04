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

};

function InitHistory() {
    var history = $api.byId('history');
    api.getPrefs({
        key: 'history1'
    }, function (ret, err) {
        var historyText = '' || ret.value  ;
        var historyArray = historyText.split(',');
        //alert(JSON.stringify(historyArray));
        var li = '<li class="history " id="historysss{index}" data-index="{index}">{text}<img class="historyImg" src="../image/x.png" alt="" style="float: right;padding-top:5px;" onclick="ClearHistory({index})" ></li>';
        for (var i = 0; i < historyArray.length; i++) {
            if (historyArray[i].length == 0)
                continue;
            var tempLi = li.replace(/\{index\}/g, i);
            tempLi = tempLi.replace(/\{text\}/g, decodeURIComponent(historyArray[i]));
            history.appendHTML(tempLi);

        }

    });
}
// function fnnone(e) {
//   var ul = document.getElementById('history');
//   var ul_lis = ul.getElementsByClassName('historyImg');
//   var ul_lisdiv = ul.getElementsByClassName('history')
//   var s = e - 1;
//           $api.addCls(ul_lisdiv[s], 'active');
//var text = ul_lisdiv[j].innerHTML;
//
// }
// function fnnone() {
//   var ul = document.getElementById('history');
//   var ul_lis = ul.getElementsByClassName('historyImg');
//   var ul_lisdiv = ul.getElementsByClassName('history');
//   for (var i = 0; i < ul_lis.length; i++) {
//       ul_lis[i].index = i;
//       ul_lis[i].onclick = function() {
//           var j = this.index;
//           // $api.addCls(ul_lisdiv[j], 'active');
//             var text = ul_lisdiv[j];
//             var parent=document.getElementById("history");
//             //var child=document.getElementById("p1");
//             parent.removeChild(text);
//           // alert(j);
//       }
//   }
// }

function ClearHistory(index) {
  //alert(index);
  //var e = index;
      alert(index);
    var history1 = $api.byId('history');
    if (!index) {

        history1.innerHTML = '';
        api.removePrefs({
            key: 'history1'
        });
        api.toast({
            msg: '已清空所有历史记录'
        });
    }else{
      api.getPrefs({
          key: 'history1'
      }, function (ret, err) {
          var historyText1 = ret.value;
          var historyArray1 = historyText1.split(',');
          historyArray1.splice(index, 1);
          api.setPrefs({
              key: 'history1',
              value: historyArray1.join(',')
          });
          //fnnone();
           var parent=document.getElementById("history");
           var child=document.getElementById("historysss" + index);
           parent.removeChild(child);
          // api.historyBack({
          //     frameName: ''
          // }, function(ret, err) {
          //   alert(JSON.stringify(ret));
          //     if (!ret.status) {
          //         api.closeWin();
          //     }
          // });
          // history.innerHTML = '';
          // InitHistory();
          //window.location.reload();
          //setTimeout("location.reload()", 500);
          api.toast({
              msg: '已清除历史记录'
          });
      });
    }
}

function AppendHistory(text) {

    var histor = $api.byId('history');
    // history.innerHTML = '';
    // InitHistory()
    var index = 1;
    //alert(index);
    //var a = index + 1;
    var li = '<li class="history" data-index="1">' + text + '<img  class="historyImg" src="../image/x.png" alt="" style="float: right;" onclick="ClearHistory(' + index + ')"></li>';
        //li = '<li class="history" data-index="{index}">{text}<img class="historyImg" src="../image/x.png" alt="" style="float: right;" onclick="ClearHistory({index})" ></li>';
    // var tempLi = li.replace(0, 0);
    // tempLi = tempLi.replace(text, decodeURIComponent(0);
    // alert(tempLi);
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
