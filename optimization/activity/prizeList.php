<?php
	$pageTitle = "我的奖品"; // 页面标题
	include "config.php";
	include PRO_PART.'header_v1.php'; //公共头部文件v1
    header('Location: https://b.jianbing.com/act/home/optimization/activity/ActCenter.php?defaultmenu=1');
    exit;
 ?>

<body style="background-color: #eee;">
	<div class="prize-list-wrap">

	</div>
	<script>
		function moduleLoad(page){
		    module.getJs_Css("prize-conf.js/script/v1",function(page){
		    	page.renderPrizeList();
		    });
		}
	</script>
	<script type="text/template" id="tpl-prize-list">
		<ul class="prize-list">
			{@each ret as item}
		        <li class="list-item">
		            <a href="${item.url}">
		                <div class="pic">
		                    <img src="${item.thumb}" />
		                </div>
		                <div class="info-box">
		                    <span class="arrow"></span>
		                    <div class="info">
		                        <h4>${item.title}</h4>
		                        <div class="btn-box">
		                            <span class="btn">${item.activity}</span>
		                        </div>
		                    </div>
		                </div>
		            </a>
		            <div class="info-state
						{@if item.state === 0}
						state-green
						{@else if item.state === 1}
						state-red
						{@else if item.state === 2}
						state-orange
						{@/if}
		            ">
		            	${item.status}
		            </div>
		        </li>
			{@/each}
		</ul>
	</script>
</body>

<?php include PRO_BASE.'portal/template/footerv1.php'; ?>