var $navTxt = $("#navTxt");
var $navUl = $("#navUl");
//搜索框回调函数接收百度数据
function fn (data) {
 //console.log(data)
	for (let i = 0,len = data.s.length;i<len;i++) {
		let $navLi  = $("<li>")
		$navLi.css({"overflow":"hidden","text-overflow":"ellipsis","white-space":"nowrap","width":"213px"})
		$navLi.html(data.s[i]);
		$navUl.append($navLi);
	}
	/*$("#navUl li").mouseenter(function(){
	$(this).css("background","#ccc");
	})*/
	$("#navUl li").hover(function  () {
		$(this).css("background","#ccc");
	},function  () {
		$(this).css("background","#fff");
	})
	$("#navUl li").click(function  () {
		$navTxt.val($(this).html());
		$navUl.css("display","none");
	})

}
$navTxt.keyup(function  () {
	$navUl.html("");
	$navUl.css("display","block");
	var sc = $("<script>");
	sc.attr("src","https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+$(this).val()+"&cb=fn")
	$("body").append(sc);
	if ($navTxt.val()=="") {
		$navUl.css("display","none");
	}
})
$(".con-r span").click(function  () {
	if ($navTxt.val() != "") {
		window.location.href = "http://www.baidu.com";
	}
})
//nav 下拉菜单数据请求及处理
var $hot = $.ajax({
	type:"get",
	url:"./src/json/indexNav.json",
	async:true
});
$hot.done(function (json) {
	//console.log(json);
	var title =""
	for(var key in json){
		//console.log(key)
		
		title+=`<ul class = "${key} hid t" data-name = "${key}"></ul>`;
	}
		$(".con-r-down").append(title);

	$(".hid").each(function  () {
		var uname = $(this).data("name");
		var tit = "";
		//console.log(json[uname])
		for (var i=0;i<json[uname].length;i++) {
			var data = json[uname][i];
			tit+=`<li>
					<a href="" id="li-a">
						<img src="./src/image/${data.src}" alt="" />
						<label>${data.name}</label>
					</a>
				</li>`
		}
		$(this).html(tit);
		$(this).addClass("down-ul-r");
	})
	
})
//划过切换nav在售分类
$(".down-ul-l li").mouseenter(function  () {
	var index=$(this).index();
	$(this).css("color","red").siblings().css("color","#000");
	$(".hid").eq(index).show().siblings(".t").hide()
})
$(".con-r-l-a").mouseenter(function  () {
	$(".con-r-down").show()
})
$(".con-r-l").mouseleave(function  () {
	$(".con-r-down").hide();
})

//放大镜 左侧图片区
$(function() {
	
	var magnifierConfig = {
		magnifier : "#magnifier1",//最外层的大容器
		width : 458,//承载容器宽
		height : 500,//承载容器高
		moveWidth : null,//如果设置了移动盒子的宽度，则不计算缩放比例
		zoom : 5//缩放比例
	};

	var _magnifier = magnifier(magnifierConfig);

	/*magnifier的内置函数调用*/
	/*
		//设置magnifier函数的index属性
		_magnifier.setIndex(1);

		//重新载入主图,根据magnifier函数的index属性
		_magnifier.eqImg();
	*/
});
//详情页内容数据请求 
var $paga = $.ajax({
	type:"get",
	url:"./src/json/pagaminmin.json",
	async:true
});
//让商品下列表显示出来
$paga.done(function (json) {
	//console.log(json.length)
	var tit = "";
	for (var i = 0,len = json.length;i<len;i++) {
		var data = json[i];
		$(".t1").html(data.public);
		tit +=`<li id ="${data.id}">
				<img src="src/image/${data.src}" alt="" />
				<span>${data.name}</span>
			</li>` 
	}
	$(".con-f-box2-r").append(tit);//动态添加商品列表
	//鼠标点击时的数据变化
	$(".con-f-box2-r li").click(function  () {
		var index = $(this).index();
		//鼠标点击记录当前对象下标的下标，并添加样式类
		$(this).addClass("public-li").siblings().removeClass("public-li");
//通过下标找json内的数据 每一个对象
		$(".t1").html(json[index].public);
		$(".content-r-con-t2 .t2").html(json[index].public1);
		$(".content-r-con-t3 strong").html(json[index].public3);
		$(".content-r-con-t4 strong").html(json[index].public2);
		
//点击每一个商品时，就是选中了，把商品价格和id付给加入购物车按钮
		$(".box4-a-span").html(json[index].public).attr("id",json[index].id);
	})
//鼠标划入时的变化在css内hover了 
	/*$(".con-f-box2-r li").mouseover(function  () {
		$(this).css({"border":"2px solid red","margin":"-1px 4px 4px -1px"})
		.siblings().css({"border":"1px solid #ccc","margin":"0px 5px 5px 0px"});
	})*/
})



//详情页的倒计时
$(function(){ 
    show_time();
}); 
function show_time(){ 
    var time_start = new Date().getTime(); //设定当前时间
    var time_end =  new Date("2019/04/05 00:00:00").getTime(); //设定目标时间
    // 计算时间差 
    var time_distance = time_end - time_start; 
    // 天
    var int_day = Math.floor(time_distance/86400000) 
    time_distance -= int_day * 86400000; 
    // 时
    var int_hour = Math.floor(time_distance/3600000) 
    time_distance -= int_hour * 3600000; 
    // 分
    var int_minute = Math.floor(time_distance/60000) 
    time_distance -= int_minute * 60000; 
    // 秒 
    var int_second = Math.floor(time_distance/1000) 
    // 时分秒为单数时、前面加零 
    if(int_day < 10){ 
        int_day = "0" + int_day; 
    } 
    if(int_hour < 10){ 
        int_hour = "0" + int_hour; 
    } 
    if(int_minute < 10){ 
        int_minute = "0" + int_minute; 
    } 
    if(int_second < 10){
        int_second = "0" + int_second; 
    } 
    // 显示时间 
    $(".box5-p-h1").html(int_day); 
    $(".box5-p-h2").html(int_hour); 
    $(".box5-p-h3").html(int_minute); 
    $(".box5-p-h4").html(int_second); 
    // 设置定时器
    setTimeout("show_time()",1000); 
}


//详情页购买数量加减操作
var $number = $(".box3-box-span2").html();
//console.log($number)
$(".box3-box-span3").click(function  () {
	 number= ++$number;
	//console.log(number);
	$(".box3-box-span2").html(number)
});
$(".box3-box-span1").click(function  () {
	if ($(".box3-box-span2").html() == 1) {
		number = 1;
	}else{number= --$number;
	//console.log(number);
	$(".box3-box-span2").html(number)}
})



//固定定位的导航条 划过显示
$(".fixed-boxA").hover(function  () {
	$(this).find("span").css("color","#fff")
	$(this).css("background","red").children(".fixed-boxA2").show()
},function  () {
	$(this).find("span").css("color","red")
	$(this).siblings().end().css("background","#fff").children(".fixed-boxA2").hide();
})
//返回顶部
$(".D2").click(function  () {
	$("html,body").animate({"scrollTop":"0px"},3000);
	return false
})
//点击加入购物车获取商品id

//给加入购物车按钮添加点击事件
//定义个变量接收总钱数
		var money=0;
$(".con-f-box4-a").click(function(e){
	//获取商品的id（用来区分不同的商品）
	var goodId = $(".con-f-box4-a .box4-a-span").attr("id");
	$paga.done(function  (json) {
	//console.log(json)
		var tit = "";
		for (var i = 0,len = json.length;i<len;i++) {
			var data = json[i];
			if(data.id == goodId){
				tit +=`<li class="p1-li">
							<img src="src/image/${data.src}" alt="" />
							<strong class="p1-li-span1">${data.name}</strong>￥
							<strong class="p1-li-span2">${data.public}</strong>*
							<strong class="p1-li-span3">${$(".box3-box-span2").html()}</strong>
					</li>`;
//商品单价乘以数量相加赋值给购物车的总计
					money += data.public*$(".box3-box-span2").html()
					$("#span1 i").html(money.toFixed(2))
					console.log(money)
//$("#span1").html(${data.public});
				var goodnum=parseInt($(".fixed-boxA1 em").html()) + parseInt($(".box3-box-span2").html());
				$(".fixed-boxA1 em").html(goodnum);
//做一个飞入购物车的效果
				var cloneImg = $("<div>").css({"width":50,"height":50,"background":"red","background":"url(./src/image/minmin.jpg)"});
				cloneImg.fly({
					start : {
						top : e.clientY,
						left : e.clientX
					},
					end :{
						top : 420,
						left : $("#fixed-box").offset().left,
						width:0,
						height:0
					},
					autoPlay : true,
					onEnd : function(){
							$("#fixed-box").val(function(index,v){
							});
					cloneImg.remove();
					}
				})	
			}
		//找到购物车里的所有商品 li  取出个数与价格  相加
		}
	$(".p1").append(tit);
	})
})
	
	
	//var goodName = $(this).siblings('span').eq(0).html();
	//获取商品的价格
	//var goodPrice = parseFloat($(this).siblings("span").eq(1).html());
	//获取商品的图片src
	//var goodSrc = $(this).siblings("img").attr("src");
	//document.cookie = "key=value"
	//存到购物车中去，商品信息统一可以放在cookie当中
	//购物车中是否有商品？
	//购物车中是否加过同一个商品？
	//"sp1,香蕉,30,1,src1:sp2,苹果,40,2,src2:sp3,梨,50,3,str3"
	/*设计以下结构的对象来处理商品信息
	 * 以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
	 * {
	 * 	sp1 : {
	 * 		name : "香蕉",
	 *      price : 30,
	 *      num : 1,
	 *      src : "img/1.jpg"
	 *  },
	 * sp2 :{
	 * 	    name :"苹果",
	 *      price : 40,
	 *      num:2,
	 *      src : "img/2.jpg"
	 *  },
	 * sp3{
	 * 	    name : "梨"，
	 *      price : 50,
	 *      num : 3,
	 *      src : "img/3.jpg"
	 *  }
	 * }
	 */
	//获取cookie中的信息
	//如果cookie中没有信息会返回一个undefined ,我所须是一个字符串类型的数据，所以将它转成一个“”空字符串。保持数据类型一致。
	//var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
	//将字符串转成对象
	//var cartObj = convertCartStrToObj(cartStr);
	//判断该商品是否已经在购物车中存在
	/*if(goodId in cartObj){
		//如果已存在，那么该商品的数量加1
		cartObj[goodId].num += 1;
	}else{
		//如果不存在，那么将新商品的信息存入
		cartObj[goodId] = {
			name : goodName,
			price : goodPrice,
			num : 1,
			src : goodSrc
		};
	}
	
	//将新的购物车信息存回cookie
	//将对象转为字符串
	cartStr = convertObjToCartStr(cartObj);
	//存入cookie
	//document.cookie = "key=value"
	$.cookie("cart",cartStr,{expires : 7,path:"/"});
	
})*/