<?php 
	$ret = array(
		"ret"=>array(
            "url"=>"http://www.baidu.com",
            "login" => true,
            "weChat" => false,
            "qq"=>false,
            "have"=>true,
            "type"=>1,
            "order"=>true
        ),
        "success"=>true,
	);
	echo json_encode($ret);
 ?>