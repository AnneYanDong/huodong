<?php 
  $ret = array(
    "ret"=>array(
        "url"=>"http://www.baidu.com",
        "login" => true,
        "isNew" => true,
        "prize_num" => "1", //抽奖次数
        "prize_name" => "seven", //7积分

        ),
    "success"=>true,
  );
  echo json_encode($ret);
 ?>
