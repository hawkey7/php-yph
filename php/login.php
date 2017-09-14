<?php

header("content-type:text/html;charset=utf-8");
$username = $_GET["uname"];
$userpsd = $_GET["upsd"];
$state = $_GET["state"];

if ( $state=="regis" ){
	$_res = 0;
	$db = mysql_connect("localhost","root","root");
	mysql_select_db("users",$db);
	mysql_query("set names utf8");
	$sql = "select * from youpinhui where uname='$username'";
	$res = mysql_query($sql);
	$arr = mysql_fetch_array($res);
	if ( $arr ){
		$_res = 1 ;
	}
	if ( $_res==0 ){
		$sql2 = "insert into info(uname,upwd) values('$username','$userpsd')";
	}
	echo $_res;
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




?>