require("../less/login.less");                  //引入css

const html = require("../ejs/login.ejs");      //引入html 

module.exports = {
	template: html(),
	controller : function() {

		const key = "$a6dd4ac4-c1d1-11e6-80e4-0050568a49fd$";
		let isAd = false;

		$("#l-username").blur(function(){
			$.get(`http://${C.baseIp}:${C.basePort}/basis/noauth/ldaps?login=${$(this).val()}`, res => {
				if (res.resultContent.length > 0) {
					isAd = true;
					$("#account-box").html(require("../ejs/account.ejs")({lists : res.resultContent}));
				}else{
					isAd = false;
					$("#account-box").html("");
				}
			})
		});

		$("#l-password").keyup(function(e) {
			let code = e.which; 
		    if(code==13) e.preventDefault();
		    if(code==32||code==13||code==188||code==186){
		        $("#submit-button").click();
		    } 
		});

		$("#submit-button").click(function(){
			let username = $("#l-username").val().trim(),
				password = $("#l-password").val().trim(),
				adId = $("#account-select").val() || "";

			if($("#l-username").val() === "") return alert("请输入用户名");
			if($("#l-password").val() === "") return alert("请输入密码");
			if (isAd && adId === "") return alert("请选择认证源");
			if(isChecked) return;

			if (adId) password  = password + key + adId; //把adid加在密码后面

			let isChecked = 1;
			$("#submit-button").val("正在登录...");

			$.ajax({
		        url: `http://${C.baseIp}:${C.basePort}/uaa/oauth/token?grant_type=password&username=${username}&password=${password}&client_id=ui&client_secret=12345`,
		        type: "POST",
		        beforeSend: function (request)
		        {
		            request.setRequestHeader("Authorization", "Basic " + btoa("ui:secret"))
		        },
		        crossDomain: true,
		        success: function (response) {
					const token = "bearer " + response.access_token;

					$.ajax({   //获取用户的登录信息
			            url: `http://${C.baseIp}:${C.basePort}/basis/authsec/adm/user/current` ,
			            type: "GET",
			            beforeSend: function (request)
			            {
			                request.setRequestHeader('Authorization', token)
			            },
			            crossDomain: true,
			            success: function (response) {
			                sessionStorage["userInfo"] = JSON.stringify(response.resultContent);
			                sessionStorage["token"] = token;
							location.href="/pf-mng2/cl-mng/cl-mng";
							isChecked = 0;
			            },
			            error: function (xhr, status) {
			                alert("获取用户信息失败")
			            }
			        }); 
		        },
		        error: function (xhr, status) {
		            alert("登录失败！请检查用户名和密码")
					$("#submit-button").val("登录");
					isChecked = 0;
		        }
		    }); 
		})
	}
};
