require("../less/login.less");                  //引入css

$("#submit-button").click(function(){
	let username = $("#l-username").val();
	let password = $("#l-password").val();

	if($("#l-username").val() === "") return alert("请输入用户名");
	if($("#l-password").val() === "") return alert("请输入密码");
	if(isChecked) return;

	let isChecked = 1;
	$("#submit-button").val("正在登陆...");

	$.ajax({
        url: `http://15.114.100.52:32072/uaa/oauth/token?grant_type=password&username=${username}&password=${password}&client_id=ui&client_secret=12345`,
        type: "POST",
        beforeSend: function (request)
        {
            request.setRequestHeader("Authorization", "Basic " + btoa("ui:secret"))
        },
        crossDomain: true,
        success: function (response) {
			sessionStorage["token"] = response.access_token;
			location.href="/cloud-host-service/cloud-host-list"
			isChecked = 0;
        },
        error: function (xhr, status) {
            alert("登录失败！请检查用户名和密码")
			$("#submit-button").val("登录");
			isChecked = 0;
        }
    }); 
})