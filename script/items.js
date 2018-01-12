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
	isLoading = true;
	api.ajax({
		url : url,
		dataType : 'text',
		tag : name
	}, function(ret, err) {
		var body = $api.byId('body');
		var loading = $api.byId('loading');
		var html, htmlData;
		if (ret) {
			var data = ParseHTML(name, ret);
			//迅雷是否安装
			api.appInstalled({
				appBundle : appsMap.app_thunder.appBundle
			}, function(ret, err) {
				htmlData = {
					items : data,
					page : page,
					error : false,
					app_thunder : ret.installed
				};
				//115是否安装
				api.appInstalled({
					appBundle : appsMap.app_115.appBundle
				}, function(ret, err) {
					htmlData['app_115'] = ret.installed;
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
				});
			});
		} else {
			htmlData = {
				items : [],
				error : true
			};
			html = template('items', htmlData);
			page == 1 && (body.innerHTML = html);
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
	var encodeWords = '';
	if (name == 'Btsearchs' || name == 'Cili360')
		encodeWords = str2hex(utf16to8(words));
	else
		encodeWords = encodeURIComponent(words);
	return encodeWords;
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
	} else if (targetClassName == 'down' || targetClassName == 'iconfont icon-download') {
		//用浏览器下载种子文件
		api.openApp({
			androidPkg : 'android.intent.action.VIEW',
			mimeType : 'text/html',
			uri : target.getAttribute('data-torrent')
		});
	} else if (targetClassName == 'iconfont icon-thunder installed') {
		//用迅雷下载
		api.openApp({
			androidPkg : appsMap.app_thunder.androidPkg,
			uri : appsMap.app_thunder.uri.replace(/\{url\}/i, target.getAttribute('data-url'))
		});
	} else if (targetClassName == 'iconfont icon-thunder') {
		api.toast({
			msg : '尚未安装手机迅雷'
		});
	} else if (targetClassName == 'open-115' || targetClassName == 'iconfont icon-115 installed') {
		//115网盘下载
		api.openApp({
			androidPkg : appsMap.app_115.androidPkg,
			uri : appsMap.app_115.uri.replace(/\{url\}/i, target.getAttribute('data-url'))
		});
	} else if (targetClassName == 'open-115' || targetClassName == 'iconfont icon-115') {
		api.toast({
			msg : '尚未安装115网盘'
		});
	}
	e.stopPropagation();
}, false);
