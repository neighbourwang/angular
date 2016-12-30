require("./header.less");                  //引入css
const html = require("./header.ejs");      //引入html

module.exports = {
	template: html(),
	controller : function() {
	    const userInfo = sessionStorage["userInfo"] && JSON.parse(sessionStorage["userInfo"]);

	    if(userInfo) {  //如果登录了
	    	$(".cm-header .h-login-box").html(T("WELCOME") + "，" + userInfo.loginName + " " + "<a class='login-out' href='javascript:'>"+T("LOGINOUT")+"</a>");
	    	$(".cm-header .login-out").click(() => {
	    		setTimeout(() => {
					window.sessionStorage["token"] = "";
					window.sessionStorage["userInfo"] = "";
					window.location.reload();
			    }, 200)
	    	})
	    }else {
	   		$(".cm-header .box-ul3 a,.h-console").attr("href","/login.html");
	    }


		//  根据url加上active
		$(".cm-header .h-nav a.header-title").each(function(){
			let htmlName = location.href.match(/\/\w+?\.html/);
			if (htmlName && $(this).attr("href") &&  $(this).attr("href").indexOf(htmlName[0]) > -1 ) {
				$(this).addClass("active");
			}
		});

		//导航滑动效果
		$(".cm-header .box-li1").each(function(){    //二三级导航
			$(this).hover(function(){
				$(this).find(".li-title:first").addClass("active");
				$(this).siblings().find(".li-title").removeClass("active");
				$(this).find("ul:first").fadeIn(300);
				$(this).siblings().find("ul").fadeOut(0);
			})
		});
		$(".cm-header .h-nav-li").each(function(){   //一级导航
			$(this).hover(function(){
				$(this).find(".head-hover-box").addClass("box-hover");
				$(this).find("a:first").addClass("active");
			},function(){
				$(this).find(".head-hover-box").removeClass("box-hover");
				$(this).find("a:first").removeClass("active");
			})
		});
		$(".box-li2 a").each(function(){        //点击a标签后滑动消失
			$(this).click(function(){
				$(".cm-header .h-nav-li .head-hover-box").removeClass("box-hover");
				$(".cm-header .h-nav-li a:first").removeClass("active");
			})
		})
	}
}
