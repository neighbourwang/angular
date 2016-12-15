require("./cm-map.less");                  //引入css
const html = require("./cm-map.ejs");      //引入html 
const C    = require("../const.js");          //引入全局配置

const pointHtml = require("./point.ejs");

module.exports = {
	template: html(C),
	controller : function() {
		var serveDots = `
[
  {
    "name": "北京",
    "width": "130",
    "left": "730",
    "type": "blue",
    "top": "120",
    "position" : "right"
  },
  {
    "name": "福清",
    "width": "50",
    "left": "772",
    "type": "blue",
    "top": "170",
    "position" : ""
  },
  {
    "name": "贵州",
    "width": "50",
    "left": "615",
    "type": "blue",
    "top": "280",
    "position" : ""
  },
  {
    "name": "成都",
    "width": "50",
    "left": "585",
    "type": "blue",
    "top": "230",
    "position" : ""
  },
  {
    "name": "重庆",
    "width": "80",
    "left": "595",
    "type": "blue",
    "top": "220",
    "position" : "left"
  },
  {
    "name": "苏州",
    "width": "130",
    "left": "845",
    "type": "blue",
    "top": "180",
    "position" : "left"
  },
  {
    "name": "福清",
    "width": "80",
    "left": "920",
    "type": "blue",
    "top": "293",
    "position" : ""
  }
]

		`;

		$(".map-box").html(pointHtml(JSON.parse(serveDots)));
	}
}


// [
//   {
//     "name": "北京",
//     "width": "130",
//     "left": "730",
//     "type": "blue",
//     "top": "120",
//     "position" : "right"
//   },
//   {
//     "name": "江苏",
//     "width": "80",
//     "left": "885",
//     "type": "blue",
//     "top": "213",
//     "position" : "right"
//   },
//   {
//     "name": "上海",
//     "width": "130",
//     "left": "885",
//     "type": "blue",
//     "top": "200",
//     "position" : "left"
//   },
//   {
//     "name": "甘肃",
//     "width": "100",
//     "left": "420",
//     "type": "white",
//     "top": "150",
//     "position" : "left"
//   },
//   {
//     "name": "贵州",
//     "width": "50",
//     "left": "635",
//     "type": "blue",
//     "top": "300",
//     "position" : ""
//   },
//   {
//     "name": "香港",
//     "width": "90",
//     "left": "852",
//     "type": "blue",
//     "top": "323",
//     "position" : "left"
//   },
//   {
//     "name": "广西",
//     "width": "100",
//     "left": "660",
//     "type": "white",
//     "top": "320",
//     "position" : "left"
//   }
// ]