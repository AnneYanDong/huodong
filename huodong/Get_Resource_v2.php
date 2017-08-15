<?php 
	// 跟以前的区别：单独项目，单独放置项目自己的资源配置表，放置都放在一起，配置出错影响到别的项目。
	class Resource {
		var $mode;
		public function __construct(){
			$host = $_SERVER['HTTP_HOST'];
			if (preg_match("/b\.jianbing\.com/",$host) || preg_match("/kaifa\.jianbing\.com/",$host) || preg_match("/test\.jianbing\.com/",$host)) {
				$this->mode = 'cdn';
			}else{
				$this->mode = 'local';
			}
			if (isset($_GET['mode'])) {
				if ($_GET['mode'] === 'cdn') {
					$this->mode = 'cdn';
				}else if ($_GET['mode'] === 'local') {
					$this->mode = 'local';
				}
			}
		}
		public function urlStr($str){
			if (!$str) {
				return false;
			}else{
				$str = preg_replace('/__uri\(/', '', $str);
				$str = preg_replace('/\)/', '', $str);
				return $str;
			}
		}
		public function jsonstrToArr($str){ // 配置文件字符串转数组
			if (!isset($str)) {
				return false;
			}else{
				$resArr = json_decode($str,true);
			}
			return $resArr;
		}
		public function assingRes($arr,$str){ // 所有资源数组，指定资源名称
			if (!isset($str) || !isset($arr)) {
				return false;
			}else{
				$res = $arr[$str];
			}
			return $res;
		}
		public function dealJs($arr){
			if (isset($arr) && is_array($arr)) {
				if (isset($arr['js'])) {
					$js = $arr['js'];
					return $js;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}
		public function dealCss($arr){
			if (isset($arr) && is_array($arr)) {
				if (isset($arr['css'])) {
					$css = $arr['css'];
					return $css;
				}else{
					return false;
				}
			}else{
				return false;
			}
		}
		// 不用requirejs用这个，资源配置表里面也要重新写，依赖一定要按照顺序写资源配置表
		// public function wrapHtmlTag($arr,$type){ // 打印数组中资源到html中
		// 	if (!$type) {
		// 		return false;
		// 	}
		// 	if (isset($arr) && is_array($arr)) {
		// 		$resRes = '';
		// 		if ($type === 'js') {
		// 			foreach ($arr as $key => $value) {
		// 				$value = 'https://' . $value;
		// 				$resRes = $resRes . '<script src=' . $value . '></script><br>';
		// 			}
		// 			return $resRes;
		// 		}else if($type === 'css'){
		// 			foreach ($arr as $key => $value) {
		// 				$value = 'https://' . $value;
		// 				$resRes = $resRes . '<link rel=stylesheet href=' . $value . '><br>';
		// 			}
		// 			return $resRes;
		// 		}else{
		// 			return false;
		// 		}
		// 	}
		// }
		public function wrapHtmlTag($arr,$type){ // 打印数组中资源到html中 requirejs加载第三方库，活动项目单个js加载入口
			if (!$type) {
				return false;
			}
			if (isset($arr) && is_array($arr)) {
				$resRes = '';
				if ($this->mode == 'cdn') {
					if ($type === 'js') {
						foreach ($arr as $key => $value) {
							$value = 'https://' . $value;
							$resRes = $resRes . $value;
						}
						return $resRes;
					}else if($type === 'css'){
						foreach ($arr as $key => $value) {
							$value = 'https://' . $value;
							$resRes = $resRes . $value;
						}
						return $resRes;
					}else{
						return false;
					}
				}else if($this->mode == 'local'){
					if ($type === 'js') {
						foreach ($arr as $key => $value) {
							$value = str_replace("../", "../static/", $value);
							$resRes = $resRes . $value;
						}
						return $resRes;
					}else if($type === 'css'){
						foreach ($arr as $key => $value) {
							$value = str_replace("../", "../static/", $value);
							$resRes = $resRes . $value;
						}
						return $resRes;
					}else{
						return false;
					}
				}
				
			}
		}
		function getResStr($assign, $version){  // 拿指定活动的资源, common资源必拿
			if ($this->mode == 'local') {
				$res = dirname(__FILE__) . "/static/resource/" . $assign . "-conf.js";
			}else if($this->mode == 'cdn'){
				$res = dirname(__FILE__) . "/release/resource/" . $assign . "-conf.js";
			}else {
				return false;
			}
			$resStr = $this->urlStr(file_get_contents($res));
			$resArr = $this->jsonstrToArr($resStr);
			$assignResArr = $this->assingRes($resArr,$version); // 指定资源，
			// $commResArr = $this->assingRes($resArr,'common'); // common资源
			$assingJsStr = $this->wrapHtmlTag($this->dealJs($assignResArr),'js');
			$assingCssStr = $this->wrapHtmlTag($this->dealCss($assignResArr),'css');
			// $commonJsStr = $this->wrapHtmlTag($this->dealJs($commResArr),'js');
			// $commonCssStr = $this->wrapHtmlTag($this->dealCss($commResArr),'css');
			// $css = $commonCssStr . $assingCssStr;
			// $js = $commonJsStr . $assingJsStr;
			$css = $assingCssStr;
			$js = $assingJsStr;
			$frontRes = array(
				'css'=>$css,
				'js'=>$js
			);
			return $frontRes;
		}
	}
 ?>