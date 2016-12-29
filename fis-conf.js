fis.set('project.ignore', ['*/node_modules/**','node_modules/**','fis-conf.js', '*/e2e/**', '*/src/**']);

const RegBackend = /(?:backend\/dist\/(.*)\.*)|(?:backend-portal\/dist\/(.*)\.*)|(?:backend-portal(\/public\/.*)?\.*)/i;
const RegFrontend = /(?:frontend\/dist\/(.*)\.*)|(?:frontend-portal\/dist\/(.*)\.*)|(?:frontend-portal(\/public\/.*)?\.*)/i;

const releaseToLocal = (name, path, reg) =>    //发布到本地
	fis.media(name).match(reg, {
		release: '/$1$2$3',
		deploy: fis.plugin('local-deliver', {
			to: path
	  	})
	});

const releaseServer = (name, path, reg) =>    //发布到服务器
	fis.media(name).match(reg, {
		release: '/$1$2$3',
	  	deploy: fis.plugin('http-push', {
			receiver: 'http://16.187.145.52:8999/receiver',
			to: path
		})
	});

//后台发布到开发环境
releaseServer("backendDev", "/etc/nginx/foxcloud/adm", RegBackend);
//前台发布到开发环境
releaseServer("frontendDev", "/etc/nginx/foxcloud/mpp", RegFrontend);
//后台发布到测试环境
releaseServer("backendTest", "/etc/nginx/foxcloud/backend", RegBackend);
//前台发布到测试环境
releaseServer("frontendTest", "/etc/nginx/foxcloud/frontend", RegFrontend);


//boe开发环境发布到本地
releaseToLocal("backendBoeprod", '../foxcloud-dist/boeprod/backend', RegBackend);
releaseToLocal("frontendBoeProd", '../foxcloud-dist/boeprod/frontend', RegFrontend);
//boe演示环境发布到本地
releaseToLocal("backendBoe", '../foxcloud-dist/boe/backend', RegBackend);
releaseToLocal("frontendBoe", '../foxcloud-dist/boe/frontend', RegFrontend);
