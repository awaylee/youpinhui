$(function(){
	//从cookie中获取商品详情
	$.cookie.json = true;
	//读取购物车中的商品
	var products = $.cookie("products");

	//判断购物车是否为空
	if(!products || products.length ===0){
		 alert("购物车为空，跳转到商品页面");
		 window.location.href = "goods.html";
	} else { //有商品信息
		console.log(products);
		//遍历数组中每个元素
		$.each(products, function(index,element){
			//console.log(element.id, element.name, element.price, element.amount)
			console.log(index,element);
			//将当前遍历到的对象各属性展示到页面中
		$(".shoppingcon").clone(true).appendTo("#car_body").data("product", element).find(".c_meg").html('<dl><dt><a href="##"><img src="../images/3 (6).jpg" alt=""></a></dt><dd><p>'+ element.title +'</p></dd></dl>').next(".c_price").html('<p>&yen;<span>'+element.price+'</span></p>').next(".c_amount").html('<p class="num"><span class="g_num"><a class="jian" href="##">-</a><input type="text" value="'+element.amount+'"><a class="jia" href="##">+</a></span></p>').next(".c_subtotal").html('<p>&yen;<span>'+element.price*element.amount+'</span></p>').next(".c_operation").html('<a href="##"></a>').next(".c_select").html('<input type="checkbox">');		
		});
	}

	//删除购物车中的商品
	$(".c_operation a").click(function(){
		var $shoppingcon = $(this).parents(".shoppingcon");
		//获取到缓存在行上的商品数据
		var product = $shoppingcon.data("product");
		//找出当前删除的商品在数组中是第几个元素
		var index = $.inArray(product, products);
		//从数组中删除该索引处的元素
		products.splice(index, 1);
		//将删除元素后的数组保存回cookie中
		$.cookie("products", products, {expires:7, path:"/"});

		//从页面删除行
		$shoppingcon.remove();
	});


		//数量加减
		$(".jian").click(function(){
			var gnum = $(".g_num input").val();
			gnum--;
			if(gnum<=0){
				gnum = 1;
			}
			$(".g_num input").val(gnum);
			$(".c_subtotal span").val()	
		});
		$(".jia").click(function(){
			var gnum = $(".g_num input").val();
			gnum++; 
			$(".g_num input").val(gnum);
		});

		//全选
		$("#ck_all,#c_ck").on("click", function(){
			$(":checkbox").prop("checked",$(this).prop("checked"));
		});

		//结算
		$(".c_select input").on("change", function(){
			if($(this).prop('checked')){
				$(".c_all").text($(".g_num input").val());
				$(".c_per").text($(".c_subtotal span").text());
				$(".c_pay").text($(".c_subtotal span").text() - $(".c_you").text());
				console.log($(".c_subtotal span").text())
				console.log($(".c_subtotal span").text()-$(".c_you").text())
			} else {
				$(".c_all").text(0);
				$(".c_per").text(0);
				$(".c_pay").text(0);
			}
			
		});
		

	
	
});