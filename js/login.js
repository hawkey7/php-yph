
//placeholder处理
$(".yhm_text").focus(function(){
	$(this).attr("placeholder","").css({"border-color":"#2FF613","color":"#000"})
})
$(".yhm_text").blur(function(){
	$(this).css({"border-color":"#a2a2a2"})
})
$(".yhm_text").keyup(function(){
	$(this).next().hide();
})

//php端信息获取
$("#btn").click(function(){
	$.ajax({
		type:"get",
		url:"http://localhost/php/youpinhui/project/php/user.php?state=login&"+"uname="+$("#uname").val()+"&"+"upsd="+$("#psd").val()+"&shoplist=",
		success:function(res){
			// console.log(res)
			res = JSON.parse(res);
			if( res.val==1 ){
				$("#psd").siblings(".tips").hide()//登陆成功后,psd框做出反应
				$("#psd").siblings(".land_icon").css("background","url(../images/login/images/cor.bmp) no-repeat").show();				
				// alert("登录成功!")
				//读取客户存在数据库中的数据,提到当前cookie中
				res.info.shoplist = JSON.parse( res.info.shoplist )
				// console.log( typeof res.info.shoplist)
				var data = {
					"user" : $("#uname").val(),
					"psd" : $("#psd").val(),
					"shoplist" : res.info.shoplist
				}
				setCookie( "user_now" , JSON.stringify(data)  )
				location.href = "../html/my_order.html";
			}else{
				$("#psd").siblings(".tips").show();//登录失败 提示密码错误
			}
		}
	})
})

$("#uname").blur(function(){
	var that = this;
	$.ajax({
		type:"get",
		url:"http://localhost/php/youpinhui/project/php/user.php?state=login&"+"uname="+$("#uname").val()+"&"+"upsd="+$("#psd").val()+"&shoplist=",//ajax获取服务器中的用户名和密码信息	
		success:function(res){
			console.log(res)
			res = JSON.parse(res);
			if( res.val!=0 ){
				$(that).siblings(".tips").hide()
				$(that).siblings(".land_icon").css("background","url(../images/login/images/cor.bmp) no-repeat").show()//	密码框变色表示输入正确用户名
			}else if( $("#uname").val().length!=0 ){
				$(that).siblings(".tips").show()//用户名框长度不为0且输入不正确,出现提示框
			}else{
				$(that).siblings(".tips").hide()//用户名框长度为0时,隐藏提示框
			}
		}
	})
})	



/*
$("#btn").click(function(){//验证密码
	var pflag = false;
	if( $("#psd").val() == str[userIndex].psd ){
		pflag = true;
	}
	if(pflag){
		$("#psd").siblings(".tips").hide()
		$("#psd").siblings(".land_icon").css("background","url(../images/login/images/cor.bmp) no-repeat").show()
		
		// 将当前客户登录信息送至欢迎cookie.
		var data = {
			"user" : $("#uname").val(),
		}

		//读取客户存在cookie中的数据,提到当前登录客户的cookie数据中
		for ( i in str ){
			if ( str[i].user == data.user ){
				data = str[i];
			}
		}
		setCookie( "user_now" , JSON.stringify(data)  );
		location.href = "../html/my_order.html";
	}else{
		$("#psd").siblings(".tips").show()
	}
})
*/
