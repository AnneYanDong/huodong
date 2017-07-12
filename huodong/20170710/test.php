<?php 

	$ret = array(
		"ret"=>array(
            "url_1"=>"http://www.baidu.com",
			"url_2"=>"http://www.baidu.com",
			"have"=>true,
            "success"=>true,
			"login"=>true,
			"weChat"=>false,
			"prize"=>"178"
        ),
        "success"=>true
		// "code"=>1,
		// "msg"=>"活动下线喽"
	);
	echo json_encode($ret);
 ?>