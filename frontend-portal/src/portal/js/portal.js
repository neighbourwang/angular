require("../less/portal.less");                  //引入css
const html = require("../ejs/portal.ejs");      //引入html 

document.title = T("PORTAL_TITLE");
module.exports = {
	template: html(),
	controller : function() {
	}
}