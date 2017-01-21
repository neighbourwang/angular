require("../less/control6.less");                  //引入css
const html = require("../ejs/control6.ejs");      //引入html 

document.title = T("CONTROL_TITLE");

module.exports = {
	template: html(),
	controller : function() {
		let _wmks;
		document.getElementById("console").style.position = "absolute";

		function getURLParameter(name) {
			// This regEx retrieves a URL for anything other than "installVMRC" (escp. for name param "vmName").
			var regEx = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1];
			return decodeURIComponent(regEx);
		}
		(function(){

			var console = document.getElementById("console"),
			consoleFullScreen = document.getElementById("console-fullscreen");

			// Fullscreen API names are different for each browser
			var prefix = "";

			// Setting the prefix for fullscreen based on browser (Mozilla and Chrome)
			if (console) {
				if (console.mozRequestFullScreen) {
					prefix = "moz";
				} else if (console.webkitRequestFullScreen) {
					prefix = "webkit";
				} else if (console.msRequestFullscreen) {
				 prefix = "ms";
			  }
		}

			// Will perform fullscreen request when requested by the user
		if (console && consoleFullScreen) {
			consoleFullScreen.addEventListener("click", function (evt) {
			if (console.requestFullscreen) {
				console.requestFullscreen();
			} else if (console.mozRequestFullScreen) {
				console.mozRequestFullScreen();
			} else if (console.webkitRequestFullScreen) {
				console.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
			} else if (console.msRequestFullscreen) {
			 console.msRequestFullscreen();
			}
		}, false);
		}
		})();
	
	function rePosition()
	{
		var w = window.innerWidth,
		h = window.innerHeight;
		console.log("resize window, the current window size is " + w + " X " + h);
		if(!WMKS.UTIL.isFullscreenNow())
		{
			_wmks.css({"top":$("#bar").outerHeight() + "px"});
			console.log("not full screen mode");
			h -= $("#bar").outerHeight();
		}
		else
		{
			_wmks.css({"top":"0px","left":"0px"});
			console.log("full screen mode");
		}
		_wmks.width(w);
		_wmks.height(h);
		_wmks.wmks('rescale');
		console.log("resize console to " + w + " x " + h );
	}
	function relayout() {
	$("#console").height( $(window).height() - $("#bar").outerHeight() );
	console.log('height is ' + ($(window).height() - $("#bar").outerHeight()) );
	$("#spinner").css("margin-left",  $("#console").width()/2 - $("#spinner").width() );
	if (!WMKS.UTIL.isFullscreenNow()) {
		 _wmks.wmks("rescaleOrResize",true);
	}
	}

	function toggleRelativePad() {
	    _wmks.wmks("toggleRelativePad");
	}

	function toggleKeyboard() {
	if (_wmks.wmks("option", "fixANSIEquivalentKeys") == false) {
		_wmks.wmks("option", "fixANSIEquivalentKeys", true);
	} else {
		_wmks.wmks("option", "fixANSIEquivalentKeys", false);
	}
	}

	function showRemoteConsoleMessage(message) {
	$('#console').html(message);
	$('#console').css('text-align', 'center');
	$('#console').css('color', 'white');
	$("#bar").slideDown("fast", relayout);
	$("#spinner").removeClass("spinner");
	}


	//listen for resize events
	$(window).resize(function() {
		rePosition();
	});

	
	$(document).ready(function(){
		_wmks = $("#console")
		 .wmks({"useVNCHandshake" : false, "sendProperMouseWheelDeltas": true,"fitToParent":true,"useNativePixels":true})
		 .bind("wmksconnecting", function() {
			console.log("The console is connecting");
			$("#bar").slideUp("slow", relayout);
		 })
		 .bind("wmksconnected", function() {
			console.log("The console has been connected");
			$("#spinner").removeClass("spinner");
			$("#bar").slideDown("fast", relayout);
		 })
		 .bind("wmksdisconnected", function(evt, info) {
			console.log("The console has been disconnected");
			console.log(evt, info);
			showRemoteConsoleMessage("控制台连接已断开，请关闭窗口重新启动控制台进行连接。");
		 })
		 .bind("wmkserror", function(evt, errObj) {
			console.log("Error!");
			console.log(evt, errObj);
			if(errObj.error) {
			   var idx = errObj.error.lastIndexOf(".") + 1;
			   alert(errObj.error.substr(idx) + " - " + errObj.msg);
			}
		 })
		 .bind("wmksiniterror", function(evt, customData) {
			console.log(evt);
			console.log(customData);
			showRemoteConsoleMessage(customData.errorMsg);
		 })
		 .bind("wmksresolutionchanged", function(canvas) {
			console.log("Resolution has changed!");
		 })
		 
		 let url = window.localStorage["vmwControlUrl"] || "";
		  url= "wss://10.1.2.221:9443/vsphere-client/webconsole/authd?vmId=vm-900&vmName=vm02_NQP&host=10.1.2.221:443&sessionTicket=cst-VCT-52cd0a4a-47fa-031a-e18b-7d0f8762dfaa--tp-6E-CE-38-DE-65-4B-E5-24-B6-CA-1F-B9-E5-4E-82-6B-A2-38-DB-34&thumbprint=6E:CE:38:DE:65:4B:E5:24:B6:CA:1F:B9:E5:4E:82:6B:A2:38:DB:34";
		 console.log(url)
		  _wmks.wmks("connect", url);

		$("#sendCAD").click(function() {
			  _wmks.wmks('sendKeyCodes', [
				 17,
				 18,
				 46
			  ]);
			});

	});

	}
}
