
window.onload = function(){
	//公告 notice
	var
		oNotice = document.getElementById("notice_list"),
		oNoticeLI = oNotice.getElementsByTagName("li"),
		oNoticeUl = oNotice.getElementsByTagName("ul")[0],
		speed = 5,
		nTimer = null;	
	oNotice.style.display="block";
	//复制ul
	oNoticeUl.innerHTML += oNoticeUl.innerHTML ; 
	nTimer = setInterval(nMove,400);
	function nMove(){ 
		oNoticeUl.style.top=oNoticeUl.offsetTop-6+"px";
		if(oNoticeUl.offsetTop<-oNoticeUl.offsetHeight/2){
			oNoticeUl.style.top="0px";
		}
	}	
	nMove();
	oNotice.onmouseover = function(){
		clearInterval(nTimer);
	}	
	oNotice.onmouseout = function(){
		nTimer = setInterval(nMove,400);
	}	
	


//轮播图
function getStyle(element, attr) {
	return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element)[attr];
}
	var oBanner = document.getElementById('banner'),
	oDots = document.getElementById('dots'),
	oPages = document.getElementById('pages'),
	oPrev = document.getElementById('prev'),
	oNext = document.getElementById('next'),
		lis = oBanner.getElementsByTagName("li"),
		len = lis.length, // 轮播图片的数量
		currentIndex = 0, // 当前显示图片的索引
		nextIndex = 1; // 下一张显示图片的索引

	// 添加小圆点
	for(var i=0, len=lis.length; i<len; i++){
		var _a = document.createElement('a');
		oDots.appendChild(_a);
		if(i === 0)
			_a.className = 'curr';

		//为节点添加点击事件
		_a.index = i;
		_a.onmouseover = function(){
			clearInterval(timer);
			nextIndex = this.index;
			move();
			timer = setInterval(move,3000);
		}
	}

	//获取所有的小圆点
	var cricles = oDots.getElementsByTagName('a');
	//自动轮播切换
	var timer = setInterval(move, 3000);

	//左右键显示隐藏
	oBanner.onmouseover = function(){
		oPages.style.display = 'block';
		//$('#next').style.display = 'block';
		clearInterval(timer);
	}
	oBanner.onmouseout = function(){
		clearInterval(timer);
		oPages.style.display = 'none';
		//$('#next').style.display = 'none';
		timer = setInterval(move,3000);
	}

	//左右键翻页
	//上一页
	oPrev.onclick = function(){
		clearInterval(timer);
		nextIndex = currentIndex - 1;
		if(nextIndex<0){
			nextIndex = len - 1;
		}
		move();
		timer = setInterval(move,3000);
	}

	//下一页
	oNext.onclick = function(){
		clearInterval(timer);
		move();
		timer = setInterval(move,3000);
	}

	//切换显示
	function move(){
		fadeOut(lis[currentIndex], 1000); // 当前显示的图片淡出
		fadeIn(lis[nextIndex], 1000); // 下一张图片淡入

		//小圆点样式切换
		for(var i=0, len=cricles.length; i<len; i++){
			cricles[i].className = '';
		}
		cricles[nextIndex].className = 'curr';
		currentIndex = nextIndex;
		nextIndex++;
		if (nextIndex >= len)
			nextIndex = 0;
	}	


	// 线性运动：能够控制运动时间
	function animate(element, target, speed, fn) {
		speed = speed || 400;
		// 停止 element 元素上已有的运动
		clearInterval(element.timer);
		// start : 保存各属性的运动初始值; range : 各属性运动的区间值; startTime : 开始时间
		var start = {}, range = {}, startTime = +new Date();
		// 初始化start 与 range
		for (var attr in target) {
			start[attr] = parseInt(getStyle(element, attr)) || 0;
			range[attr] = target[attr] - start[attr];
		}

		// 运动
		element.timer = setInterval(function(){
			// 计算时间差（运动了多少时间了）
			var elapse = Math.min(+new Date() - startTime, speed);
			// 遍历 target 所有属性
			for (var attr in target) {

				var result = range[attr] / speed * elapse + start[attr]; // 计算运动值
				element.style[attr] = attr === "opacity" ? result : result + "px";
				if (attr === "opacity")
					element.style.filter = "alpha(opacity="+parseInt(result * 100)+")";
			}
			// 运动结束则停止计时
			if (elapse === speed){
				clearInterval(element.timer);
				fn && fn();
			}
		}, 10);
	}

	// 淡入
	function fadeIn(element, speed, fn) {
		animate(element, {"opacity":1}, speed, fn);
	}

	// 淡出
	function fadeOut(element, speed, fn) {
		animate(element, {"opacity":0}, speed, fn);
	}

}



$(function(){
	//每日精选轮播
	var index = 0,
		oTimer = null;

	//鼠标放在小图片上切换大图片
	$(".s_img li,.turn_box").on("mouseover", function(){
		var i = $(this).index();
		index = i;
		clearInterval(oTimer);
		$(this).addClass("curr").siblings("li").removeClass("curr");
		$(".turn_box").eq(i).stop(true).fadeIn("50").siblings(".turn_box").stop(true).fadeOut("50");
	});

	//鼠标滑入暂停，滑出继续
	$(".s_img li,.turn_box").hover(function(){
		var i = $(this).index();
		index = i;
		clearInterval(oTimer);
		$(this).addClass("curr").siblings("li").removeClass("curr");
		$(".turn_box").eq(i).stop(true).fadeIn("50").siblings(".turn_box").stop(true).fadeOut("50");
	}, function(){
		oTimer = setInterval(oMove,2000);
	});
	
	//自动播放
	oTimer = setInterval(oMove,2000);

	//上一页
	//下一页

	$("t_next").on("click", function(){
		clearInterval(oTimer);
		oTimer = setInterval(oMove,2000);
	});

	//运动函数
	function oMove(){
		$(".s_img li").eq(index).addClass("curr").siblings("li").removeClass("curr");
		$(".turn_box").eq(index).stop(true).fadeIn("50").siblings(".turn_box").stop(true).fadeOut("50");
		index++;
		if(index===$(".s_img li").size()){
			index = 0;
		}
	}

	//24小时直播预告
	var $lis = $(".live_list li"),
		len = $lis.size(),
		length = Math.floor(len/3),
		i_left = $(".l_box").width(),
		ul_len = i_left*length,
		liWidth = $lis.width();
		console.log(ul_len)
	$("#l_next").on("click", function(){
		var _left = $(".live_list").position().left;
		//var i_left = $(".l_box").width();
		//console.log(_left-i_left)
		//console.log("left" + _left)
		$(".live_list").animate({left:_left-i_left},500);
		if(_left-i_left < -ul_len){
			$(".live_list").animate({left:ul_len},500).stop(true);
		}

	});
	$("#l_prev").on("click", function(){
		var _left = $(".live_list").position().left;
		//var i_left = $(".l_box").width();
		//console.log(_left+i_left)
		$(".live_list").animate({left:_left+i_left},500);
		if(_left+i_left >= 0){
			$(".live_list").animate({left:0},500).stop(true);
		}
	});

});

