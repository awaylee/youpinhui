$(function(){

	/****************** 放大镜效果********************/
	var popWidth = $(".pop").width(),
		popHeight = $(".pop").height(),
		middleWidth = $(".middle").width(),
		middleHeight = $(".middle").height(),
		bigWidth = $(".big").width(),
		bigHeight = $(".big").height(),
		rateX = bigWidth / popWidth,
		rateY = bigHeight / popHeight;
	// 鼠标移入 .middle 盒子范围，显示.pop 的遮罩 和.big 的大图，移除则隐藏
	$(".middle").hover(function(){
		$(".pop,.big").show()
	}, function(){
		$(".pop,.big").hide();
	}).on("mousemove", function(event){
		// 设置.pop 遮罩在文档中的绝对定位位置，将鼠标指针放置在遮罩居中的位置上
		$(".pop").offset({
			top:event.pageY - popHeight/2,
			left:event.pageX - popWidth/2
		});
		// 获取.pop 相对有定位的父元素 .middle  的相对定位位置
		var position = $(".pop").position(),
			_top = position.top,
			_left = position.left;
		//判断_top,_left的取值
		if(_top < 0){
			_top = 0;
		} else if(_top > middleHeight - popHeight){
			_top = middleHeight - popHeight;
		}
		if(_left < 0){
			_left = 0;
		} else if(_left > middleWidth - popWidth){
			_left = middleWidth - popWidth;
		}

		$(".pop").css({
			top:_top,
			left:_left
		});

		//设置放大镜 .big 框中的 img 定位位置
		$(".big img").css({
			top: -rateY * _top,
			left: -rateX * _left
		});

		$(".small li").on("click", function(){
			$(this).addClass("curr").siblings().removeClass("curr");
			var _src = $(this).children("img").attr("src");
			$(".middle img").attr ("src", _src);
			$(".big img").attr("src", _src);
		});

	});


	//收货地址
	$(".p_buy .text").on("mouseover", function(){
		$(".cities").show();
		$(".mt li").on("click", function(){
			var index = $(this).index();
			$(this).addClass("curr").siblings("li").removeClass("curr");
			$(".city_ul li").eq(index).addClass("active").siblings("li").removeClass("active");
			
		});
		
	});

	//关闭按钮
	$(".c_close").on("click", function(){
		$(".cities").hide();
	});

	$("#province span").on("click", function(){
		var Sindex = $(this).index();
		//console.log(Sindex)
		$(this).addClass("curr").siblings("span").removeClass("curr");
		$(".mt2").addClass("curr").siblings("li").removeClass("curr");
		$("#city").addClass("active").siblings("li").removeClass("active").end().children("p").eq(Sindex).show().siblings("p").hide();
		$(".mt1").text($(this).text());
		$(".text i").text($(this).text());

	});

	$("#city span").on("click", function(){
			var Cindex = $(this).index();
			console.log(Cindex)
			$(this).addClass("curr").siblings("span").removeClass("curr");
			$(".mt3").addClass("curr").siblings("li").removeClass("curr");
			$("#area").addClass("active").siblings("li").removeClass("active").end().children("p").eq(Cindex).show().siblings("p").hide();
			$(".mt2").text($(this).text());
			$(".text i").text($(".text i").text()+$(this).text());
	});

	$("#area span").on("click", function(){
		$(this).addClass("curr").siblings("span").removeClass("curr");
		$(".cities").hide();
		$(".mt3").text($(this).text());
		$(".text i").text($(".text i").text()+$(this).text());
	});
	

	//商品详情
	$(".tab_head li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
	});

	//数量加减
	var gnum = 1;
	$("#jian").click(function(){
		gnum--;
		if(gnum<=0){
			gnum = 1;
		}
		$("#g_num").val(gnum);
	});
	$("#jia").click(function(){
		gnum++;
		$("#g_num").val(gnum);
	});


	/***************************加入购物车存入cookie************************************/
	$(".add_cart").click(function(){
		//获取商品的id，name，price
		var $div = $(".g_form");
		var product = {
			"id": $(".id_num").html(),
			"picture": $(".picture").val(),
			"title": $(".h_title").text(),
			"price": $(".h_price").text(),
			"amount": 1
		};
		console.log(product);
		//将创建的商品对象保存到数组中去，再保存取回
		//先从cookie中读取数组
		$.cookie.json = true; //cookie中存储的value值是对象
		//先从cookie中读取数组
		var products = $.cookie("products");
		//判断是否读取到数组
		//console.log ($.cookie("products"));
		if(!products){ //未读取到，说明是第一次添加购物车，则创建数组对象
			products = [];
		}
		
		//判断数组中是否存在当前选购的商品
		var index = findIndex(product.id, products);
		if(index === -1){  
			products.push(product);
		} else{
			products[index].amount++;
		}
		
		// 将当前次添加到购物车的商品保存到数组中
		//products.push(product);
		console.log(products);
		// 将数组保存回cookie
		$.cookie("products", products, {expires:7, path:"/"});
	});
		//找出数组中指定商品编号的元素位置
		function findIndex(id, products){
			for(var i in products){
				if(products[i].id === id){
					return i;
				}					
			}
			return -1;
		}

	
	//吸顶效果
	var tab_head = $(".tab_head").offset().top;
	$(window).on("scroll", function(){
		var scrollTop = $(this).scrollTop();
		if(scrollTop < tab_head){
			$(".tab_head").css({position:"relative"});
		} else{
			$(".tab_head").css({position:"fixed",top:0});
		}
	});

	$(".tab_head li").on("click", function(){
			var topIndex = $(this).index();
		$(window).scrollTop($(".detail_title").eq(topIndex).offset().top);
	});

	$(window).on("scroll", function(){
		var scrollTop = $(window).scrollTop();
		console.log($(".detail_top").eq(2).offset().top)
		if(scrollTop > $(".detail_top").eq(0).offset().top){
				$(".tab_head li").eq(0).addClass("active").siblings("li").removeClass("active");
			} 
			if(scrollTop > $(".detail_top").eq(1).offset().top){
				$(".tab_head li").eq(1).addClass("active").siblings("li").removeClass("active");
			};
			if(scrollTop > $(".detail_top").eq(2).offset().top){
				$(".tab_head li").eq(2).addClass("active").siblings("li").removeClass("active");
			};
	});
});
