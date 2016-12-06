require("../less/product.less");                  //引入css

const escHtml = require("../ejs/esc.ejs");                        //引入html
const evsHtml = require("../ejs/evs.ejs");                        //引入html

const C    = require("../../common/const.js");              //引入全局配置

Routes("","ecs",params => {
	$("#products-box").html(escHtml(C));
	document.title = "云主机（ECS）介绍_产品与服务";
});

Routes("evs",params => {
	$("#products-box").html(evsHtml(C));
	document.title = "云硬盘（EVS）介绍_产品与服务";
});
