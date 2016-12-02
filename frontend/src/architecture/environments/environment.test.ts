// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=test` then `environment.test.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
	production: true ,
	baseIp : '15.114.100.55',
	basePort : '31072',
	jwt : new Promise(next => { next("bearer 0c95311a-db7d-4d36-b12c-0a6fc37109bc") })
};
