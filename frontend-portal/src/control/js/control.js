require("../less/control.less");                  //引入css
const html = require("../ejs/control.ejs");      //引入html 

document.title = T("CONTROL_TITLE");

module.exports = {
	template: html(),
	controller : function() {
		var isFullScreen = false;
		var wmks = WMKS.createWMKS("wmksContainer2",{
			enableUint8Utf8: true
		});
		//console.log(wmks.getConnectionState());
		wmks.register(WMKS.CONST.Events.CONNECTION_STATE_CHANGE,
			 function(event,data){
					console.log("connection state change : "+JSON.stringify(data));
				 if(data.state == WMKS.CONST.ConnectionState.CONNECTED){
					 console.log("connection state change : connected");
					 $('#wmksContainer2.wmks canvas').css('left', '50%');
				 }
			 }
		);
		wmks.register(WMKS.CONST.Events.FULL_SCREEN_CHANGE,
			 function(event,data){
				 isFullScreen = data.isFullScreen;
				 if(data.isFullScreen == false){
					 console.log("exit full screen");
					 $('#wmksContainer2.wmks canvas').css('left', '50%');
				 }
			 }
		);
		wmks.register(WMKS.CONST.Events.ERROR,
			 function(event,data){
				 console.log("connection error : " + data);
			 }
		);
		wmks.register(WMKS.CONST.Events.REMOTE_SCREEN_SIZE_CHANGE,
			 function(event,data){
				 console.log("screensize change");
				 $('#wmksContainer2.wmks canvas').css('position', 'absolute');
				 //$('#wmksContainer2.wmks canvas').css('margin-left', -1 * (data.width)/2 + 'px');
				 //$('#wmksContainer2.wmks canvas').css('margin-top', -1 * (canvas.target.childNodes[0].clientHeight)/2 + 'px');
				 //$('#wmksContainer2.wmks canvas').css('top', '50%');
				 //$('#wmksContainer2.wmks canvas').css('left', '50%');
				 setTimeout(function(){ 
					 if(isFullScreen==false && $('#wmksContainer2.wmks canvas').css('left')=='0px'){
						 $('#wmksContainer2.wmks canvas').css('left', '50%'); 
					 }
					 
				 }, 500);

				}		 
		);

		$('#sendCAD').click(function(){
			 wmks.sendKeyCodes([17,18,46]);
		});
		$('#btFullScreen').click(function(){
			 wmks.enterFullScreen();
			 wmks.setRemoteScreenSize(screen.height, screen.height);
			 wmks.updateScreen();
		});
		$('#btDisconnect').click(function(){
			 wmks.disconnect();
			 wmks.destroy();
			 window.close();
		});


		//var url = "wss://192.168.1.100:7343/console/authd?vmId=vm-227&vmName=Server2008_Q5U&host=192.168.1.100:443&sessionTicket=cst-VCT-5243439b-4487-cf3b-846d-2555980dee44--tp-A1-30-A0-5E-3C-AA-1C-3E-ED-EB-5F-E5-02-D3-F0-1E-01-0B-96-94&thumbprint=A1:30:A0:5E:3C:AA:1C:3E:ED:EB:5F:E5:02:D3:F0:1E:01:0B:96:94";
		// var url= "wss://15.114.102.15:7343/console/authd?vmId=vm-621&vmName=T_Win08_01&host=15.114.102.15:443&sessionTicket=cst-VCT-52833269-5907-e354-1f2c-f487a03ea2fa--tp-1F-A9-8F-89-C2-29-7C-B5-9B-A5-8D-15-45-DC-FF-1C-30-38-F4-49&thumbprint=1F:A9:8F:89:C2:29:7C:B5:9B:A5:8D:15:45:DC:FF:1C:30:38:F4:49";
		//var url= "${protocal}://winserver2008r2:${port}/console/authd?vmId=${vmId}&vmName=${vmName}&host=${host}:443";
		let url = window.localStorage["vmwControlUrl"] || "";

		if (!url) return;
		//alert(url);
		wmks.connect(url);
		//console.log(wmks.getConnectionState());
		window.onbeforeunload = function(){
			wmks.disconnect();
		};
	}
}
