require("./map.less");                  //引入css
const html = require("./map.ejs");      //引入html 

const pointHtml = require("./point.ejs");

module.exports = {
	template: html(),
	controller : function() {
		var serveDots = `
[
  {
    "name": "${T('MAPNAME1')}",
    "width": "130",
    "left": "730",
    "type": "blue",
    "top": "120",
    "position" : "right"
  },
  {
    "name": "${T('MAPNAME2')}",
    "width": "50",
    "left": "772",
    "type": "blue",
    "top": "170",
    "position" : ""
  },
  {
    "name": "${T('MAPNAME3')}",
    "width": "50",
    "left": "615",
    "type": "blue",
    "top": "280",
    "position" : ""
  },
  {
    "name": "${T('MAPNAME4')}",
    "width": "50",
    "left": "585",
    "type": "blue",
    "top": "230",
    "position" : ""
  },
  {
    "name": "${T('MAPNAME5')}",
    "width": "80",
    "left": "595",
    "type": "blue",
    "top": "220",
    "position" : "left"
  },
  {
    "name": "${T('MAPNAME6')}",
    "width": "130",
    "left": "845",
    "type": "blue",
    "top": "180",
    "position" : "left"
  },
  {
    "name": "${T('MAPNAME7')}",
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
