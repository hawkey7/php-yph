var welstr = getCookie("user_now");	//读取现在库户的cookie
//载入顶部
$("#ajax_head").load("../html/public.html #top_nav",function(){
	$(function(){
		timer = setInterval(function(){
			$(".show_notice").animate({"margin-top":-28},"200",function(){
				$(this).append( $(this).children().eq(0) ).css("margin-top",0);
			})
		},3000)
	})

	//弹出二维码
	$(".yg-phone").hover(function(){
		$(".down_app").show();
	},function(){
		$(".down_app").hide();
	})

	// 读取cookie的欢迎页面,有就显示,没有就不显示.
	if( welstr.length!=0 ){
		$(".top-nav-tool").find(".notin").hide().end().find(".in").show();
		$(".wel_user").html(  "欢迎您," + welstr.user ).show();
		//侧边栏显示购物车中的物品数
	}else{
		$(".wel_user").hide();
		
	}
})
// 点击退出登录,退出当前帐号
function logOut(){
	removeCookie("user_now");
	$(".notin").show().end()
	$(".in").hide();
	$(".wel_user").hide();
	location.reload();
}


//载入footer和侧边栏
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
	if( welstr.length!=0 ){
		$('.fly_u_con').html(`<img src="../images/public/images/yonghu.bmp" alt=""> 欢迎您, ${welstr.user} !`)
	}else{
		$('.fly_u_con').html(`<img src="../images/public/images/yonghu.bmp" alt="">你好 ! 请 <a href="login.html"> 登录 </a>|<a href="register.html"> 注册 </a>`);
	}
}) 

