/**
 * Created by Administrator on 2015/11/10.
 */
var pageNumber, isLoading;

apiready = function() {
	var pageParam = api.pageParam;
	var index = pageParam.index;
	var engineName = pageParam.engineName;
	var engineUrl = enginesMap[engineName];
	var searchText = pageParam.searchText;
	pageNumber = pageParam.pageNumber;
	api.addEventListener({
		name : 'scrolltobottom'
	}, function(ret, err) {
		!isLoading && GetData(searchText, ++pageNumber, index, engineName, engineUrl);
	});

	api.setRefreshHeaderInfo({
		visible : true,
		bgColor : '#ccc',
		textColor : '#fff',
		textDown : '下拉刷新',
		textUp : '松开刷新',
		showTime : true
	}, function(ret, err) {

		var loading = $api.byId('loading');
		pageNumber = 1;
		$api.removeCls(loading, 'loaded');
		isLoading && api.cancelAjax({
			tag : engineName
		});
		GetData(searchText, pageNumber, index, engineName, engineUrl, function() {
			api.refreshHeaderLoadDone();
			api.toast({
				msg : '数据刷新完成'
			});
		});
	});

	GetData(searchText, pageNumber, index, engineName, engineUrl);
};

// 初始化事件监听
function initEventListenner() {
		initEventListenner();
		//监听关闭音频
		api.addEventListener({
				name: 'netbofang'
		}, function(ret, err) {
				if (ret) {
					bofang = JSON.stringify(ret);
					//alert(ret);
						// netAudiopause(ret)
				}
		});
		fnOpenPlayFrame(bofang);
}

/**
 *
 * @param words 关键词
 * @param page 页码
 * @param index frame的index
 * @param name 引擎名
 * @param url 引擎地址
 * @param complete 加载完成后执行
 */
function GetData(words, page, index, name, url, complete) {
	var wordsReg = /\{words\}/;
	var pageReg = /\{page\}/;
	words = EncodeWords(name, words);
	url = url.replace(wordsReg, words);
	url = url.replace(pageReg, page);
	//console.log(JSON.stringify(url));
	//url = 'http://47.100.11.38/kongmeng/thirdParty/search_playlist_by_name.php?page=1&size=20&search=三字经';
	//url = 'http://47.100.11.38/kongmeng/thirdParty/search_songs_by_name.php?page=0&size=10&search=三字经';
	//console.log(JSON.stringify(url));
	isLoading = true;
	api.ajax({
		url : url,
		dataType : 'text',
		method : 'post',
		tag : name
	}, function(ret, err) {
		var body = $api.byId('body');
		var loading = $api.byId('loading');
		if (ret) {
			var data = ParseHTML(name, ret);
			htmlData = {
				items : data,
				page : page,
				error : false,
			};
			html = template('items', htmlData);
			page == 1 && (body.innerHTML = html);
			page == 1 && api.execScript({
				name : 'result',
				script : 'SetEngineLoaded(' + index + ');'
			});
			page != 1 && data.length != 0 && body.appendHTML(html);
			page != 1 && data.length != 0 && api.toast({
				msg : '第' + page + '页加载完成'
			});
			page != 1 && data.length == 0 && api.toast({
				msg : '已无更多数据'
			});
			page != 1 && data.length == 0 && pageNumber--;
			$api.addCls(loading, 'loaded');
			isLoading = false;
			complete && complete();

		} else {
			page == 1 && api.execScript({
				name : 'result',
				script : 'SetEngineLoaded(' + index + ');'
			});
			page != 1 && api.toast({
				msg : '网络或搜索引擎故障'
			});
			page != 1 && pageNumber--;
			$api.addCls(loading, 'loaded');
			isLoading = false;
			complete && complete();
		}
	});
}

/**
 * @returns {string} 文字编码
 */
function EncodeWords(name, words) {
	var encodeWords = words;
	// var encodeWords = '';
	// if (name == '智能搜索' || name == '歌曲')
	// 	encodeWords = encodeURIComponent(words);
	// else
	// 	encodeWords = encodeURIComponent(words);
	return encodeWords;
}
function setSousuoList(a,b){
	if(a != undefined){

		api.addEventListener({
				name: 'netbofang'
		}, function(ret, err) {
				if (ret) {
					bofang = JSON.stringify(ret.value);
					//alert(bofang);
						// netAudiopause(ret)
				}
		});
		var a = a;
		api.openWin({
			name: 'play',
			url: '../html/playsousuo.html',
			pageParam: {
				a : a
			},
			delay: 200
		});
	}else if(b != undefined){
		//alert(b);
		var b = b;
		api.openWin({
			name: 'sousuomusiclist',
			url: '../html/first_frame/sousuomusiclist.html',
			pageParam: {
				b : b
			},
			delay: 200
		});
	}
}
document.addEventListener('click', function(e) {
	var target = e.target;
	var targetClassName = target.className && target.className.trim().toLowerCase() || null;
	var clipBoard = api.require('clipBoard');
	if (targetClassName == 'copy' || targetClassName == 'iconfont icon-copy') {
		//复制磁力链接到剪贴板
		clipBoard.set({
			value : target.getAttribute('data-magnet')
		}, function(ret, err) {
			ret.status && api.toast({
				msg : '磁力链接已经复制到剪贴板'
			});
		});
	}
	e.stopPropagation();
}, false);
