alert('111');
<!-- item -->

{{if error}}
	<div id="loading" class="loaded">
		alert('111');
	    <div class="rect1"></div>
	    <div class="rect2"></div>
	    <div class="rect3"></div>
	</div>
    <div class="empty">
       	 网络或搜索引擎故障
    </div>
{{else if items.length==0}}
	<div id="loading" class="loaded">
	    <div class="rect1"></div>
	    <div class="rect2"></div>
	    <div class="rect3"></div>

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
		</div>
	{{/if}}
    {{each items as item}}
        <div class="item">
            <div class="title">{{item.name}}</div>
            <div class="info">
                {{if item.title}}
                    <div class="fileNumber">文件数:{{item.title}}</div>
                {{/if}}
                {{if item.name}}
                    <div class="fileSize">文件大小:{{item.name}}</div>
                {{/if}}
            </div>
    {{/each}}
{{/if}}
