<?php 
  $ret = array(
    "ret"=>array(
        "url"=>"http://www.baidu.com",
        "login" => true,
        "isNew" => true,
        "chance" => 2, //抽奖次数
        "gift_name" => "100积分",
        "angle" =>210,
        "chance2" => 2 //剩余的机会
        ),
    "success"=>true,
  );
  echo json_encode($ret);
 ?>
