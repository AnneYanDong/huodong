<?php
  $ret = array(
    "ret"=>array(
      "data" => array(
        "name"=>"金盈贷",
        "match_rate"=>95,
        "max_amount"=>"5万",
        "day_rate"=>"0.02%",
        "loan_time"=>"1-3天",
        "url"=>"http://www.baidu.com",
        "sex"=>1,
        "show"=>["小额度","放款快","分期长"],
      )
    ),
    "success"=>true,
  );
  echo json_encode($ret);
?>
