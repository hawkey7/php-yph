	//ajax请求数据
window.onload = function(){
	$(".add_to_car").click(function(){//点击购物车的特效及cookie存取
		var that = this;
		if( $(".good_color_img i").css("display")=="block" && $(".good_size .on").length==1 ){
			parabola( that );
		}
	})
 	$.ajax({//ajax加载数据图
 		"type" : "get",
 		"url" : "../json/shop_detail/goods_pic.json",
 		success : function(res){
 			var arr = res.detail;
 			var brr = res.instruct;
 			var html = html2 = "";
 			for ( var i in arr ){
 				html += `<img src='${ arr[i].src }' alt="">`
 			}
 			$(".goods_img_area").html( html );

 			for ( var j in brr ){
 				html2 += `<li><img src="${ brr[j].src }" alt=""></li> `
 			}
 			$(".instruction_img").html( html2 )
 		}
 	})
}
