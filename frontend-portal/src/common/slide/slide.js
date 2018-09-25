require("./slide.less");                  //引入css
const html = require("./slide.ejs");      //引入html 

module.exports = {
	template: html(),
	controller : function() {
		$(".cm-slide").each(function(){
			const slide = $(this).find(".slide-block"),
				  slideBox = $(this).find(".slide-box"),
				  button = $(this).find(".slide-buttion span"),
				  length = slide.length - 1,
				  change = () => {   //幻灯片动画
					  	index = index > length ? 0 : index < 0 ? length : index;
						slideBox.animate({ left:`-${index*windowWidth}px` });
						button.eq(index).addClass("slide-active").siblings().removeClass("slide-active");
				  },
				  setTime = () => {  //定时器
				  		time = setInterval(() => { ++index; change(); }, 4000);
				  }
			
			let index = 0,
				time,
				windowWidth = $(window).width();

			slide.width(windowWidth);

			slide.hover(() => clearInterval(time), () => setTime() );  //鼠标滑过动画

			button.each(function(i){   //按钮的事件
				$(this).click(() => {
					index = i; change();
				})
			});

			window.onresize = () => {
				windowWidth = $(window).width();
			};

			setTime();   //初始化开始换灯泡
		});
	}
}