<?php 
	$title = "测试的";
	include "../public/v1/header.php";
	$obj = new Resource;
	$res = $obj->getResStr("test");
 ?>
 <?php 
 	echo $res['css'];
  ?>
</head>
<body>

<?php 
	echo $res['js'];
 ?>
<script>
    // $.ajax({
    //     type: "post",
    //     url: "//kaifa.jianbing.com/app/banners/get_activity_banners",
    //     success: function(r) {
    //     	alert("get_activity_banners")
    //     },
    //     error: function(xhr, errorType, error){
    //         alert(xhr);
    //         alert(errorType);
    //         alert(error);
    //     }
    // })
    // $.ajax({
    //     type: "post",
    //     url: "//kaifa.jianbing.com/act/v2/activities/get_act_categories",
    //     success: function(r) {
    //     	alert("get_act_categories")
    //     },
    //     error: function(xhr, errorType, error){
    //         alert(xhr);
    //         alert(errorType);
    //         alert(error);
    //     }
    // })
    // $.ajax({
    //     type: "post",
    //     url: "//kaifa.jianbing.com/act/v2/activities/get_gifts",
    //     success: function(r) {
    //     	alert("get_gifts")
    //     },
    //     error: function(xhr, errorType, error){
    //         alert(xhr);
    //         alert(errorType);
    //         alert(error);
    //     }
    // })

    axios.post("//kaifa.jianbing.com/act/v2/activities/get_act_categories",JSON.stringify({
        location: "activity_hot"
    })).then(function(r){
        console.log(r);
    })

    // axios({
    //     method: 'post',
    //     url: "//kaifa.jianbing.com/act/activities/get_gifts",
    //     transformRequest: [function(data) {
    //         data = JSON.stringify(data);
    //         return data;
    //     }],
    //     data: {},
    // }).then(function(response) {
    //     alert("get_gifts")
    // }).catch(function(e){
    //     alert(e);
    // })  



    // axios({
    //     method: 'post',
    //     url: "https://kaifa.jianbing.com/act/v2/activities/get_act_categories",
    //     transformRequest: [function(data) {
    //         data = JSON.stringify(data);
    //         return data;
    //     }],
    //     data: {
    //     },
    // }).then(function(response) {
    //     alert("get_act_categories")
    // }).catch(function(e){
    // 	alert(e);
    // })

    // axios({
    //     method: 'post',
    //     url: "https://kaifa.jianbing.com/app/banners/get_activity_banners",
    //     transformRequest: [function(data) {
    //         data = JSON.stringify(data);
    //         return data;
    //     }],
    //     data: {
    //     },
    // }).then(function(response) {
    //     alert("get_activity_banners")
    // }).catch(function(e){
    // 	alert(e);
    // })
</script>
</body>
</html>