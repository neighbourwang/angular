require("./cm-header.less");                  //引入css
const html = require("./cm-header.ejs");      //引入html
const C    = require("../const.js");          //引入全局配置

module.exports = {
	template: html(C),
	controller : function() {

		//  根据url加上active
		$(".cm-header .h-nav a.header-title").each(function(){
			let htmlName = location.href.match(/\/\w+?\.html/);
			if (htmlName && $(this).attr("href").indexOf(htmlName[0]) > -1 ) {
				$(this).addClass("active");
			}
		});

		//导航滑动效果
		$(".cm-header .box-li1").each(function(){
			$(this).hover(function(){
				$(this).find(".li-title:first").addClass("active");
				$(this).siblings().find(".li-title").removeClass("active");
				$(this).find("ul:first").fadeIn(300);
				$(this).siblings().find("ul").fadeOut(10);
			})
		});
		$(".cm-header .h-nav-li").each(function(){
			$(this).hover(function(){
				$(this).find(".head-hover-box").addClass("box-hover");
				$(this).find("a:first").addClass("active");
			},function(){
				$(this).find(".head-hover-box").removeClass("box-hover");
				$(this).find("a:first").removeClass("active");
			})
		})
	}
}
