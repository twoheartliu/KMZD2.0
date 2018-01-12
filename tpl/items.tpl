<!-- item -->
{{if error}}
	<div id="loading" class="loaded">
	    <div class="rect1"></div>
	    <div class="rect2"></div>
	    <div class="rect3"></div>
	    <div class="rect4"></div>
	    <div class="rect5"></div>
	</div>
    <div class="empty">
       	 网络或搜索引擎故障
    </div>
{{else if items.length==0}}
	<div id="loading" class="loaded">
	    <div class="rect1"></div>
	    <div class="rect2"></div>
	    <div class="rect3"></div>
	    <div class="rect4"></div>
	    <div class="rect5"></div>
	</div>
	<div class="empty">
       	 没有找到相关内容
    </div>
{{else}}
	{{if page==1}}
		<div id="loading" class="loaded">
		    <div class="rect1"></div>
		    <div class="rect2"></div>
		    <div class="rect3"></div>
		    <div class="rect4"></div>
		    <div class="rect5"></div>
		</div>
	{{/if}}
    {{each items as item}}
        <div class="item">
            <div class="title">{{item.title}}</div>
            <div class="info">
                {{if item.count}}
                    <div class="fileNumber">文件数:{{item.count}}</div>
                {{/if}}
                {{if item.size}}
                    <div class="fileSize">文件大小:{{item.size}}</div>
                {{/if}}
            </div>
            <div class="opera">
                <div class="copy" data-magnet="{{item.magnet}}">
                    <span class="iconfont icon-copy" data-magnet="{{item.magnet}}"></span>复制链接
                </div>
                {{if item.torrent}}
                    <div class="down" data-torrent="{{item.torrent}}">
                        <span class="iconfont icon-download" data-torrent="{{item.torrent}}"></span>下载种子
                    </div>
                {{/if}}
            </div>
            <div class="open">
                <div class="open-thunder" data-url="{{item.url_thunder}}">
                    {{if app_thunder}}
                        <span class="iconfont icon-thunder installed" data-url="{{item.url_thunder}}"></span>
                    {{else}}
                        <span class="iconfont icon-thunder" data-url="{{item.url_thunder}}"></span>
                    {{/if}}
                </div>
                <div class="open-115" data-url="{{item.url_115}}">
                    {{if app_115}}
                        <span class="iconfont icon-115 installed" data-url="{{item.url_115}}"></span>
                    {{else}}
                        <span class="iconfont icon-115" data-url="{{item.url_115}}"></span>
                    {{/if}}
                </div>
            </div>
        </div>
    {{/each}}
{{/if}}
