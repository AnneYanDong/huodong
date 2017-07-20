<?php 
  $ret = array(
    "ret"=>array(
            "url"=>"http://www.baidu.com",
            "login" => true,
            "is_weChat" => false,
            "is_qq"=>false,
            "jump"=>true //false就为未领券
        ),
        "success"=>true,
  );
  echo json_encode($ret);
 ?>
