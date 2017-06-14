<?php
	$ret = array(
		"errcode"=>0,
		"have"=>false,  //这个值是用来判断用户有没有领取红包的
		"url1"=>"https://kaifa.jianbing.com/shequ/discovery/index.php?route=bankx/front&bank_id=42&from=activity_64",
		"url2"=>"https://kaifa.jianbing.com/act/home/optimization/activity/ActCenter.php?defaultmenu=1",
	);
	echo json_encode($ret);
 ?>