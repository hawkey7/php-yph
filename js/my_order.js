
//载入左侧main
$(".main_l_ajax").load("../html/public.html #main_l",function(){
	$(".main_l").find("dd").click(function(){
		$(this).parent().parent().find("dd").css("background","#fff")
		$(this).css("background","pink")
	});
})
//淡入淡出轮播图

var index = 0;
var timer1 = setInterval(autoPlay,2000);
// var flag = true;
function autoPlay(){
	// if(flag){
		index++;
		if( index ==3 ){
			index = 0;
		}
		$(".pic_area").find("li").eq(index).stop().animate({"opacity":"1"},100).siblings().stop().animate({"opacity":"0"},100);
		$(".btn_bot").find("span").eq(index).addClass("active").siblings().removeClass("active")
	// }
}

//左右侧点击左右移动
$(".btn_side_l").click(function(){
	clearInterval(timer1);
	index--;
	if( index==-1 ){
		index=2;
	}
	$(".pic_area").find("li").eq(index).stop().animate({"opacity":"1"},100).siblings().stop().animate({"opacity":"0"},100);
	$(".btn_bot").find("span").eq(index).addClass("active").siblings().removeClass("active")
	timer1 = setInterval(autoPlay,2000);
})
$(".btn_side_r").click(function(){
	clearInterval(timer1);
	autoPlay();
	timer1 = setInterval(autoPlay,2000);
})

//底部鼠标移入滑动至对应位置图片
$(".btn_bot").find("span").mouseenter(function(){
	clearInterval(timer1);
	index = $(this).index()-1;
	autoPlay();
	timer1 = setInterval(autoPlay,2000);
})


