/**
 * Created by Administrator on 2015/11/10.
 */
apiready = function () {
    var header = $api.byId('header');
    //适配iOS 7+和Android 4.4+沉浸式状态栏
    $api.fixStatusBar(header);
    var headerPos = $api.offset(header);
    var back = $api.byId('back');
    var navbar = $api.byId('navbar');
    var navbarPos = $api.offset(navbar);
    var title = api.pageParam.text;
    var root = api.pageParam.fromRoot;
    var flag = api.pageParam.addHistory;

    $api.byId('title').innerText = title;
    $api.addEvt(back, 'click', BackSearchWindow);

    !root && !flag && api.execScript({
        name: 'search',
        frameName: 'history',
        //script: 'AppendHistory("' + title + '");'
    });

    InitNavbar();
    InitFrameGroup(headerPos.h, title);
};

var iscroll;

function InitNavbar() {
  // var scrollerWidth = 0;
  var navbarheight = 0;
  var navbar = $api.byId('navbar');
    var engines = $api.byId('engines');
    var scroller = $api.byId('scroller');
    var engine = '<li data-engineName="{engineName}" data-engineUrl="{engineUrl}"></li>';
    for (var engineName in enginesMap) {
        var engineUrl = enginesMap[engineName];
        var tempEngine = engine.replace(/\{engineName\}/g, engineName);
        tempEngine = tempEngine.replace(/\{engineUrl\}/g, engineUrl);
        engines.appendHTML(tempEngine);
        //一行一个
        navbarheight += 0;
        //一行三个
        // scrollerWidth += 120;
        //一行两个
        // scrollerWidth += 180;
    }
    // navbar.style.height = scrollerWidth + 'px';
    navbar.style.height = navbarheight + 'px';
    iscroll = new IScroll('#wrapper', {scrollX: false, scrollY: false, mouseWheel: false, click: true});

    $api.addEvt(scroller, 'click', function (e) {
        var target = e.target;
        SetFrameActive(ElementIndex(target));
    });
}

function InitFrameGroup(y, searchText) {
    var engines = $api.byId('engines');
    var frames = [];
    engines = $api.domAll(engines, 'li');
    for (var i = 0; i < engines.length; i++) {
        var engine = engines[i];
        var engineName = engine.getAttribute('data-engineName');
        var frame = {
            name: engineName,
            url: '../html/items.html',
            pageParam: {
                index: i,
                pageNumber: 1,
                engineName: engineName,
                searchText: searchText
            },
            bounces: false
        };
        frames.push(frame);

    }
    api.openFrameGroup({
        name: 'items',
        preload: 4,
        rect: {
            x: 0,
            y: y
        },
        frames: frames
    }, function (ret, err) {
        //alert(JSON.stringify(ret));
        SetEngineActive(ret.index);
    });
}

function SetEngineLoaded(index) {
  //alert(index);
    var engines = $api.byId('engines');
    var enginesList = $api.domAll(engines, 'li');
    var target = enginesList[index];
    //alert(target);
    $api.removeCls(target, 'loaded');
    $api.addCls(target, 'loaded');
}

function SetEngineActive(index) {
    var engines = $api.byId('engines');
    var enginesList = $api.domAll(engines, 'li');
    var target = enginesList[index];
    $api.removeCls($api.dom(engines, '.active'), 'active');
    $api.removeCls(target, 'active');
    $api.addCls(target, 'active');
    iscroll.scrollToElement(target, 300, true);
}
function SetFrameActive(index) {
    api.setFrameGroupIndex({
        name: 'items',
        index: index,
        scroll: true
    });
    SetEngineActive(index);
}
function BackSearchWindow() {
  api.closeWin();
}

/**
 * 取元素在其父级元素中的索引
 * @param element 元素
 * @return {number} 索引值
 */
function ElementIndex(element) {
    !arguments[1] && (this.index = 0);
    var prev = element.previousElementSibling;
    if (prev) {
        this.index += 1;
        ElementIndex(prev, true);
    }
    return this.index;
}

document.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, false);
