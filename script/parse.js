/**
 * Created by Administrator on 2015/11/10.
 */

function ParseHTML(engineName, engineHTML) {
	var data;
	var bodyReg = /<body[\s\S.]*>([\s\S.]*)<\/body>/ig;
	var bodyHtml = engineHTML && engineHTML.replace(/\n\b\r/gm, '') || '';
	var div = document.createElement('div');
	bodyHtml = bodyHtml.match(bodyReg);
	bodyHtml = bodyHtml && bodyHtml[0] || '';
	div.innerHTML = bodyHtml;
	try {
		switch (engineName) {
			case 'Btup':
				data = Btup(engineHTML);
				break;
			case 'Btdao':
				data = Btdao(div);
				break;
			case 'Cili360':
				data = Cili360(div);
				break;
			case 'Btdb':
				data = Btdb(div);
				break;
			case 'Zhongzi':
				data = Zhongzi(div);
				break;
			case 'Breadsearch':
				data = Breadsearch(div);
				break;
			case 'Btbook':
				data = Btbook(div);
				break;
			case 'Btsoso':
				data = Btsoso(div);
				break;
			case 'Btcat':
				data = Btcat(div);
				break;
		}
	} catch (e) {
		data = [];
	}

	return data;
}

/**
 * @return {string} 磁力链接转种子地址
 */
function ConvertToTorrentUrl(magnetUrl) {
	var url = 'http://123.151.31.143/{part1}/{part2}/{part3}.torrent';
	var magnet = magnetUrl.replace(/magnet:\?xt=urn:btih:/, '').toUpperCase();
	var part1 = magnet.substring(0, 2);
	var part2 = magnet.substring(magnet.length - 2);
	url = url.replace(/\{part1\}/, part1);
	url = url.replace(/\{part2\}/, part2);
	url = url.replace(/\{part3\}/, magnet);
	return url;
}

/**
 * @return {string} 磁力链接转迅雷地址
 */
function ConvertToThunderUrl(magnetUrl) {
	var thunderPrefix = "AA";
	var thunderPosix = "ZZ";
	var thunderTitle = "thunder://";
	return thunderTitle + encode64(strUnicode2Ansi(thunderPrefix + magnetUrl + thunderPosix));
}

function Btup(jsonString) {
	var data = [];
	var json = JSON.parse(jsonString);
	json = json['data'];
	for (var hash in json) {
		var item = json[hash];
		var title = eval('"' + item['title'] + '"');
		var size = item['size'];
		var magnet = 'magnet:?xt=urn:btih:' + hash;

		data.push({
			title : title,
			size : size,
			count : null,
			magnet : magnet,
			torrent : ConvertToTorrentUrl(magnet),
			url_115 : magnet,
			url_thunder : ConvertToThunderUrl(magnet)
		});
	}
	return data;
}

function Btdao(div) {
	var data = [];
	var mlists = div.getElementsByClassName('mlist')[0].children;
	for (var i = 0; i < mlists.length; i++) {
		var mlist = mlists[i];
		var title = mlist.getElementsByClassName('T1')[0].innerText.trim();
		var infos = mlist.getElementsByClassName('BotInfo')[0].getElementsByTagName('dt')[0].getElementsByTagName('span');
		var size = infos[0].innerText.trim();
		var count = infos[1].innerText.trim();
		var magnet = (mlist.getElementsByClassName('T1')[0].getElementsByTagName('a')[0].pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1];
		magnet = 'magnet:?xt=urn:btih:' + magnet;
		data.push({
			title : title,
			size : size,
			count : count,
			magnet : magnet,
			torrent : ConvertToTorrentUrl(magnet),
			url_115 : magnet,
			url_thunder : ConvertToThunderUrl(magnet)
		});
	}
	return data;
}

function Cili360(div) {
	var data = [];
	var tempDiv = document.createElement('div');
	var mlists = div.getElementsByClassName('mlist')[0].getElementsByTagName('li');
	for (var i = 0; i < mlists.length; i++) {
		var mlist = mlists[i];
		var title = mlist.getElementsByClassName('T1')[0].innerText.trim();
		var size = mlist.getElementsByClassName('BotInfo')[0].getElementsByTagName('span')[0].innerText.trim();
		var count = mlist.getElementsByClassName('BotInfo')[0].getElementsByTagName('span')[1].innerText.trim();
		var magnet = mlist.getElementsByClassName('dInfo')[0].getElementsByTagName('a')[0].href;
		title = hex2str(title);
		tempDiv.innerHTML = title;
		title = tempDiv.innerText;
		tempDiv.innerHTML = '';
		data.push({
			title : title,
			size : size,
			count : count,
			magnet : magnet,
			torrent : ConvertToTorrentUrl(magnet),
			url_115 : magnet,
			url_thunder : ConvertToThunderUrl(magnet)
		});
	}
	return data;
}

