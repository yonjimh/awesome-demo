<?php  
// for($i = 1; $i <= 300; $i++ ) print(" ");  

// 这一句话非常关键，cache的结构使得它的内容只有达到一定的大小才能从浏览器里输出  

// 换言之，如果cache的内容不达到一定的大小，它是不会在程序执行完毕前输出的。经  

// 过测试，我发现这个大小的底限是256个字符长。这意味着cache以后接收的内容都会  

// 源源不断的被发送出去。  
// echo json_encode([
// 	'code' => 1312,
// 	'msg' => '2321',
// 	'data' => [
// 		'asd' => 123
// 	]
// ]);
for($j = 1; $j <= 10; $j++) {  
echo $j." ";  
ob_flush();
flush(); // flush()刷新缓冲区的内容，输出。这一步会使缓冲区新增的内容被挤出去，显示到浏览器上   
sleep(1);
}  

for ($i=10; $i>2; $i--){
    echo $i.'<br />';
    ob_flush();
    flush();
    sleep(1);
}
ob_end_flush();

?> 