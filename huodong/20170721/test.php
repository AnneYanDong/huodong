<?php 
  $ret = array(
    "ret"=>array(
        "url"=>"http://www.baidu.com",
        "login" => true,
        "chance" => 0, //抽奖次数
        "gift_name" => "100积分",
        "angle" =>70
        ),
    "success"=>true,
  );
  echo json_encode($ret);
 ?>
