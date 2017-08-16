<?php
  $ret = array(
    "ret"=>array(
       "login"=> false,
        "is_weChat"=> false,
        "is_qq"=> false,
        "show"=> false,
        "name"=> "栋哥",
        "analyze1" => array(
          "city"=>"杭州",
          "ranking"=>12334,
          "ranking_p"=> 90.12,
          "gender"=> "女"
        ),
        "analyze2" => array(
          "year"=>2010,
          "month"=> 9,
          "city"=> "杭州"
        ),
        "analyze3" => array(
          "age"=>90,
          "gender"=> "女",
          "ranking_p_male"=> 90.23,
          "ranking_p_female"=> 10.10
        ),
        "analyze4" => array(
          "company_count"=> 8,
        ),
        "analyze5" => array(
          "text"=>"待定",
        ),
        "analyze6" => array(
          "loanable_amount"=>"待定",
        )
    ),
    "success"=>true,
  );
  echo json_encode($ret);
?>

