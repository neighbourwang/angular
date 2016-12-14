module.exports = {
	publicPath : "/public",
	imgPath : "/public/images",
	baseIp : process.env.NODE_ENV === "custom" ? "10.1.8.126" : "15.114.100.55",
	basePort : process.env.NODE_ENV === "qa" ? "31072" : "30072"
}