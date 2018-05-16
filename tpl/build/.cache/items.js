alert('333');
/*TMODJS:{"version":19,"md5":"fb61ac7dea700c82cbbf2e2056d94dc4"}*/
template('items',function($data,$filename
/**/) {
'use strict';var $utils=this,$helpers=$utils.$helpers,error=$data.error,items=$data.items,page=$data.page,$each=$utils.$each,item=$data.item,$index=$data.$index,$escape=$utils.$escape,app_thunder=$data.app_thunder,app_115=$data.app_115,$out='';$out+=' ';
if(error){
$out+=' <div id="loading" class="loaded"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div> <div class="empty"> 网络或搜索引擎故障 </div> ';
}else if(items.length==0){
$out+=' <div id="loading" class="loaded"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div> <div class="empty"> 没有找到相关内容 </div> ';
}else{
$out+=' ';
if(page==1){
$out+=' <div id="loading" class="loaded"> <div class="rect1"></div> <div class="rect2"></div> <div class="rect3"></div> <div class="rect4"></div> <div class="rect5"></div> </div> ';
}
$out+=' ';
$each(items,function(item,$index){
$out+=' <div class="item"> <div class="title">';
$out+=$escape(item.title);
$out+='</div> <div class="info"> ';
if(item.count){
$out+=' <div class="fileNumber">文件数:';
$out+=$escape(item.count);
$out+='</div> ';
}
$out+=' ';
if(item.size){
$out+=' <div class="fileSize">文件大小:';
$out+=$escape(item.size);
$out+='</div> ';
}
$out+=' </div> <div class="opera"> <div class="copy" data-magnet="';
$out+=$escape(item.magnet);
$out+='"> <span class="iconfont icon-copy" data-magnet="';
$out+=$escape(item.magnet);
$out+='"></span>复制链接 </div> ';
if(item.torrent){
$out+=' <div class="down" data-torrent="';
$out+=$escape(item.torrent);
$out+='"> <span class="iconfont icon-download" data-torrent="';
$out+=$escape(item.torrent);
$out+='"></span>下载种子 </div> ';
}
$out+=' </div> <div class="open"> <div class="open-thunder" data-url="';
$out+=$escape(item.url_thunder);
$out+='"> ';
if(app_thunder){
$out+=' <span class="iconfont icon-thunder installed" data-url="';
$out+=$escape(item.url_thunder);
$out+='"></span> ';
}else{
$out+=' <span class="iconfont icon-thunder" data-url="';
$out+=$escape(item.url_thunder);
$out+='"></span> ';
}
$out+=' </div> <div class="open-115" data-url="';
$out+=$escape(item.url_115);
$out+='"> ';
if(app_115){
$out+=' <span class="iconfont icon-115 installed" data-url="';
$out+=$escape(item.url_115);
$out+='"></span> ';
}else{
$out+=' <span class="iconfont icon-115" data-url="';
$out+=$escape(item.url_115);
$out+='"></span> ';
}
$out+=' </div> </div> </div> ';
});
$out+=' ';
}
return new String($out);
});
