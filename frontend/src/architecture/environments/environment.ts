// The file contents for the current environment will overwrite these during build.
// The build system defaults to the wdev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

// $.ajax({
//     url: "http://15.114.100.52:32072/uaa/oauth/token?grant_type=password&username=gavin@hpe.com&password=12345&client_id=ui&client_secret=12345",
//     type: "POST",
//     beforeSend: function (request)
//     {
//         request.setRequestHeader("Authorization", "Basic " + btoa("ui:secret"))
//     },
//     crossDomain: true,
//     success: function (response) {
//         var resp = JSON.parse(response)
//         alert(resp.status);
//     },
//     error: function (xhr, status) {
//         alert("error");
//     }
// });

export const environment = {
	production: false,
	baseIp : "15.114.100.55",
	basePort : "30072",
	jwt : new Promise(next => { next("bearer 0c95311a-db7d-4d36-b12c-0a6fc37109bc") })
};
