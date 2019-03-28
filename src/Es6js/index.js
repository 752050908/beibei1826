var $navTxt = $("#navTxt");
var $navUl = $("#navUl");
//搜索框请求百度数据，回调函数接收百度数据
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
	//鼠标划过请求回来的数据，背景色改变
	$("#navUl li").hover(function  () {
		$(this).css("background","#ccc");
	},function  () {
		$(this).css("background","#fff");
	})
	//点击吧数据放入搜索框，并隐藏下拉列表
	$("#navUl li").click(function  () {
		$navTxt.val($(this).html());
		$navUl.css("display","none");
	})

}
//请求百度数据键盘抬起，触发事件，动态创建script的标签
$navTxt.keyup(function  () {
	$navUl.html("");
	$navUl.css("display","block");
	var sc = $("<script>");
	sc.attr("src","https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+$(this).val()+"&cb=fn")//回调函数
	$("body").append(sc);
	if ($navTxt.val()=="") {
		$navUl.css("display","none");
	}
})
//搜索框请求百度数据后点击跳转百度
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
//副导航条的划过效果
$(".min-nav-con ul li a").hover(function  () {
	$(this).css({'border-color':'red',"color":"red"})
},function  () {
	$(this).css({'border-color':'#fff',"color":"#c0c0c0"})
})
//大图区数据 请求
var bigCon = $.ajax({
	type:"get",
	url:"./src/json/indexBigImg.json",
	async:true
});
	bigCon.done(function  (json) {
		var data = json.bigImg;
		var aa = "";
		for (var i = 0,len = data.length;i<len;i++) {
			var dat = data[i]
			aa+=`<a href="">
						<img src="src/image/${dat.src}" alt="" />
						<p>${dat.name}</p>
						<p class="p2">${dat.price}</p>
					</a>`
		}
		$(".bigimg-r").append(aa);
	})	
//内容区左侧的图片数据请求
var load =function  () {
		var contentBig = $.ajax({
		type:"get",
		url:"./src/json/indexConBigImg.json",
		async:true
		});
	contentBig.done(function  (json) {
		var jsonS = json.conBigImg
		//console.log(jsonS)
		var aaa = "";
		for (var i=0,len = jsonS.length;i<len;i++) {
			var data = jsonS[i];
			aaa += `<a class="con-r-l-aa" href="#">
							<img src="src/image/${data.src}" alt="" />
							<p class="con-l-p">${data.name}</p>
							<div class="con-l-div">
								<span class="div-span1">${data.price}<sub>.90</sub></span>&nbsp;
								<span class="div-span2">${data.price1}</span>
								<span class="div-span3">${data.price2}</span>
							</div>
					</a>`
		};
		//console.log(aaa)
		$(".bigImg-con-l").append(aaa);
	})
}
load()


// 内容区右侧切换栏数据请求

var conListBox= $.ajax({
	type:"get",
	url:"./src/json/indexConRight.json",
	async:true
});
conListBox.done(function(json) {
	for(var attr in json){//for in 取json的所有键
		var ulBox = ""
		//console.log(attr)
		ulBox +=`<ul class="con-lists-con-ul" data-name = "${attr}"></ul>`
		$(".con-lists-ul-box").append(ulBox);
		//console.log(ulBox)
	}
	$(".con-lists-con-ul").each(function  () {
		var uname = $(this).data("name");
		//console.log(uname)
			var liBox = "";
		for (var i =0,len = json[uname].length;i<len;i++) {//每个键对象
			var data = json[uname][i];
			//console.log(data)
			liBox +=`<li class="con-lists-con-ul-li">
										<a class="con-ul-li-a"  href="">
											<img src="src/image/${data.src}" alt="" />
											<div class="con-ul-li-a-r">
												<p class="li-a-r-p">${data.name}</p>
												<span>${data.price}</span>&nbsp;
												<span>${data.price1}</span>
											</div>
										</a>
									</li>`
		}
		$(this).append(liBox);
	})
var $ulLists = $(".con-lists-top-ul li");
var	$ULS = $(".con-lists-ul-box ul");
$ULS.first().css("display","block");
	$ulLists.hover(function  () {
		var index = $(this).index();
		$(this).css({"background":"#fff","border-bottom":"none"})
		$ULS.eq(index).show().siblings().hide()
	},function  () {
		$(this).css({"background":"#ECECEC","border-bottom":"1px solid #ccc"})
	})
})

//内容区下部点击加载数据
$("#clickLoad").click(function  () {
	load()
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

//吸顶效果 
//$(window).scroll(function  () {
//	var aaa = $(window).scrollTop()
//	if (aaa>160) {
//		
//	}
//})
 $(window).on('scroll',function(){
      if($(window).scrollTop() > 160){
    		$("#ceil").css("display","block")
  		 	$("#ceil").animate({top:0},500)
    	}else{
    		$("#ceil").css("display","none")
    	}
    }
)

