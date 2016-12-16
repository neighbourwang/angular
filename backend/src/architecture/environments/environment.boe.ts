//boe的演示

 const promise = new Promise((resolve,reject) => {
     const token =  window.sessionStorage["token"];
     token ?　resolve(token) : reject("获取token失败！");
 })
 
export const environment = {
    production: true ,
    baseIp : '10.80.25.173',
    basePort : '30072',
    jwt : promise
};