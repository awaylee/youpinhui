$(function(){
	//确认订单信息

	//收货人
	$(".consignee input").blur(function(){
		if($(this).val() === ""){
			$(".d_name").show();
		} else {
			$(".d_name").hide();
		}
	});

	//详细地址
	$(".address input").blur(function(){
		if($(this).val() === ""){
			$(".d_address").show();
		} else {
			$(".d_address").hide();
		}
	});

	//手机号码
	$(".tellphone input").blur(function(){
		var tel = $(this).val();
		if(tel === ""){
			$(".d_tellphone").show();
		} else if(!(/^1[3|5|7|8|9|4]\d{9}$/.test(tel))){
				$(".d_tellphone").show();
			} else {
				$(".d_tellphone").hide()
			}
	});


	//选择支付方式
	$("#p_w_i").on("click", function(){
		$(".online_way").show();
	});
	$("#p_w_o").on("click", function(){
		$(".online_way").hide();
	});

	//使用优惠券
	var btn = false;
	$("#ticket_1").click(function(){
		if(!btn){
			$(".ticket_con").show();
			btn = true;
		} else {
			$(".ticket_con").hide();
			btn = false;
		}
		return btn;
	});
	$("#p_ticket").click(function(){
		if(!btn){
			$(".integral_con").show();
			btn = true;
		} else {
			$(".integral_con").hide();
			btn = false;
		}
		return btn;
	});

	//选择优惠码
	$(".ticket_nav>li").eq(0).on("click", function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".ticket_able").show();
		$(".unusable").hide();
	});
	$(".ticket_nav>li").eq(1).on("click", function(){
		$(this).addClass("active").siblings().removeClass("active");
		$(".ticket_able").hide();
		$(".unusable").show();
	});

	//使用积分
	$("#i_use").on("click", function(){
		var currscore = $("#curr_s").text();
		var usescore = $("#use_s").val();
		console.log(currscore,usescore);
		if(currscore<usescore){
			$(".integral_tip").show();
		}
	});

	//其他信息
	$("#fp").on("change", function(){
		if($(this).prop('checked')){
			$(".invoice_box").show();
			$("#dz").click(function(){
				$(".i_fp1").hide();
				$(".i_fp2").show();
			});
			$("#zz").click(function(){
				$(".i_fp1").show();
				$(".i_fp2").hide();
				$("#dw").click(function(){
					$("#dw_name").show();
				});
				$("#gr").click(function(){
					$("#dw_name").hide();
				});
			});	
		} else{
			$(".invoice_box").hide();
		}		
	});

	//收货地址（三级联动菜单）
	$(function(){
	// 后台获取地区数据
	var $province = $('#provice');
	var $city = $("#city");
	var $locality = $("#addr");
	$.get("../mock/more-address.json", function ( data ) {
		//console.log(data.length);
		//向省级地区添加元素
		for ( var i = 0, len = data.length; i < len; i++) {
			var op1=$("<option></option>");
			op1.html(data[i].name);
			op1.appendTo($province);
		}
		var provinceIndex = 0;
		//console.log($province.find('option').length);
		//根据省所在的索引确认城市
		$province.on('change', function () {
			$(this).children(".chose").remove();
			provinceIndex = $(this).children('option:selected').index();
			$("#city").children().remove();
			var se1=$('<option >选择市</option>')
			se1.addClass("chose");
			 se1.appendTo($city);
			for ( var j = 0, len2 = data[provinceIndex].city.length; j < len2; j++) {
				var op2=$("<option></option>");
				op2.html(data[provinceIndex].city[j].name);
			    op2.appendTo($city);
			}
		})
            //根据城市所在的索引找出对应地区
			var cityIndex = 0;
	      $city.on('change', function () {
	      	    $(this).children(".chose").remove();
				cityIndex = $(this).children('option:selected').index();
				$locality.children().remove();
				var se1=$('<option >选择县/区</option>')
			    se1.addClass("chose");
				
		   for ( var k = 0, len3 = data[provinceIndex].city[cityIndex].area.length; k < len3; k++)
		     {
				var op3=$("<option></option>");
				op3.html(data[provinceIndex].city[cityIndex].area[k]);
				
			    op3.appendTo($locality);
				}
			});


		});

	}, 'json');




});



