<?php 
// CORS
// header('Access-Control-Allow-Origin:*'); 

// $a = [
// 	"a"=>1,
// 	"b"=>2
// ];
// print_r(json_encode($a)) ;
$jsonp = $_GET['callback'];//get接收jsonp自动生成的函数名  
  
$arr = array(
	'callback' => $jsonp,
    'id' => 1,  
    't' => 1  
);  
echo $jsonp.'('. json_encode($arr). ')'; //jsonp函数名包裹json数据返回一个callbcak({   })  
// 前端使用动态script标签src引用地址，执行回调函数
phpinfo();
 ?>