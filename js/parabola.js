//购物车抛物线运动&&点击后的cookie和服务器存取
function  parabola( that ){
	
	// alert(_flag)
	//满足添加条件才可进
	//起点坐标
	//开始抛物线函数
	var startPoint = {
		x : $(that).offset().left + $(that).width()/2,
		y : $(that).offset().top
	}
	//终点坐标
	 var endPoint = {
	 	x : $("#fly-shopcar").offset().left - 10,
	 	y : $("#fly-shopcar").offset().top
	 }
	//最高点 
	var topPoint = {
		x : endPoint.x - 1000 ,
		y : endPoint.y + 10
	}
	
	//根据三点坐标确定抛物线的系数
	var a = ((startPoint.y - endPoint.y) * (startPoint.x - topPoint.x) - (startPoint.y - topPoint.y) * (startPoint.x - endPoint.x)) / ((startPoint.x * startPoint.x - endPoint.x * endPoint.x) * (startPoint.x - topPoint.x)-(startPoint.x * startPoint.x - topPoint.x * topPoint.x) * (startPoint.x - endPoint.x));  
			
	var b = ((endPoint.y - startPoint.y) - a * (endPoint.x * endPoint.x - startPoint.x * startPoint.x)) / (endPoint.x - startPoint.x);  
			
	var c = startPoint.y - a * startPoint.x * startPoint.x - b * startPoint.x;
	
	
	//创建商品
	var data = {
		"src" :  $("#pro_src").attr("src"),
		"pname" : $("#pro_name").html(),
		"color" : "黑色",
		"size" :  $(".size_type .on").html(),
		"price" : $("#price").html(),
		"count" : $(".good_num_inter").html()
	}//方便背景调用
	//获取商品起始点坐标
	var x = startPoint.x;
	var y = startPoint.y;
	var good = document.createElement("div");
	good.style.position = "absolute";
	good.style.left = x + "px";
	good.style.top = y +"px";
	good.className = "gg";
	document.body.appendChild(good);
	good.style.width = "40px";
	good.style.height = "40px";
	good.style.background = `url( '${ data.src } ') no-repeat center` ;
	// alert( good.style.background )
	good.style.backgroundSize = "contain";
	//商品移动  根据抛物线轨迹移动
	$(".gg").animate({"width":10,"height":10,"opacity":0.2},2500);
	var timer = setInterval(function(){
		x += 30;
		y = a*x*x + b*x + c;
		good.style.left = x + "px";
		good.style.top = y + "px";
		if ( x > endPoint.x ){
			x=endPoint.x;
			clearInterval(timer)
			good.style.display = "none";
		}
	},30)

	//cookie 操作
	//购物车商品的数字增加
	var arr = [] ;//商品数组
	var urr = getCookie("userlist") ; //用户数组
	var flag = true;
	// alert(data.src )
	var str = welstr.shoplist;
	if( str ){//如果用户购物车已经有商品了
		arr = str;
		for ( var i in arr ){
			if ( arr[i].pname == data.pname && arr[i].color == data.color && arr[i].size == data.size ){
				arr[i].count = parseInt(arr[i].count) + parseInt($(".good_num_inter").html());
				//存入当前用户的shoplist属性
				welstr.shoplist = arr;
				//当前用户的信息存入cookie
				setCookie( "user_now",JSON.stringify(welstr),3 );
				//将在数据库中的信息修改
				$.ajax({
					type:"get",
					url:"http://localhost/php/youpinhui/project/php/user.php?state=changeShopNum&"+"uname="+welstr.user+"&"+"upsd="+"&shoplist="+JSON.stringify(welstr.shoplist),
					success:function(res){
						console.log(res);//实现修改数据库中的数量
					}
				})
				flag = false;//已经加上数量,不再执行下面的任务
			}
		}
	}
	if( flag ){//如果是新商品,直接存入信息.
		arr.push( data );
		welstr.shoplist = arr;
		//存入当前用户cookie
		setCookie( "user_now",JSON.stringify(welstr),3 );
		//存入数据库
		$.ajax({
			type:"get",
			url:"http://localhost/php/youpinhui/project/php/user.php?state=changeShopNum&"+"uname="+welstr.user+"&"+"upsd="+"&shoplist="+JSON.stringify(welstr.shoplist),
			success:function(res){
				console.log(res);//实现修改数据库中的数量
			}
		})
	}
	$(".cartnum").html(  parseInt( $("#cartnum").html() ) + parseInt(data.count) )
}