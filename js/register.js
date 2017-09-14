//focus框变绿
$(".land_con").find(".yzm_text").focus(function(){
	$(this).parent().css("border-color","#45F445")
})
$(".land_con").find(".yzm_text").blur(function(){
	$(this).parent().css("border-color","#a2a2a2")
})
//正则检测手机号码是否是11位,以138,139,188,130,186开头
var qc_flag = true;
var reg1 = /^(138|139|188|186|130|189|187)\d{8}$/
function phoneNum(){
	if ( reg1.test( $("#pn").val() )){
		return true;
	}else{
		return false;
	}
}
//手机帐号实时判断
$("#pn").blur(function(){
	var that = this;
	if( phoneNum() ){
		$.ajax({
			type:"get",
			url:"http://localhost/php/youpinhui/project/php/user.php?state=login&"+"uname="+$("#pn").val()+"&"+"upsd="+$("#szpsd").val()+ "&shoplist=",
			success:function(res){
				// console.log(res)
				res = JSON.parse(res);
				if( res.val!=0 ){//用户名重复并提示
					$("#pntip").html("该用户名已经被注册!")
								.css({"border": "1px solid red","background":"#F9E5E5","color":"red"})
				}else {//用户名不重复出现可注册提示!!
					$("#pntip").hide();
					$(that).siblings().css("background","url(../images/login/images/cor.bmp) no-repeat center")
				}
			}
		})
	}else{
		$("#pntip").html("手机格式不正确，请核对后再输入")
					.css({"border": "1px solid red","background":"#F9E5E5","color":"red"})
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
	//设置密码实时用正则判断,
$("#szpsd").blur(function(){
	if( szPsd() ){
		$("#sztips").hide();
		$(this).siblings().css("background","url(../images/login/images/cor.bmp) no-repeat center")//密码正确,提示正确
	}else{
		$(this).siblings().css("background","url('../images/login/images/2017_09_02_21_57.28.bmp')")
		if( $("#szpsd").val()=="" ){
			$("#sztips").html("请输入密码")//密码为空,输入密码
						.css({"border": "1px solid red","background":"#F9E5E5","color":"red"})
		}else{//密码长度不规范重新输入
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
$("#qrpsd").blur(function(){//确认密码同设置密码
	if( qrPsd()&&$("#qrpsd").val()!="" ){
		$("#qrtips").hide();//输入正确,提示正确
		$(this).siblings().css("background","url(../images/login/images/cor.bmp)")
	}else{
		$(this).siblings().css("background","url('../images/login/images/2017_09_02_21_57.28.bmp')")
		if( $("#qrpsd").val()=="" ){
			$("#qrtips").html("请确认密码")//未输入确认密码
						.css({"border": "1px solid red","background":"#F9E5E5","color":"red"})
		}else{
			$("#qrtips").html("两次输入的密码不一致")//两次输入不一致
						.css({"border": "1px solid red","background":"#F9E5E5","color":"red"})
		}
	}
})
$("#qrpsd").focus(function(){
	$("#qrtips").show();
})
//短信验证码:9999
function dxYzm(){
	if( $("#dxyzm").val()=="9999" ){//验证码正确才可注册
		return true;
	}
}
//是否同意用户承诺
function Agree(){
	if( $("#agree").prop("checked")  ){//点勾才可注册
		return true;
	}
}
//提交按钮点击后判断是否可以跳转
$("#btn").click(function(){
	console.log( phoneNum() , yzm() , szPsd() , qrPsd() , dxYzm() , Agree() )
	if( phoneNum() && yzm() && szPsd() && qrPsd() && dxYzm() && Agree() ){
		//满足所有正则,表示注册成功,将注册信息新增到数据库
		var _json = {
			"user" : $("#pn").val(),
			"psd" : $("#szpsd").val() 
		}
		$.ajax({
			type:"get",
			url:"http://localhost/php/youpinhui/project/php/user.php?state=regis&"+"uname="+$("#pn").val()+"&"+"upsd="+$("#szpsd").val()+ "&shoplist=",
			success:function(res){
				console.log(res)
				if( res==1 ){//注册成功,成功存入了数据库
					// alert("注册成功!")
					//将数据存入当前用户的数据库
					var data = {
						"user" : $("#pn").val(),
						"psd" : $("#szpsd").val(),
						"shoplist" : ""
					}
					console.log(data)
					// 设置当前客户登录信息,欢迎cookie.
					setCookie( "user_now" , JSON.stringify(data)  )
					location.href = "../html/my_order.html";
				}
			}
		})
	}else{
		alert("请填写完整注册信息")
	}
})