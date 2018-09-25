require("./footer2.less");                  //引入css
const html = require("./footer2.ejs");      //引入html 

module.exports = {
	template: html(),
	controller : function() {
		console.log("show footer2")
	}
}