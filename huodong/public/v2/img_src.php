<?php 
    $origin = $_SERVER['HTTP_HOST'];
    if (preg_match('/b\.jianbing\.com/', $origin) || preg_match('/kaifa\.jianbing\.com/', $origin)) {
        $imgUrl = '//r.51gjj.com/act/release/img/' . $proName . '_';
    } else {
        $imgUrl = '../static/img/' . $proName . '_';
    };   
 ?>