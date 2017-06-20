<?php 
	$res = array(
		"ret"=>array(
			"eggHistory"=>array(
				array(
					// 蛋的类型
					// 蛋ID
					'eggType'=>1,
					'eggId'=> 30
				),
				array(
					'eggType'=>2,
					'eggId'=> 30
				),
				array(
					'eggType'=>3,
					'eggId'=> 30
				),
				array(
					'eggType'=>4,
					'eggId'=> 30
				),
				array(
					'eggType'=>5,
					'eggId'=> 30
				),
				array(
					'eggType'=>6,
					'eggId'=> 30
				),
			)
		),
		"success"=>true
	);

	// 1喜蛋(华为P10) 2邋遢蛋（扫地） 3复活蛋 4烟雾蛋 5查页蛋 6申请蛋 0未砸

	echo json_encode($res);
 ?>