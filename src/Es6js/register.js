//登录页面密码框密码的显示隐藏	
var $switch = "";
$("#eye").click(function  () {
	if ($switch) {
		$("#eye").css("background-position","0px -65px");
		$("#regist_password1").attr("type","password");
		$switch = 0;
	}else{
		$("#eye").css("background-position","0px -80px")
		$("#regist_password1").attr("type","text");
		$switch = 1;
	}
})

//登录页面点击跳转注册页面
$("#toLogin").click(function  () {
	location.href="login.html";
})
//获取cookie 处理cookie
var str = document.cookie;
//console.log( str )
var str1 = str.split("; ");//分割 装换成数组，就像分号转逗号
console.log( str1 )
for( var i = 0 ; i < str1.length;i++ ){
	var res = str1[i];
	//console.log( res )
	var res1 = res.split("=");//等号分割转数组，
	//console.log( res1 )
	if( "y" == res1[0] ){
		var a =  res1[1];
		console.log( a )
	}
	if( "m" == res1[0] ){
		var b = res1[1]
		//console.log( b )
	}
}
$("#regist_btn").click(function  () {
	var name = $("#regist_account").val();
var pwd = $("#regist_password1").val()
	if( a ==  name && b == pwd){
	alert('登录成功')
	location.href="index.html";
	}else{
	alert("登录失败")
}
})
