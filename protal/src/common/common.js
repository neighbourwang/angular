const commonModel = [
		"cm-header",
		"cm-footer",
		"cm-header2",
		"cm-footer2",
		"cm-banner",
	];   //定义公共的组件

commonModel.forEach(function(modelName) {
	const obj = $("." + modelName);
	if (!obj.length) return;   //如果没有模块 return出去

	require(["./"+modelName+"/"+modelName+".js"], function(model){
			model.template && obj.html(model.template);   //先注入html
			model.controller && model.controller();       //再执行js
		});
})

