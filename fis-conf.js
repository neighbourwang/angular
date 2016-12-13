fis.set('project.ignore', ['*/node_modules/**','node_modules/**','fis-conf.js', '*/e2e/**', '*/src/**']);


//后台发布到开发环境
fis.media('backendDev').match(/(?:backend\/dist\/(.*)\.*)|(?:backend-portal\/dist\/(.*)\.*)|(?:backend-portal(\/public\/.*)?\.*)/i, {
	release: '/$1$2$3',
	deploy: fis.plugin('http-push', {
		receiver: 'http://16.187.145.3:8999/receiver',
		to: '/etc/nginx/foxcloud/adm'
	})
});

//前台发布到开发环境
fis.media('frontendDev').match(/(?:frontend\/dist\/(.*)\.*)|(?:frontend-portal\/dist\/(.*)\.*)|(?:frontend-portal(\/public\/.*)?\.*)/i, {
	release: '/$1$2$3',
	deploy: fis.plugin('http-push', {
		receiver: 'http://16.187.145.3:8999/receiver',
		to: '/etc/nginx/foxcloud/mpp'
	})
});

//前台发布到测试环境
fis.media('backendTest').match(/(?:backend\/dist\/(.*)\.*)|(?:backend-portal\/dist\/(.*)\.*)|(?:backend-portal(\/public\/.*)?\.*)/i, {
	release: '/$1$2$3',
	deploy: fis.plugin('http-push', {
		receiver: 'http://16.187.145.3:8999/receiver',
		to: '/etc/nginx/foxcloud/frontend'
	})
});

//后台发布到测试环境
fis.media('frontendTest').match(/(?:frontend\/dist\/(.*)\.*)|(?:frontend-portal\/dist\/(.*)\.*)|(?:frontend-portal(\/public\/.*)?\.*)/i, {
	release: '/$1$2$3',
	deploy: fis.plugin('http-push', {
		receiver: 'http://16.187.145.3:8999/receiver',
		to: '/etc/nginx/foxcloud/backend'
	})
});