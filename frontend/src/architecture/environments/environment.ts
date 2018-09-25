// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=test` then `environment.test.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

// // const userName = "michaelwang@hpe.com",
// const userName = "otheradmin@hpe.com",

//       password = "12345"
// const promise = new Promise((resolve,reject) => {
//      const token =  window.sessionStorage["token"];
//      token ?　resolve(token) : reject("获取token失败！");
//  });

const env = window.localStorage["environment"] ;
const baseIp = env === "test" ? "15.114.102.62" : env === "oldtest" ? "15.114.102.32" : "15.114.100.31";
const basePort = env === "test" || env === "oldtest" ? "31072" : "30072";
 
export const environment = {
    production: true ,
    baseIp : baseIp,  
    basePort : basePort,
    jwt : window.sessionStorage["token"]
};


// const userName = "michaelwang@hpe.com",
//       password = "12345"

// // $.ajax({
// //         url: `http://15.114.100.52:32072/uaa/oauth/token?grant_type=password&username=gavin@hpe.com&password=12345&client_id=ui&client_secret=12345`,
// //         type: "POST",
// //         beforeSend: function (request)
// //         {
// //             request.setRequestHeader("Authorization", "Basic " + btoa("ui:secret"))
// //         },
// //         crossDomain: true,
// //         success: function (response, status, xhr) {

// //             var bb = xhr.getResponseHeader('Pragma'); console.log(bb,2222)
// // console.log( xhr.getAllResponseHeaders())
            
// //         },
// //         error: function (xhr, status) {
           
// //         },
// //       xhrFields: {
// //         withCredentials: true
// //       }
// // }); 

// // $.ajax({
// //     url: "http://15.114.100.52:32072/basis/authsec/menu/tree/roles",
// //     type: "POST",
// //     beforeSend: function (request)
// //     {
// //         request.setRequestHeader("Authorization", "bearer 4000a778-2a92-41a7-8ab3-c795e831d005")
// //     },
// //     crossDomain: true,
// //     success: function (response) {
// //         alert("成功",response);
// //     },
// //     error: function (xhr, status) {
// //         alert("error");
// //     },
// //       xhrFields: {
// //         withCredentials: true
// //       }
// // }); 

//  const promise = new Promise((resolve,reject) => {
//      $.ajax({
//         url: `http://15.114.100.55:30072/uaa/oauth/token?grant_type=password&username=${userName}&password=${password}&client_id=ui&client_secret=12345`,
//         type: "POST",
//         beforeSend: function (request)
//         {
//             request.setRequestHeader("Authorization", "Basic " + btoa("ui:secret"))
//         },
//         crossDomain: true,
//         success: function (response) {
//             resolve("bearer " + response.access_token)
//         },
//         error: function (xhr, status) {
//            reject("获取token失败！")
//         }
//     }); 
//  });

// //  const promise1 = new Promise(next => next("bearer 38487982-429e-417a-9ca3-39c49965e8bc"))

//  function ajax(url, token, method?){
//       return new Promise((resolve, reject) => {
//           $.ajax({
//             url: `http://${environment.baseIp}:${environment.basePort}/${url}` ,
//             type: method || "GET",
//             beforeSend: function (request)
//             {
//                 request.setRequestHeader('Authorization', token)
//             },
//             crossDomain: true,
//             success: function (response) {
//                 resolve(response.resultContent)
//             },
//             error: function (xhr, status) {
//                 reject("获取数据失败")
//             }
//         }); 
//       });
//  };


// promise.then(token => Promise.all([
//     ajax("basis/authsec/mpp/user/current", token),    //获取当前登录用户信息
//     // ajax("basis/authsec/mpp/currentEnterpriseId", token)   // 获取用户企业id
// ]))
// .then(arr => {
//     sessionStorage["userInfo"] = JSON.stringify(arr[0]);
//     // sessionStorage["userEnterpriseId"] = JSON.stringify(arr[1]);
// });




// export const environment = {
// 	production: false,
// 	baseIp : "15.114.100.55",
// 	basePort : "30072",
//     jwt : promise
// }