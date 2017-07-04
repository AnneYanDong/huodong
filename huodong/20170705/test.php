<?php 
	$ret = array(
		"ret"=>array(
            "url"=>"http://www.baidu.com",
            "login" => true,
            "weChat" => false,
            "qq"=>false,
            "have_new"=>true,
            "apply"=>false,
            "gift_price"=>0
        ),
        "success"=>true,
	);
	echo json_encode($ret);
 ?>