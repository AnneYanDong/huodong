<?php 
	$ret = array(
		"ret"=>array(
            "url"=>"http://www.baidu.com",
			"match"=>false,
            "login" => true,
            "weChat" => false,
            "type" => 3
        ),
        "success"=>true,
        "code"=>1,
        "msg"=>"活动下线喽"

	);
	echo json_encode($ret);
 ?>