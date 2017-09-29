<?php 
	$resData = array(
        "resCode"=>1,
        "resMsg"=>"操作成功",
        "resData"=>array(
            "topList"=>array(
                array("mobilePhone"=>13444444444,
                "sumTenderMoney"=>2333,
                ),
                array("mobilePhone"=>"13444444444","sumTenderMoney"=>"2333","rank"=>1),
                array("mobilePhone"=>"13444444444","sumTenderMoney"=>"2333","rank"=>2),
                array("mobilePhone"=>"13444444444","sumTenderMoney"=>"2333","rank"=>3),
                array("mobilePhone"=>"13444444444","sumTenderMoney"=>"2333","rank"=>4),
                array("mobilePhone"=>"13444444444","sumTenderMoney"=>"2333","rank"=>5),
                array("mobilePhone"=>"13444444444","sumTenderMoney"=>"2333","rank"=>6),
                array("mobilePhone"=>"13444444444","sumTenderMoney"=>"2333","rank"=>7),
                array("mobilePhone"=>"13444444444","sumTenderMoney"=>"2333","rank"=>8)
            )
        )
	);
	echo json_encode($resData);
 ?>