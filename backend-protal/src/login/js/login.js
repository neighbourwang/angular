require("../less/login.less");                  //引入css

$("#submit-button").click(function(){
	if($("#l-username").val() === "") return alert("请输入用户名");
	if($("#l-password").val() === "") return alert("请输入密码");
	location.href="/pf-mng2/cl-mng/cl-mng"
})
