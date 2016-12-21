require("../less/product.less");                  //引入css

const escHtml = require("../ejs/esc.ejs");                        //引入html
const evsHtml = require("../ejs/evs.ejs");                        //引入html

const html = require("../ejs/products.ejs");      //引入html 

module.exports = {
	template: html(),
	controller : function() {

		const userInfo = sessionStorage["userInfo"] && JSON.parse(sessionStorage["userInfo"]);

		Routes("","ecs",params => {
			$("#products-box").html(escHtml());
			if (!userInfo) {
				$(".prdouct-bunner .button-orange-deep").attr("href", "/login.html")
			}
			document.title = "云主机（ECS）介绍_产品与服务";
		});

		Routes("evs",params => {
			$("#products-box").html(evsHtml());
			if (!userInfo) {
				$(".prdouct-bunner .button-orange-deep").attr("href", "/login.html")
			}
			document.title = "云硬盘（EVS）介绍_产品与服务";
		});

	}
}

