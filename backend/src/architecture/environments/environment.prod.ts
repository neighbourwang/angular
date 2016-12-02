// `ng build --env=prod` then `environment.prod.ts` will be used instead.

export const environment = {
	production: true ,
	baseIp : '15.114.100.70',
	basePort : '32072',
	jwt : new Promise(next => { next("bearer 0c95311a-db7d-4d36-b12c-0a6fc37109bc") })
};
