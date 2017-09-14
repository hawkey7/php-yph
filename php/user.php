<?php

header("content-type:text/html;charset=utf-8");
$username = $_GET["uname"];
$userpsd = $_GET["upsd"];
$state = $_GET["state"];
$shoplist = $_GET["shoplist"];


if ( $state=="regis" ){
	$db = mysql_connect("localhost","root","root");
	mysql_select_db("users",$db);
	mysql_query("set names utf8");
	$sql = "insert into youpinhui(uname,upwd) values('$username','$userpsd')";
	$res = mysql_query($sql);
	echo $res;
}




if ( $state=="login" ){
	$_res = 0;
	$db = mysql_connect("localhost","root","root");
	mysql_select_db("users",$db);//找到user数据库
	mysql_query("set names utf8");
	$sql = "select * from youpinhui where uname='$username'";//从表格悠品惠中读取uname
	$res = mysql_query($sql);//得到结果集
	$arr = mysql_fetch_array($res);//得到结果集中的数组
	if ($arr){
		$_res = 2 ;//用户名存在
		if ( $arr["uname"]==$username && $userpsd==$arr["upwd"] ){
			$_res = 1 ;//可以登录
		}
	};
	//最终返回结果
	$brr = array('val' => $_res , 'info' => $arr );//将数据传入数组
	echo json_encode($brr);//将数组结果返回
}		

if( $state == "changepsd" ){
	$db = mysql_connect("localhost","root","root");
	mysql_select_db("users",$db);//找到user数据库
	mysql_query("set names utf8");
	$sql = "UPDATE youpinhui SET upwd='$userpsd' WHERE uname = '$username'";//修改对应数据
	$res = mysql_query($sql);
	//最终返回结果
	echo $res;//将数组结果返回
}

if( $state == "changeShopNum" ){
	$db = mysql_connect("localhost","root","root");
	mysql_select_db("users",$db);//找到user数据库
	mysql_query("set names utf8");
	$sql = "UPDATE youpinhui SET shoplist='$shoplist' WHERE uname = '$username'";//修改对应数据
	$res = mysql_query($sql);
	//最终返回结果
	echo $res;//将数组结果返回
}

?>
