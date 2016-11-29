// The file contents for the current environment will overwrite these during build.
// The build system defaults to the wdev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

// const jwt  = new Promise(next => {
// 	next($.post("http://15.114.100.52:30077/uaa/oauth/token?grant_type=password&username=gavin@hpe.com&password=12345&client_id=ui&client_secret=12345"))
// }).then(res => {
// 	console.log(res,2222)
// })


export const environment = {
	production: false,
	baseIp : "",
	basePort : "",
	jwt : "bearer 48c65f87-ba69-42f1-bdf9-905c4789f8b3"
};
