


define(function(require){
	var $ = require("jquery-1.11.1.min");
	// var cc = require("cookie");
	var gi = require("public");

	gi.getTop();
	$(".footer").load("../html/public.html #footer",function(){
		$(".sidebar").find("li").hover(function(){
			$(this).find(".iconfont").css("background","red").siblings(".sidebar-hover").show();
			$(this).find(".cartnum").css({"background":"white","color":"red"});
		},function(){
			$(this).find(".iconfont").css("background","").siblings(".sidebar-hover").hide();
			$(this).find(".cartnum").css({"background":"red","color":"white"});
		})
		//回到顶端
		$(".fly-top").click(function(){
			$(document).scrollTop(0);
		})
		//我的订单和优惠券变色
		$(".fly_u_bot a").hover(function(){
			$(this).css({"color":"#f70800","border-color":"#f70800"});
		},function(){
			$(this).css({"color":"#222","border-color":"#e3e3e3"});
		})
		//关闭按钮
		$(".close_fly_u").click(function(){
			$(this).parent().hide();
		})
	}) 





	//focus框变绿
	$(".land_con").find(".yzm_text").focus(function(){
		$(this).parent().css("border-color","#45F445")
	})
	$(".land_con").find(".yzm_text").blur(function(){
		$(this).parent().css("border-color","#a2a2a2")
	})
	//正则检测手机号码是否是11位,以138,139,188,130,186开头
	var qc_flag = true;
	var reg1 = /^(138|139|188|186)\d{8}$/
	function phoneNum(){
		if ( reg1.test( $("#pn").val() )){
			return true;
		}else{
			return false;
		}
	}
		//手机帐号实时判断
	var str = getCookie("userlist");//获取coookie数据
	$("#pn").blur(function(){
		if( phoneNum() ){
			if( str ){
				for ( var i in str ){
					console.log(str[i].user)
					console.log( $("#pn").val())
					if ( str[i].user == $("#pn").val()  ){
						$("#pntip").html("该用户名已经被注册!")
									.css({"border": "1px solid red","background":"#F9E5E5","color":"red"})
						return;
					}
				}
				$("#pntip").hide();
				$(this).siblings().css("background","url(../images/login/images/cor.bmp) no-repeat center")
			}else{
				alert( phoneNum() )
				$("#pntip").html("手机格式不正确，请核对后再输入")
							.css({"border": "1px solid red","background":"#F9E5E5","color":"red"})
			}
		}
	})
	$("#pn").focus(function(){
		$("#pntip").show();
	})

	//正则检测验证码是否正确
	function yzm(){
		if( $("#yzm").val()=="rckt" ){
			return true;
		}
	}
	//设置密码是否是6位-20,包涵大写/小写/数字
	var reg2 = /^\w{6,20}$/
	function szPsd(){
		if( reg2.test( $("#szpsd").val() ) ){
			return true;
		}
	}
		//设置密码实时判断
	$("#szpsd").blur(function(){
		if( szPsd() ){
			$("#sztips").hide();
			$(this).siblings().css("background","url(../images/login/images/cor.bmp) no-repeat center")
		}else{
			$(this).siblings().css("background","url('../images/login/images/2017_09_02_21_57.28.bmp')")
			if( $("#szpsd").val()=="" ){
				$("#sztips").html("请输入密码")
							.css({"border": "1px solid red","background":"#F9E5E5","color":"red"})
			}else{
				$("#sztips").html("密码长度应是6-20位字符，请重新输入")
							.css({"border": "1px solid red","background":"#F9E5E5","color":"red"})
			}
		}
	})
	$("#szpsd").focus(function(){
		$("#sztips").show();
	})

	//确认密码是否和设置密码相同
	function qrPsd(){
		if( $("#qrpsd").val()==$("#szpsd").val() ){
			return true;
		}
	}
	$("#qrpsd").blur(function(){
		if( qrPsd()&&$("#qrpsd").val()!="" ){
			$("#qrtips").hide();
			$(this).siblings().css("background","url(../images/login/images/cor.bmp)")
		}else{
			$(this).siblings().css("background","url('../images/login/images/2017_09_02_21_57.28.bmp')")
			if( $("#qrpsd").val()=="" ){
				$("#qrtips").html("请确认密码")
							.css({"border": "1px solid red","background":"#F9E5E5","color":"red"})
			}else{
				$("#qrtips").html("两次输入的密码不一致")
							.css({"border": "1px solid red","background":"#F9E5E5","color":"red"})
			}
		}
	})
	$("#qrpsd").focus(function(){
		$("#qrtips").show();
	})
	//短信验证码:9999
	function dxYzm(){
		if( $("#dxyzm").val()=="9999" ){
			return true;
		}
	}
	//是否同意用户承诺
	function Agree(){
		if( $("#agree").prop("checked")  ){
			return true;
		}
	}
	//提交按钮点击后判断是否可以跳转
	$("#btn").click(function(){
		console.log( phoneNum() , yzm() , szPsd() , qrPsd() , dxYzm() , Agree() )
		if( phoneNum() && yzm() && szPsd() && qrPsd() && dxYzm() && Agree() ){
			alert()
			var _json = {
				"user" : $("#pn").val(),
				"psd" : $("#szpsd").val() 
			}
			var arr = [];
			if( str!="" ){
				arr = str;
			}
			arr.push(_json);
			setCookie("userlist", JSON.stringify(arr) , 10 );

			// 将当前客户登录信息送至欢迎cookie.
			setCookie( "user_now" , JSON.stringify(_json)  );

			location.href = "../html/my_order.html";
			console.log(arr);
		}else{
			alert("请填写完整注册信息")
		}
	})
})