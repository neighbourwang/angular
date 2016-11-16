require("../less/product.less");                  //引入css
const escHtml = require("../ejs/esc.ejs");                        //引入html 
const C    = require("../../common/const.js");              //引入全局配置

Routes("","ecs",params => {
	$("#products-box").html(escHtml(C));
});


