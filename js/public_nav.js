
//载入head 和 nav
$(".head_nav_wrapper").load("../html/public.html #head_nav_ajax",function(){
		//我的购物车弹出显示
		$(".my_shopcar").hover(function(){
			$(this).find(".hover_icon").css("background","url(../images/change_psd/images/xiangshang_03.jpg) no-repeat center")
			$(this).css("border-bottom","none")
			$(this).next().show();
		},function(){
			$(this).find(".hover_icon").css("background","url(../images/change_psd/images/xiangxia_09.jpg) no-repeat center");
			$(this).css("border-bottom","1px solid #ddd");
			$(this).next().hide();
		})
		//隐藏的nav打开
		$(".nav_detail").hover(function(){
			$(this).find(".nav_hide").show();
		},function(){
			$(this).find(".nav_hide").hide();
		})
		
		//购物车数量实时
		var count = 0 ;
		if( welstr.shoplist ){
			for( var i in welstr.shoplist ){
				count += parseInt( welstr.shoplist[i].count  )
			}
			$(".cartnum").html( count );//购物车读取cookie实时数据

			$('.hide_shopcar').html( "快去购物车结算吧!" )
		}else{
			$('.hide_shopcar').html( "购物车还没有商品,快去挑选吧!" )//缺少一个事件来实时响应
		}
		//为搜索框添加外部接口
		$(".search_box").on("keyup",$("#search_text"),function(){
			$.ajax({
				type:"get",
				url:"https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+$("#search_text").val()+"&cb=fn",
				dataType:"jsonp",
				jsonCallback: "fn"
			});
		})
		$("#search_text").blur(function(){
			$("#box").hide();
		})
		
		$("#search_text").focus(function(){
			if( $("#box").height()==0 ){
				$("#box").hide();
			}else{
				$("#box").show();
			}
		})


})
//百度接口的回调函数
function fn(msg){
	var arr = msg.s;
	var str = "";
	for ( var i = 0; i <arr.length ; i++ ){
		str += `<li><a href="https://www.baidu.com/s?wd=${arr[i]}">${arr[i]}</a></li>`
	}
	$("#box").html(str);
	// console.log(msg)
}