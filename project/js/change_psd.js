//载入左侧main
$(".main_l_ajax").load("../html/public.html #main_l",function(){
	$(".main_l").find("dd").click(function(){
		$(this).parent().parent().find("dd").css("background","#fff")
		$(this).css("background","pink")
	});
})

// 修改密码功能
var reg1 = /^\w{6,20}$/;
$("#con_btn").click(function(){
	console.log( reg1.test( $("#psd").val() ) , $("#psd").val()==$("#cpsd").val() , $("#pre_psd").val()==welstr.psd )
	if( reg1.test( $("#psd").val() ) && $("#psd").val()==$("#cpsd").val() && $("#pre_psd").val()==welstr.psd ){
		//改现有cookie 的信息
		welstr.psd = $("#psd").val();
		setCookie( "user_now" , JSON.stringify( welstr ) );
		//改数据库信息
		$.ajax({
			type:"get",
			url:"http://localhost/php/youpinhui/project/php/user.php?state=changepsd&"+"uname="+welstr.user+"&"+"upsd="+$("#psd").val()+"&shoplist=",
			success:function(res){
				console.log(res);
				if( res==1 ){
					alert("修改成功!");
					location.href = "../html/index.html";
				}		
			}
		})
	}
})