//定义一个函数 功能是根据id查找页面元素
function $id( id ){
	return document.getElementById( id );
}

//封装一个取整值范围
function rand(min,max){
		return Math.round(Math.random()*(max-min)+min); 
	}

//创建元素
//ele 元素名
function create(ele){
	return document.createElement(ele);
}

//获取任意区间的随机整数
function rand( min , max ){
    return Math.round( Math.random()*(max-min) + min );
}

//时间差(秒)
function timerDiff(start,end){
		return Math.abs(start.getTime()-end.getTime())/1000;
	}

//随机获取六位十六进制颜色值 （不需传参）
function getColor(){
	var str = "0123456789abcdef";
	var color = "#";
	for( var i = 1 ; i <= 6 ; i++ ){
		color += str.charAt( rand(0,15) );
	}
	return color;
}

//自定义日期时间格式
//sign 连接符的样式
//now 获取的系统时间
function dateToString(now,sign){
	//默认日期的间隔符为  -  如果用户传递的是/  就使用/  .  如果用户不传递任何参数 默认是-
	sign = sign || "-";
	var y = now.getFullYear();
	var m = toTwo(  now.getMonth()+ 1  ) ;
	var d = toTwo(  now.getDate() );
	var h = toTwo(  now.getHours() );
	var _m = toTwo(  now.getMinutes() );
	var s = toTwo( now.getSeconds() ) ;
	var str = y + sign + m + sign + d + " " + h + ":" + _m + ":" + s;
	return str;
}
//判断得到的结果是否小于10 如果小于10，前面拼接0，上边已调用
function toTwo(val){
	return val < 10 ? "0"+val : val;
}

//验证码 ： 字母和数字组成
function yzm(){
	//小写字母   大写字母   数字
	//48--122 随机获取一个code值  判断编码值如果在 58--64   91--96 两个区间，就重新抽取
	//如果不在上面的两个区间内，就将code转成字符， 拼接到字符串中
	var str = "";//拼接6位的验证码
	for( var i = 1 ; i <= 6 ; i++ ){
		var code = rand( 48 , 122 );
		if( code >= 58&&code <= 64 || code >= 91 && code <= 96 ){
			//就重新抽一次
			i--;
		}else{
			var ch = String.fromCharCode( code );
			str += ch;
		}
	}
	return str;
}

//碰撞函数
//d1 d2获取的两个盒子
function pz(d1,d2){
	R1 = d1.offsetWidth+d1.offsetLeft;
	L1 = d1.offsetLeft;
	T1 = d1.offsetTop;
	B1 = d1.offsetHeight + d1.offsetTop;
	
	R2 = d2.offsetWidth+d2.offsetLeft;
	L2 = d2.offsetLeft;
	T2 = d2.offsetTop;
	B2 = d2.offsetHeight + d2.offsetTop;
	
	//如果碰不上 返回false 
	if( R1 < L2 || B1 < T2 || T1 > B2 || L1 > R2 ){
		return false;
	}else{
		return true;
	}
}
//存 cookie  document.cookie = "键=值"  时间
function setCookie(name,val,day){
	var d = new Date();
	d.setDate(d.getDate() + day);
	document.cookie = name + "=" + val + ";expires=" +  d;
}

//取cookie
function getCookie(name){
	
	var str = document.cookie;//uname=张三; upwd=123456;
	var arr = str.split("; "); // [uname=张三，upwd=123456];
	for(var i = 0; i < arr.length; i++){
		var cur = arr[i].split("=");
		if(cur[0] == name){
			return  cur[1];
		}
	}
	
	return "";
	
}

// 删除cookie  设置cookie的时候给个过期时间
function removeCookie(name){   
	setCookie(name,"",-1);
}

//通过ajax获取服务器数据
//url 请求的数据地址    
//fnwin 成功后 的回调函数      回调函数的参数就是请求的数据的值，用请求的数据的值去做另一件事。
//fnFaild  失败后的回调函数   
function ajax(url,fnWin,fnFaild){
	//1 买手机---------创建XMLHttpRequest对象
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	//2. 拨号-------与服务器建立连接
	xhr.open('GET',url,true);
	//3. 说话 ----- 发送请求
	xhr.send();
	//4. 听并等待接收 --- 利用监听事件，将请求的数据通过回调函数返回
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				if(typeof fnWin === 'function'){ //找到了数据要去判断传的是不是一个函数,是就去执行成功后要去做什么的函数
					fnWin(xhr.responseText);
				}
			}else{
				if(typeof fnFaild === 'function'){  // 没找到也要去判断传的是不是一个函数，是就调用不成功要去做什么的函数
					fnFaild();
				}
			}
		}
	}
}
var ajax = {};
//get
ajax.get = function(url,fn){  //get方式  传参的参数 在URL ？后面
	let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	xhr.open('GET',url,true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			if(typeof fn === 'function'){
				fn(xhr.responseText);
			}
		}
	}
}
//post
ajax.post = function(url,data,fn){   //post方式 单独的写需要向服务器传的参数   data变量就是需要传的参数
	let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	xhr.open('POST',url,true);
	//设置http协议的请求头（必须放在send前面）
	xhr.setRequestHeader('content-type','application/x-www-form-urlencoded;charset=utf-8');
	xhr.send(data);
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			if(typeof fn === 'function'){
				fn(xhr.responseText);
			}
		}
	}
}