$(function(){

	//选择注册方式
	$(".regnav li").click(function(){
		$(this).addClass("on").siblings().removeClass("on");
	});
	$(".regnav li").eq(0).on("click", function(){
		$(".login1").show();
		$(".login2").hide();
	});
	$(".regnav li").eq(1).on("click", function(){
		$(".login2").show()
		$(".login1").hide();
	});

	//判断手机号
	$(".tel_input").focus(function(){
		$(".tel_ifo .tips1").show();
		$(".tel_ifo .tips2").hide();
	});	
	$(".tel_input").blur(function(){
		var tel = $(this).val();
		$(".tel_ifo .tips1").hide();
		if(!(/^1[3|5|7|8|9|4]\d{9}$/.test(tel))){
			$(".tel_input").val("");			
			$(".tel_ifo .tips2").show();
			$(".tel_ifo .tips1").hide();
		} else{
			$(".tel_ifo .tips2").hide();
			$(".tel_ifo .p_tel2").show();
			$(".p_tel1").hide();
		}
	});

	//设置密码
	$(".psw_input").focus(function(){
		$(".psw_ifo .tips1").show();
	});	
	$(".psw_input").blur(function(){
		var psw = $(this).val();
		$(".psw_ifo .tips1").hide();
		if(!(/^[\w]{6,20}$/.test(psw))){
			//$(".psw_input").val("");			
			$(".psw_ifo .tips2").show();
		} else{
			$(".psw_ifo .tips2").hide();
			$(".psw_ifo .p_tel2").show();
			$(".p_psw").hide();
		}
	});

	//确认密码
	$(".possword_input").focus(function(){
		$(".possword_ifo .tips1").show();
	});	
	$(".possword_input").blur(function(){
		var pswd = $(this).val();
		var psw = $(".psw_input").val();
		$(".possword_ifo .tips1").hide();
		if(pswd === psw){
			if(pswd === ""){
				$(".possword_ifo .tips1").show();
				$(".possword_ifo .tips2").hide();
			}else{
				//$(".psw_input").val("");		
				$(".possword_ifo .tips2").hide();
				$(".possword_ifo .p_tel2").show();
				$(".p_psw").hide();
			}
			
		} else{$(".possword_ifo .tips2").show();
			$(".possword_ifo .p_tel2").hide();
			
		}
	});

	//提交注册表单
	$(".refer_ifo").click(function(){
		if($("#agree").prop("checked")){
			var yz = $("#yz").val().toUpperCase();
			var yzm = $("#random_code").html();
			if(!(yz===yzm)){
				$(".dx_code .tips2").show();
			} else {
				alert("注册成功，跳转到登录页面(*^__^*) 嘻嘻……");
				window.location.href = "load.html";
			}
		}else{
			$(".approve_ifo .tips2").show();
		}
	});

	//电视用户激活
	/*$(".refer_ifo").click(function(){
		if($("#agree").prop("checked")){
			var yz2 = $("#dx").val().toUpperCase();
			var yzm2 = $("#random_code2").html();
			if(!(yz2===yzm2)){
				$(".dx_code .tips2").show();
			} else {
				alert("注册成功，跳转到登录页面(*^__^*) 嘻嘻……");
				window.location.href = "load.html";
			}
		}else{
			$(".approve_ifo .tips2").show();
		}
	});*/

});