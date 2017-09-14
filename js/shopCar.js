
var ustr = getCookie("userlist");

//根据cookie 的信息更新购物车的结构
var arr = welstr.shoplist;
var html = "";
for ( var i in arr ){
		html += `<ul class="shoplist">
			<li class="cb"><input type="checkbox" class="gx"></li>
			<li class="good_detail">
				<div class="good_des">
					<img src= '${ arr[i].src }' alt="">
					<span><em id="good_name">${ arr[i].pname }</em><br>颜色:${ arr[i].color } &emsp; 规格:<i id="size">${ arr[i].size }</i></span>
				</div>
				<p>【赠品】 积分赠送[19.80]×1</p>
				<p>【赠品】 今昇羊毛衫×1</p>
			</li>
			<li class="price">￥<em class="per_price">${ arr[i].price }</em></li>
			<li class="cal_num">
				<div class="cal_con">
					<i class="minus">-</i>
					<i class="num">${ arr[i].count }</i>
					<i class="plus">+</i>
				</div>
			</li>
			<li class="sum">￥<em class="sump">${arr[i].price*arr[i].count }</em></li>
			<li class="del_good"></li>
		</ul>`;
}
$(".info_detail").html( html );



//全选功能
$("#qx").click(function(){
	$(".cb").find("input").prop("checked",$(this).prop("checked"))
	sumNum();
})
//商品数量加减
$(".minus").click(function(){
	changeShopNum(this,"-");
})
$(".plus").click(function(){
	changeShopNum(this);
})
//加减函数.
function changeShopNum( that,sign ){
	var sign = sign || "+";
	var num = $(that).siblings(".num").html();
	if ( sign=="-" && num=="1" ){
		return
	}else{
		if( sign=="+" ){
			$(that).siblings(".num").html( ++num );
		}else{
			$(that).siblings(".num").html( --num );
		}
		//存cookie
		var name = $(that).parent().parent().siblings(".good_detail").find("#good_name").html();
		var size = $(that).parent().parent().siblings(".good_detail").find("#size").html();
		for ( var i in welstr.shoplist ){
			if ( welstr.shoplist[i].pname==name && welstr.shoplist[i].size==size){
				welstr.shoplist[i].count = num;
				var price = welstr.shoplist[i].price;
				setCookie( "user_now", JSON.stringify( welstr ) );
				//cookie上传完毕,开始上传到数据库
				$.ajax({
					type:"get",
					url:"http://localhost/php/youpinhui/project/php/user.php?state=changeShopNum&"+"uname="+welstr.user+"&"+"upsd="+"&shoplist="+JSON.stringify(welstr.shoplist),
					success:function(res){
						console.log(res);//实现修改数据库中的数量
						$(that).parent().parent().siblings(".sum").find(".sump").html( num*price );
						sumNum();
						return;
					}
				})
				
			}
		}
	}
}

//自动计算购买了几个,多少钱的商品
sumNum();
function sumNum(){
	var snum = 0;
	var sump = 0;
	$(".gx:checked").each(function(){
		snum += parseInt( $(this).parent().siblings(".cal_num").find(".num").html() );
		sump +=  parseInt( $(this).parent().siblings(".sum").find(".sump").html() );
	})
	$(".sum_num").html( snum );
	$(".sp_price").html( sump );
	$(".sf_price").html( sump - 10 );
}
$(".gx").click(function(){
	sumNum();
})


//删除按钮特效
$(".del_good").hover(function(){
	$(this).css("background-position","-31px -151px");
},function(){
	$(this).css("background-position","-31px -125px");
})
//删除功能
$(".del_good").click(function(){
	var that= this;
	var name = $(this).siblings(".good_detail").find("#good_name").html();
	var size = $(this).siblings(".good_detail").find("#size").html();
	for ( var i in welstr.shoplist ){
		if ( welstr.shoplist[i].pname==name && welstr.shoplist[i].size==size){
			welstr.shoplist.splice(i,1);
			setCookie( "user_now", JSON.stringify( welstr ) );
			//上传完cookie,开始上传到服务器
			$.ajax({
				type:"get",
				url:"http://localhost/php/youpinhui/project/php/user.php?state=changeShopNum&"+"uname="+welstr.user+"&"+"upsd="+"&shoplist="+JSON.stringify(welstr.shoplist),
				success:function(res){
					console.log(res);//实现修改数据库中的数量
					$(that).parent().remove();
					sumNum();
					return;
				}
			})
		}
	}
})