function Btdb(div) {
	var data = [];
	var search_ret_items = div.getElementsByClassName('search-ret-item');
	for (var i = 0; i < search_ret_items.length; i++) {
		var search_ret_item = search_ret_items[i];
		var title = search_ret_item.getElementsByClassName('item-title')[0].innerText.trim();
		var size = search_ret_item.getElementsByClassName('item-meta-info-value')[0].innerText.trim();
		var count = search_ret_item.getElementsByClassName('item-meta-info-value')[1].innerText.trim();
		var magnet = search_ret_item.getElementsByClassName('magnet')[0].href;
		data.push({
			title : title,
			size : size,
			count : count,
			magnet : magnet,
			torrent : ConvertToTorrentUrl(magnet),
			url_115 : magnet,
			url_thunder : ConvertToThunderUrl(magnet)
		});
	}
	return data;
}

function Zhongzi(div) {
	var data = [];
	var lis = div.getElementsByClassName('list-unstyled')[0].children;
	for (var i = 0; i < lis.length; i++) {
		var li = lis[i];
		var title = li.getElementsByTagName('h3')[0].innerText.trim();
		var size = li.getElementsByClassName('j_size')[0].innerText.trim();
		var magnet = li.getElementsByTagName('a')[1].href;
		data.push({
			title : title,
			size : size,
			count : null,
			magnet : magnet,
			torrent : ConvertToTorrentUrl(magnet),
			url_115 : magnet,
			url_thunder : ConvertToThunderUrl(magnet)
		});
	}
	return data;
}

function Breadsearch(div) {
	var data = [];
	var search_items = div.getElementsByClassName('search-item');
	for (var i = 0; i < search_items.length; i++) {
		var search_item = search_items[i];
		var title = search_item.getElementsByClassName('list-title')[0].innerText.trim();
		var size = search_item.getElementsByClassName('list-value')[1].innerText.trim();
		var count = search_item.getElementsByClassName('list-value')[2].innerText.trim();
		var magnet = search_item.getElementsByTagName('a')[1].href;
		data.push({
			title : title,
			size : size,
			count : count,
			magnet : magnet,
			torrent : ConvertToTorrentUrl(magnet),
			url_115 : magnet,
			url_thunder : ConvertToThunderUrl(magnet)
		});
	}
	return data;
}

function Btbook(div) {
	var data = [];
	var search_items = div.getElementsByClassName('search-item');
	for (var i = 0; i < search_items.length; i++) {
		var search_item = search_items[i];
		var title = search_item.getElementsByClassName('item-title')[0].innerText.trim();
		var magnet = search_item.getElementsByClassName('download')[0].href;
		data.push({
			title : title,
			size : null,
			count : null,
			magnet : magnet,
			torrent : ConvertToTorrentUrl(magnet),
			url_115 : magnet,
			url_thunder : ConvertToThunderUrl(magnet)
		});
	}
	return data;
}

function Btsoso(div) {
	var data = [];
	var medias = div.getElementsByClassName('media');
	for (var i = 0; i < medias.length; i++) {
		var media = medias[i];
		var title = media.getElementsByClassName('title')[0].innerText.trim();
		var size = media.getElementsByClassName('label label-warning')[0].innerText.trim();
		var magnet = (media.getElementsByClassName('title')[0].pathname.match(/\/([^\/?#]+).html$/i) || [, ''])[1];
		magnet = 'magnet:?xt=urn:btih:' + magnet;
		data.push({
			title : title,
			size : size,
			count : null,
			magnet : magnet,
			torrent : ConvertToTorrentUrl(magnet),
			url_115 : magnet,
			url_thunder : ConvertToThunderUrl(magnet)
		});
	}
	return data;
}

function Btcat(div) {
	var data = [];
	var list_cons = div.getElementsByClassName('list-con')[0].children;
	for (var i = 1; i < list_cons.length; i++) {
		var list_con = list_cons[i];
		var title = list_con.getElementsByTagName('a')[0].innerText.trim();
		var size = list_con.getElementsByClassName('option')[0].getElementsByTagName('b')[1].innerText.trim();
		var count = list_con.getElementsByClassName('option')[0].getElementsByTagName('b')[2].innerText.trim();
		var magnet = (list_con.getElementsByTagName('a')[0].pathname.match(/\/([^\/?#]+).html$/i) || [, ''])[1];
		magnet = 'magnet:?xt=urn:btih:' + magnet;
		data.push({
			title : title,
			size : size,
			count : count,
			magnet : magnet,
			torrent : ConvertToTorrentUrl(magnet),
			url_115 : magnet,
			url_thunder : ConvertToThunderUrl(magnet)
		});
	}
	return data;
}