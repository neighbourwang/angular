// `ng build --env=prod` then `environment.prod.ts` will be used instead.

export const environment = {
	production: true ,
	baseIp : '10.1.8.126',
	basePort : '30072',
	jwt : new Promise(next => { next("bearer 0c95311a-db7d-4d36-b12c-0a6fc37109bc") })
};
