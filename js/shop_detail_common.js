
//选商品颜色
$(".good_color_img").click(function(){
	$(this).css("border-color","#ff004a").find("i").css("display","block");
})

$(".size_type").find("li").click(function(){
	$(this).addClass("on").siblings().removeClass("on");
})

//放大镜开始
//选小图换中图
$(".spic_area").find("li").click(function(){
	$(".mpic_area").find("li").eq( $(this).index() ).show().siblings().hide();
	$(".bpic_area").find("li").eq( $(this).index() ).show().siblings().hide();
})
//鼠标移入中图,出现mask,大图区域出现
$(".mpic_area").hover(function(){
	$(".bpic_area").show();
	$(".mask").show()
	$(document).mousemove(function(e){
		var e = e || event;
		var x = e.pageX - $(".mpic_area").offset().left - 44
		var y = e.pageY - $(".mpic_area").offset().top - 44
		x = Math.min(  $(".mpic_area").width() - 90, Math.max( 0, x )  )
		y = Math.min(  $(".mpic_area").height() - 90 , Math.max( 0, y )  )
		$(".mask").css("left",x);
		$(".mask").css("top",y);
		$(".bpic_area").find("li").css("left", -x*400/312 )
		$(".bpic_area").find("li").css("top", -y*400/312 )
	})
},function(){
	$(".mask").hide();
	$(".bpic_area").hide();
})
//放大镜结束

//商品数量加减
$(".minus").click(function(){
	var num = $(".good_num_inter").html();
	if ( num!=1 ){
		$(".good_num_inter").html( num - 1 )
	}
})
$(".plus").click(function(){
	var num = parseInt( $(".good_num_inter").html() );
	$(".good_num_inter").html( num + 1  );
})

//商品menu吸顶效果 考虑ajax载入的head_nav 无法准确读取高度,因此补上高度
var gm_top = $(".mb_l").offset().top+159;
window.onscroll = function(){
	var sTop = $(document).scrollTop();
	// console.log(sTop)
	// console.log(gm_top)
	// console.log($(".head").offset().top)
	if( sTop > gm_top ){
		$(".goods_menu").css({"position":"fixed","top":0})
						.find("ul").css("width","1000")
						.find(".kong").hide()
						.end()
						.find("div").show()
	}else{
		$(".goods_menu").css({"position":"absolute","top":-1})
						.find("ul").css("width","790")
						.find(".kong").show()
						.end()
						.find("div").hide();
	}
}

// 读取cookie的欢迎页面,有就显示,没有就不显示.
var welstr = getCookie("user_now");
if( welstr ){
	$(".wel_user").html(  "欢迎您," + welstr.user ).show();
}else{
	$(".wel_user").hide();
}

//点击悬浮条可以直接跳转
$(".goods_menu>ul>li:not('.kong')").click(function(){
	$(this).siblings().removeClass("on")
			.end()
			.addClass("on")
	if( $(this).index()==0 ){
		$(document).scrollTop( $(".mb_l").offset().top )
	}else if (  $(this).index()==1 ){
		$(document).scrollTop( $(".comment_area").offset().top-88 )
	}else{
		$(document).scrollTop( $(".instruction").offset().top-88 )
	}
})