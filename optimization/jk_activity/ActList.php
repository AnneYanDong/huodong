<?php 
	$title = "活动列表";
	include "../public/v1/header.php";
	$obj = new Resource;
	$res = $obj->getResStr("jk_activity");
 ?>
 <?php 
 	echo $res['css'];
  ?>
  <?php 
	echo $res['js'];
 ?>
</head>
<body>
	<div id="app">
		<div class="wrap wrap-list" style="margin: 0 auto; max-width: 1024px; min-width: 320px;">
			<div class="act-list-wrap">
				<ul class="act-list">
					<li class="act-item" v-for="(item,index) in actList">
						<a :href="item.url">
							<img :src="item.banner" :alt="item.description">
						</a>
					</li>
<!-- 					<li class="no-more">
						<span>没有更多了</span>
					</li> -->
				</ul>
			</div>
		</div>
		<loading-anim :ajax-status="ajaxStatus"></loading-anim>
	</div>

<script type="text/x-template" id="loadingAnim">
	<transition name="fade">
		<div class="load-anim-wrap" v-if="ajaxStatus">
			<div class="load-anim-ele"></div>
		</div>
	</transition>
</script>
 <script>
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }
 	init.actList();
 </script>
</body>
</html>