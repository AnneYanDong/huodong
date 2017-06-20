<?php 
	$res = array(
		"ret"=>array(
			"list"=>array(
				// 一共砸了多少蛋
				// 电话送了几个
				// 机器人送了几个
				// QQ会员送了几个
				// 电话蛋是第几个
				// 机器人蛋是第几个
				// 是不是今天？
				// 日期
				array("process"=> 1000, "phone"=> 1, "robot"=> 1, "qqMember"=> 1000, "phoneEgg"=> 300, "robotEgg"=> 800, "today"=> false, 'date'=>'04.27'),
				array("process"=> 2000, "phone"=> 1, "robot"=> 2, "qqMember"=> 2000, "phoneEgg"=> 1500, "robotEgg"=> 1000, "today"=> false, 'date'=>'04.28'),
				array("process"=> 3000, "phone"=> 1, "robot"=> 3, "qqMember"=> 3000, "phoneEgg"=> 700, "robotEgg"=> 2000, "today"=> false, 'date'=>'04.29'),
				array("process"=> 4000, "phone"=> 1, "robot"=> 4, "qqMember"=> 4000, "phoneEgg"=> 1700, "robotEgg"=> 2700, "today"=> true, 'date'=>'04.30'),
				array("process"=> null, "phone"=> 0, "robot"=> 0, "qqMember"=> 0, "phoneEgg"=> null, "robotEgg"=> null, "today"=> false, 'date'=>'05.01'),
				array("process"=> null, "phone"=> 0, "robot"=> 0, "qqMember"=> 0, "phoneEgg"=> null, "robotEgg"=> null, "today"=> false,'date'=>'05.02'),
				array("process"=> null, "phone"=> 0, "robot"=> 0, "qqMember"=> 0, "phoneEgg"=> null, "robotEgg"=> null, "today"=> false,'date'=>'05.03')
			),
			// 当前总参与人数
			// 当前总送出大奖（机器人和手机）
			// 当前总送出QQ会员
			"totalPeople"=>30000,
			"totalSendBigPrize"=>8,
			"totalSendMember"=>4040
		),
		"success"=>true
	);

	echo json_encode($res);
 ?>