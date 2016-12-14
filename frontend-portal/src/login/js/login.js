require("../less/login.less");                  //引入css

const C    = require("../../common/const.js");          //引入全局配置


$("#l-username").blur(function(){
	$.get(`http://${C.baseIp}:${C.basePort}/basis/noauth/ldaps?login=${$(this).val()}`, res => {
		console.log(res)
	})
});


$("#submit-button").click(function(){
	let username = $("#l-username").val();
	let password = $("#l-password").val();

	if($("#l-username").val() === "") return alert("请输入用户名");
	if($("#l-password").val() === "") return alert("请输入密码");
	if(isChecked) return;

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
	            url: `http://${C.baseIp}:${C.basePort}/basis/authsec/mpp/user/current` ,
	            type: "GET",
	            beforeSend: function (request)
	            {
	                request.setRequestHeader('Authorization', token)
	            },
	            crossDomain: true,
	            success: function (response) {
	                sessionStorage["userInfo"] = JSON.stringify(response.resultContent);
	                sessionStorage["token"] = token;
					location.href="/mng-console"
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