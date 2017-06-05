$(function(){
	$("#nikename").focus(function(){
		$(".name_ifo").css({borderColor:"green"});
		$(".name_ifo .tips").show();
	});
	$("#nikename").blur(function(){
		$(".name_ifo .tips").hide();
	});

	$("#password").blur(function(){

	});
	
	$("#sub").on("click", function(){
		var psd = $("#password").val();
		console.log((/^[\w]{6,20}$/.test(psd)));
		if(!(/^[\w]{6,20}$/.test(psd))){
			alert('密码错误，请重新输入！');
		} else {
			alert('登录成功，进入主页！');
			window.location.href = "../index.html";
		}
	});




});



window.onload = function(){
	// setCookie("name", "test", {expires:1,secure:true,path:"/"});
	// console.log(document.cookie);
	var oLogin = document.getElementById("loginForm"),
		oRemember = document.getElementById("remember"),
		oSub = document.getElementById("nikename")
		oUser = document.getElementById("nikename"),
		oPsw = document.getElementById("password");

	oLogin.onsubmit = function(ev){
		ev = ev || window.event;
		if(oRemember.checked){
			setCookie("nikename",oUser.value,{expires:7,path:"/"});
			setCookie("password",oPsw.value,{expires:7,path:"/"});
		} else {
			removeCookie("nikename",{path:"/"});
			removeCookie("password",{path:"/"});
		}
		return false;
	}

	var uname = getCookie("nikename"),
		upwd  = getCookie("password");
		console.log(uname);
		console.log(upwd);
		if(uname){
			oUser.value = uname;
		}
		if(upwd){
			oPsw.value = upwd;
		}

	function setCookie(key, value, options){
		//最基本的键值对
		var str = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		//失效时间
		if(options.expires){
			var expires = options.expires;
			if(typeof expires === "number"){//失效时间传递的是一个数字
			    expires = new Date();	//当前本地日期时间对象
				expires.setDate(expires.getDate() + options.expires);
			}
			str += ";expires=" + expires.toUTCString(); //失效时间的计算
		}
		//路径
		if(options.path){
			str += ";path=" + options.path;
		}
		//域名
		if(options.domain){
			str += ";domain=" +options.domain;
		}
		//安全
		if(options.secure){
			str += ";secure";
		}
		//保存cookie
		document.cookie = str;
	}

	//获取cookie信息 根据key 获取cookie
	function getCookie(key){
		//获取所有的cookie
		var cookies = document.cookie.split("; ");
		//遍历
		for(var i = 0, len =cookies.length; i<len; i++){
			//用= 将key=value 分割， =号前的为key，==后的为value
			var cookie = cookies[i].split("=");
			if(decodeURIComponent(cookie[0]) === key){

				return decodeURIComponent(cookie[1]);
			}
		}
		return null;
	}

	//移除cookie
	function removeCookie(key,options){
		options.expires = -1;
		setCookie(key,"",{expires:-1});
	}





}

