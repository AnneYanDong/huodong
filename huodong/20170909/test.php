<?php 

    // echo '{
    //     "resCode":1,
    //     "resMsg": "操作成功",
    //     "resData":{
    //         list:[{"type:2"}]
    //     }
    // }'
	$resData = array(
        "resCode"=>1,
        "resMsg"=>"操作成功",
        "resData"=>array(
            "list"=>array(
                array("type"=>2)
            ),
            "totalTenderAmount"=>2000,
            "lotteryTime"=>3
        )
	);
	echo json_encode($resData);
 ?>