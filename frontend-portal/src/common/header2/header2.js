require("./header2.less");                  //引入css
const html = require("./header2.ejs");      //引入html 

module.exports = {
	template: html(),
	controller : function() {
		console.log("show header2")
	}
}