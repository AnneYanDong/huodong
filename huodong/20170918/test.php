<?php 
	// 接口失败的不让抽奖
	// $ret = array(
	// 	"code"=>0,
	// 	"msg"=>"活动没开始，抽什么抽"
	// );

	// 已经抽奖过了
	// $ret = array(
	// 	"success"=>true,
	// 	"lottery"=>1, // 0没抽过  1抽过
	// 	"ret"=>array(
	// 		"code"=>"0500",
	// 		"url"=>"https://www.baidu.com"
	// 	),
	// );	

	// 抽奖开始
	$ret = array(
		"success"=>true,
		"lottery"=>0, // 0没抽过  1抽过
		"ret"=>array(
			"code"=>"0500",
			"url"=>"https://www.baidu.com"
		),
	);
	echo json_encode($ret);
 ?>