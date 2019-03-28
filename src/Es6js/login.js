//注册页面直接登录
$("#toLogin").click(function  () {
	location.href="register.html"
})

//注册页面密码框密码的显示隐藏
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
//获取注册页面短信验证码	随机生成六位数字
$("#getVCode").click(function  () {
	var  randomNum = "";
	for (i=0;i<6;i++) {
		randomNum +=Math.floor(Math.random()*10) 
	}
	$("#regist_vcode").val(randomNum)
})
//正则对注册信息手机号进行验证
var arr = [0,0];
$("#regist_account").blur(function  () {
	var  $val= $("#regist_account").val();
	var $regular = /^[1][3,5,7,8][0-9]{9}$/;
	if ($regular.test($val)) {
		$("#regist_account").css("color","#1CB841")
		arr[0]=1;
	}else{
		if ($("#regist_account").val() == "") {
			$("#regist_account").attr("placeholder","你的手机号")
			arr[0]=0;
		}else{
			$("#regist_account").css("color","#A93D17")
			$("#regist_account").val("手机号错误")
			arr[0]=2;
		}
	}
})
//对注册信息   密码进行验证
$("#regist_password1").blur(function  () {
	var  $val= $("#regist_password1").val();
	var $regular = /^(\w){8,16}$/;
	if ($regular.test($val)) {
		$("#regist_password1").css("color","#1CB841")
		arr[1]=1;
	}else{
		if ($("#regist_password1").val() == "") {
			$("#regist_password1").attr("placeholder","你的密码")
			arr[1]=0;
		}else{
			$("#regist_password1").css("color","#A93D17")
			$("#regist_password1").val("")
			$("#regist_password1").attr("placeholder","密码格式不正确")
			arr[1]=2;
		}
	}
})

//注册按钮点击验证注册信息完整正确，并存cookie
$("#regist_btn").click(function  () {
	var num = arr[0]*arr[1];
	var gk = 0;
	if(num == 0){
		alert("输入不全");
	}else{
		if(num == 1){
			gk =1;
			alert("注册成功")
			var name=$("#regist_account").val();
 			var pwd=$("#regist_password1").val();
			 document.cookie = "y=" + name;
			 document.cookie = "m=" + pwd;
			 window.location.href="register.html";
		}else{
			alert("你输入不合法")
		}
	}
	/*if(gk){
		var json = {
			uname:name,
			upwd:pwd
		}
		var inf = JSON.stringify(json);
		setCookie("infor",inf,7);
	}*/
})
