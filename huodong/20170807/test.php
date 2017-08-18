<?php
  $ret = array(
    "ret"=>array(
       "login"=> true,
        "is_weChat"=> false,
        "is_qq"=> false,
        "show"=> true,
        "name"=> "栋哥",
        "url" => "http://www.baidu.com",
        "analyze1" => array(
          "city"=>"杭州",
          "ranking"=>6168,
          "ranking_p"=> 90.12,
          "gender"=> "女"
        ),
        "analyze2" => array(
          "year"=>2010,
          "month"=> 9,
          "city"=> "杭州",
          "diff_year"=> 6
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
          "text"=>"在北京买一块窗玻璃|
          在杭州买一个迷你阳台|...|
          在泰国曼谷...|租啥小单间啊！|高层公寓来一套啊！|永久居住有木有！",
        ),
        "analyze6" => array(
          "loanable_amount"=>1231231,
        )
    ),
    "success"=>true,
  );
  echo json_encode($ret);
?>

