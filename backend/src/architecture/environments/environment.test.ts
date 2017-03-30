// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=test` then `environment.test.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.


 // const promise = new Promise((resolve,reject) => {
 //     const token = window.sessionStorage["token"];
 //     token ?　resolve(token) : reject("获取token失败！");
 // })
 
export const environment = {
	production: true ,
	// baseIp : '15.114.102.62',
	// basePort : '31077',
    baseIp : '15.114.102.32',  
    basePort : '31072',
	jwt : window.sessionStorage["token"]
};
