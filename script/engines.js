/**
 * Created by Administrator on 2015/11/10.
 */

/**
 * 搜索引擎映射
 */
var enginesMap = {
	Breadsearch : 'http://www.breadsearch.com/search/{words}/{page}',
	Btbook : 'http://www.btbook.net/search/{words}/{page}-1.html',
	Btcat : 'http://www.btcat.org/search/{words}_ctime_{page}.html',
	Btdao : 'http://www.btdao.net/list/{words}-s1d-{page}.html',
	Btdb : 'http://btdb.in/q/{words}/{page}',
	Btsoso : 'http://www.btsoso.com/search/{words}_ctime_{page}.html',
	Btup : 'http://api.xhub.cn/api.php?op=search_list&key={words}&page={page}',
	Cili360 : 'http://www.cili360.com/list/b/{words}/{page}', //关键词需要特殊转码
	Zhongzi : 'http://www.zhongzi.in/s/{words}/{page}'
};

/**
 * 应用协议映射
 */
var appsMap = {
	app_115 : {
		appBundle : 'com.ylmf.androidclient',
		androidPkg : 'android.intent.action.VIEW',
		uri : 'oof.disk://lx/{url}'
	},
	app_thunder : {
		appBundle : 'com.xunlei.downloadprovider',
		androidPkg : 'android.intent.action.VIEW',
		uri : '{url}'
	}
};
