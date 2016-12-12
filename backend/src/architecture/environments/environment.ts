// The file contents for the current environment will overwrite these during build.
// The build system defaults to the wdev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

const userName = "gavin@hpe.com",
      password = "12345"

const promise = new Promise((resolve,reject) => {
 $.ajax({
    url: `http://15.114.100.52:32072/uaa/oauth/token?grant_type=password&username=${userName}&password=${password}&client_id=ui&client_secret=12345`,
    type: "POST",
    beforeSend: function (request)
    {
        request.setRequestHeader("Authorization", "Basic " + btoa("ui:secret"))
    },
    crossDomain: true,
    success: function (response) {
        resolve("bearer " + response.access_token)
    },
    error: function (xhr, status) {
       reject("获取token失败！")
    }
}); 
});

 function ajax(url, token, method?){
      return new Promise((resolve, reject) => {
          $.ajax({
            url: `http://${environment.baseIp}:${environment.basePort}/${url}` ,
            type: method || "GET",
            beforeSend: function (request)
            {
                request.setRequestHeader('Authorization', token)
            },
            crossDomain: true,
            success: function (response) {
                resolve(response.resultContent)
            },
            error: function (xhr, status) {
                reject("获取数据失败")
            }
        }); 
      });
 };


promise.then(token => Promise.all([
    ajax("basis/authsec/adm/user/current", token),    //获取当前登录用户信息
    // ajax("basis/authsec/adm/currentEnterpriseId", token)   // 获取用户企业id
]))
.then(arr => {
    sessionStorage["userInfo"] = JSON.stringify(arr[0]);
    // sessionStorage["userEnterpriseId"] = JSON.stringify(arr[1]);
})


export const environment = {
	production: false,
	baseIp : "15.114.100.55",
	basePort : "30072",
    jwt : promise
}