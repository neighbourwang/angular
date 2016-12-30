module.exports = {
	publicPath : "/public",
	imgPath : "/public/images",
	baseIp : process.env.NODE_ENV === "boeprod" ? "10.1.8.142" : process.env.NODE_ENV === "boe" ? "10.80.25.120" : "15.114.102.23",
	basePort : process.env.NODE_ENV === "qa" ? "31072" : "30072"
}