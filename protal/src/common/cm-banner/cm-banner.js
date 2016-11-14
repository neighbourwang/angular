require("./cm-banner.less");                  //引入css
const html = require("./cm-banner.ejs");      //引入html 
const C    = require("../const.js");          //引入全局配置

const pointHtml = require("./point.ejs");

module.exports = {
	template: html(C),
	controller : function() {
		var serveDots = '[{"name":"华南","width":"80","left":"920","type":"blue","top":"225"},{"name":"华东","width":"200","left":"940","type":"blue","top":"205"},{"name":"香港","width":"80","left":"940","type":"blue","top":"235"},{"name":"华北","width":"80","left":"915","type":"blue","top":"195"},{"name":"中东","width":"100","left":"716","type":"white","top":"213"},{"name":"日本","width":"80","left":"1013","type":"blue","top":"180"},{"name":"欧洲","width":"80","left":"582","type":"white","top":"125"},{"name":"美东","width":"110","left":"270","type":"blue","top":"190"},{"name":"美西","width":"110","left":"180","type":"blue","top":"160"},{"name":"新加坡","width":"110","left":"933","type":"blue","top":"330"},{"name":"澳大利亚","width":"150","left":"980","type":"white","top":"360"}]';

		$(".banner-map").html(pointHtml(JSON.parse(serveDots)));
	}
}