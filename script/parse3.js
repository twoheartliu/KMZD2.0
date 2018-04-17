/**
 * Created by Administrator on 2015/11/10.
 */

function ParseHTML(engineName, engineHTML) {
	var data;
	var bodyReg = /<body[\s\S.]*>([\s\S.]*)<\/body>/ig;
	var bodyHtml = engineHTML && engineHTML.replace(/\n\b\r/gm, '') || '';
	var div = document.createElement('div');
	bodyHtml = bodyHtml.match(bodyReg);
	bodyHtml = bodyHtml && bodyHtml.data[0] || '';
	//bodyHtml = bodyHtml && bodyHtml[0] || '';
	div.innerHTML = bodyHtml;
	try {
		switch (engineName) {
			// case '智能搜索':
			// 	data = Zhinengsousuo(engineHTML);
			// 	break;
			case '歌曲':
				data = Gequ(engineHTML);
				break;
			case '歌单':
				data = Gedan(engineHTML);
				break;
		}
	} catch (e) {
		data = [];
	}

	return data;
}

// function Zhinengsousuo(jsonString) {
// 	var data = [];
// 	//alert(data);
// 	var json = JSON.parse(jsonString);
// 	json = json.data;
// 	//alert(JSON.stringify(json));
// 	for (var hash in json) {
// 		var item = json[hash];
// 		var title = eval('"' + item['title'] + '"');
// 		var url = item['url'];
// 		var body = item['body'];
// 		var id = item['id'];
// 		data.push({
// 			name : name,
// 			title : title,
// 			url : url,
// 			body : body,
// 			id : id,
// 		});
// 	}
// 	//alert(data);
// 	return data;
// }

function Gequ(jsonString) {
	var data = [];
	var json = JSON.parse(jsonString);
	json = json.data;
	for (var hash in json) {
		var item = json[hash];
		var name = eval('"' + item['name'] + '"');
		var url = item['url'];
		var createDate = item['createDate'];
		var singerName = item['singerName'];
		var size = item['size'];
		var singerId = item['singerId'];
		var id = item['id'];
		data.push({
			title : name,
			createDate : createDate,
			url : url,
			name : singerName,
			size : size,
			body : singerId,
			id : id,
		});
	}
	//console.log(JSON.stringify(data));
	return data;
}
function Gedan(jsonString) {
	var data = [];
	var json = JSON.parse(jsonString);
	json = json.data;
	//console.log(JSON.stringify(json));
		for (var hash in json) {
			var item = json[hash];
			var name = eval('"' + item['name'] + '"');
			var songCounts = item['songCounts'];
			var singerName = item['singerName'];
			var id = item['id'];
			data.push({
				title : name,
				songCounts : songCounts,
				name : singerName,
			});
		}
		//console.log(JSON.stringify(data));
	return data;
}
