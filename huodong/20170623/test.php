<?php 
	$ret = array(
		"ret"=>array(
            "url"=>"http://www.baidu.com",
            "login" => true,
            "weChat" => true,
            "qq"=>false,
            "have"=>true,
            "type"=>1
        ),
        "success"=>true,
	);
	echo json_encode($ret);
 ?>