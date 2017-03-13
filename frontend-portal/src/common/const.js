module.exports = {
	publicPath : "/public",
	imgPath : "/public/images",
	baseIp : process.env.NODE_ENV === "boeprod" ? "10.1.8.142" : 
			 process.env.NODE_ENV === "boe" ? "10.80.25.11" : 
			 // process.env.NODE_ENV === "qa" ? "15.114.102.62":
			 process.env.NODE_ENV === "qa" ? "15.114.102.32":
			 process.env.NODE_ENV === "dev" ? "15.114.100.31" : "15.114.100.31",  //15.114.100.31
	basePort : process.env.NODE_ENV === "qa" ? "31072" : "30072"
}
