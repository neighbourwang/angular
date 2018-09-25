//boe的生产环境

 // const promise = new Promise((resolve,reject) => {
 //     const token =  window.sessionStorage["token"];
 //     token ?　resolve(token) : reject("获取token失败！");
 // })
 
export const environment = {
    production: true ,
    baseIp : '10.1.8.142',
    basePort : '30072',
    jwt : window.sessionStorage["token"]
};
