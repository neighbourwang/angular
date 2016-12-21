require("./footer.less");                  //引入css
const html = require("./footer.ejs");      //引入html 

module.exports = {
	template: html(),
	controller : function() {
		console.log("show footer")
	}
}