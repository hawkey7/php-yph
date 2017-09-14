
//banner轮播
var timer_b = setInterval(autoPlay,3000)
var index_b = 0;
var flag = true;
function autoPlay(){
	if( flag ){
		flag = false;
		index_b++;
		if ( index_b==2 ){
			index_b=0;
		}
		$(".scroll_banner").animate({"left":"-2380"},800,function(){
			$(this).css("left",-460).append( $(this).find("li").eq(0) );
			flag = true;
		})
		$(".banner_btn").find("span").eq(index_b).addClass("on").siblings().removeClass("on");
	}
}

//鼠标划入,停止自动轮播
$(".banner").hover(function(){
	$(".banner_fb").fadeIn();
	clearInterval(timer_b);
},function(){
	$(".banner_fb").fadeOut();
	timer_b = setInterval(autoPlay,6000);
})
//左右键控制方向
$(".bgb_l").click(function(){
	autoPlay();
})
$(".bgb_r").click(function(){
	if( flag ){
		flag = false;
		index_b--;
		if ( index_b==-1 ){
			index_b=1;
		}
		$(".scroll_banner").css("left",-2380).prepend( $(".scroll_banner").find("li").eq(1) );
		$(".scroll_banner").animate({"left":-460},800,function(){
			flag = true;
		})
		$(".banner_btn").find("span").eq(index_b).addClass("on").siblings().removeClass("on");
	}
})
//点击下方按钮跳转到对应图片
 $(".banner_btn").find("span").mouseenter(function(){
 	if ( flag ){
 		flag = false;
	 	$(".scroll_banner").animate({"left": -460+$(this).index()*-1920 },800,function(){
				flag = true;
			})
	 	index_b = $(this).index();
	 	$(".banner_btn").find("span").eq(index_b).addClass("on").siblings().removeClass("on");
	}
 })


//main 区域的轮播
//banner轮播
var timer_m = setInterval(autoPlay2,3000)
var index_m = 0;
var flag2 = true;
function autoPlay2(){
	if( flag2 ){
		flag2 = false;
		index_m++;
		if ( index_m==7 ){
			index_m=0;
		}
		$(".left_bot_bland ul").find("li").eq(index_m).animate({"opacity":1},500,function(){
			flag2 = true;
		}).siblings().animate({"opacity":0},500)
		$(".red_mark ul").find("li").eq(index_m).addClass("on").siblings().removeClass("on");
	}
}

//鼠标划入,停止自动轮播
$(".left_bot_bland").hover(function(){
	clearInterval(timer_m);
},function(){
	timer_m = setInterval(autoPlay2,3000);
})
// //左右键控制方向
$(".fb_r").click(function(){
	autoPlay2();
})
$(".fb_l").click(function(){
	if( flag2 ){
		flag2 = false;
		index_m--;
		if ( index_m==-1 ){
			index_m=6;
		}
		$(".left_bot_bland ul").find("li").eq(index_m).animate({"opacity":1},500,function(){
			flag2 = true;
		}).siblings().animate({"opacity":0},500)
		$(".red_mark ul").find("li").eq(index_m).addClass("on").siblings().removeClass("on");
	}
})
// 鼠标移入下方图片跳转到对应图片
 $(".spic_area").on("mouseenter","li",function(){
 	index_m = $(this).index();
  	$(".left_bot_bland ul").find("li").eq(index_m).stop().animate({"opacity":1},500).siblings().stop().animate({"opacity":0},500,function(){
  		flag2 = true;
  	})
 	$(".red_mark ul").find("li").eq(index_m).addClass("on").siblings().removeClass("on");
 })



 
 //main右侧的轮播
 var index_r = 0;
 var flag3 = true;
 // //左右键控制方向
 $(".yg_fb_l").click(function(){
 	if( flag3 ){
	 	index_r++;
	 	if( index_r==10 ){
	 		index_r=9;
	 	}
	 	$(".l_scroll").animate({"margin-left":-index_r*267},300,function(){
	 		flag3 = true;
	 	})
	}
 })
 $(".yg_fb_r").click(function(){
 	if( flag3 ){
	 	index_r--;
	 	if( index_r==-1 ){
	 		index_r=0;
	 	}
	 	$(".l_scroll").animate({"margin-left":-index_r*267},300,function(){
	 		flag3 = true;
	 	})
	}
 })


 //右侧轮播上的黑幕出现跳动
 $(".qg_l").hover(function(){
 	$(this).find("span").show();
 },function(){
 	$(this).find("span").hide();
 })



 //右侧轮播下的icon跳动
 $(".zhibo_con li").hover(function(){
 	$(this).find("img").stop().animate({"top":-6},300)
 },function(){
 	$(this).find("img").stop().animate({"top":0},300)
 })


 //ajax载入图片信息
 window.onload = function(){
 	var data = {
 		arr : [],
 		brr : [],
 		crr : [],
 		drr : []
 	}
 	$.ajax({
 		"type" : "get",
 		"url" : "../json/index/goods_show.json",
 		success : function(res){
 			var arr = res.pinpai;
 			var brr = res.globle;
 			var crr = res.last;
 			var drr = res.scroll;
 			data.arr = arr;
 			data.brr = brr;
 			data.crr = crr;
 			data.drr = drr;
 			var html = template( "list_fir" , data );
 			var html2 = template( "list_sed" , data );
 			var html3 = template( "list_last" , data );
 			var html4 = template( "list_scroll" , data );
 			var html5 = template( "list_spic" , data );
 			$(".sale_pic").html( html );
 			$(".global_good_list").html( html2 );
 			$(".l_scroll").html( html3 );
 			$("#scroll_box").html( html4 );
 			$(".spic_area").html( html5 );


 		}
 	})
 }

