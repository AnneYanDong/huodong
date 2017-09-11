<template>
	<div>
		这是{{page}}页面<br>
		<span class="fontIcon icon-add_circle"></span>
		<div class="img"></div>
		<div class="test-vue-style">测试Vue 23st22yle</div>
	</div>
</template>
<script>
	import "../style/style.css"
	import "../style/main.less"
	import "../common/less/icon.less"

	export default {
		data: function(){
			return {
				page: 'index'
			}
		}
	}
</script>
<style>
	.test-vue-style{
		font-size: 24px;
		color: blue;
	}
</style>