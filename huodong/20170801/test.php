<?php
  $ret = array(
    "ret"=>array(
      "data" => array(
        "name"=>"金盈贷",
        "match_rate"=>95,
        "max_amount"=>"3000元",
        "day_rate"=>"0.02%",
        "loan_time"=>"1-3天",
        "url"=>"http://www.baidu.com",
        "sex"=>1,
        "show"=>["小额度","急用钱","分期长"],
      )
    ),
    "success"=>true,
    "display" => true
  );
  echo json_encode($ret);
?>
