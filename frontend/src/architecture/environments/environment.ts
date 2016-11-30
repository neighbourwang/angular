// The file contents for the current environment will overwrite these during build.
// The build system defaults to the wdev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

// $.ajax({
//     url: "http://15.114.100.52:30077/uaa/oauth/token?grant_type=password&username=gavin@hpe.com&password=12345&client_id=ui&client_secret=12345",
//     type: "POST",
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
	baseIp : "",
	basePort : "",
	jwt : "bearer 9320afb2-d73e-490b-8028-202187aaf21b"
};
