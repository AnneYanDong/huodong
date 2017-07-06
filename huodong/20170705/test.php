<?php 
	$ret = array(
		"ret"=>array(
            "url"=>"http://www.baidu.com",
            "login" => true,
            "weChat" => false,
            "qq"=>false,
            "have_new"=>false, //false就为未领券
            "apply"=>false, //未申请才能领券
            "gift_price"=>80
        ),
        "success"=>true,
	);
	echo json_encode($ret);
 ?>