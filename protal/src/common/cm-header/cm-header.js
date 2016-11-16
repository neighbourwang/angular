require("./cm-header.less");                  //引入css
const html = require("./cm-header.ejs");      //引入html 
const C    = require("../const.js");          //引入全局配置

module.exports = {
	template: html(C),
	controller : function() {
		$(".cm-header .h-nav a").each(function(){
			let htmlName = location.href.match(/\/\w+?\.html/);
			if (htmlName && $(this).attr("href").indexOf(htmlName[0]) > -1 ) {
				$(this).addClass("active");
			}
		})
	}
}