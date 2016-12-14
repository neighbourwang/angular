require("./cm-footer2.less");                  //引入css
const html = require("./cm-footer2.ejs");      //引入html 
const C    = require("../const.js");          //引入全局配置

module.exports = {
	template: html(C),
	controller : function() {
		console.log("show footer2")
	}
}