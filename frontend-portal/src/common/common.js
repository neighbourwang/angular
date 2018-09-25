const commonModel = [
		"cm-header",
		"cm-footer",
		"cm-header2",
		"cm-footer2",
		"cm-map",
		"cm-slide",
	];   //定义公共的组件

const pageModel = [
		"page-portal",
		"page-login",
		"page-control",
		"page-control6",
		"page-products",
	];   //定义page的组建

// window.localStorage["languageCode"] = "en";

const languageCode = window.localStorage["languageCode"] || "cn";  

require("bundle!../language/"+languageCode+".js")(function(lang){    //第一步获取语言包

	window.C = require("./const.js");
	window.T = value => lang[value];

	commonModel.concat(pageModel).forEach(function(modelName) {    //第二步加载模块
		const obj = $("." + modelName);
		if (!obj.length) return;   //如果没有模块 return出去

		const name = modelName.split("-"); 
		name[0] === "cm"      //区分cm和page的路径
			? require("bundle!./"+`${name[1]}/${name[1]}.js`)(requireFn)
			: name[0] === "page" 
				? require("bundle!../"+`${name[1]}/js/${name[1]}.js`)(requireFn) 
				: "";

		function requireFn(model){
				model.template && obj.html(model.template);   //先注入html
				model.controller && model.controller();       //再执行js
			}
	});
});

//路由
window.Routes = (function() {

	let listenList = [];  //监听的列表

	function listen(...routes){
		var callbackFn = routes.pop();
		console.log(routes)
		routes.forEach(route => {
			listenList.push({
				route : route,
				callbackFn : callbackFn
			});
		});
		change();
	};

	function change(){
		let hashArr = location.hash.match( /#([^\?|\/|$]*)\??(.*)/),
			route = hashArr ? hashArr[1] : "",
			params = {};

		if (hashArr && hashArr[2]) {   //处理参数
			hashArr[2].split("&").forEach(param => {
				param = param.split("=");
				params[param[0]] = param[1];
			})
		};

		listenList.forEach(listen => {   //派发时间
			if(listen.route === route )
				listen.callbackFn && listen.callbackFn.call(window, params)
		})
	}

	window.onhashchange = change;
	return listen;
})();

