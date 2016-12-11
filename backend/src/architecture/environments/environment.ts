// The file contents for the current environment will overwrite these during build.
// The build system defaults to the wdev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

 const promise = new Promise((resolve,reject) => {
     $.ajax({
        url: "http://15.114.100.52:32072/uaa/oauth/token?grant_type=password&username=gavin@hpe.com&password=12345&client_id=ui&client_secret=12345",
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
 })
 
export const environment = {
	production: false,
	baseIp : "15.114.100.55",
	basePort : "30072",
	jwt : promise
};
