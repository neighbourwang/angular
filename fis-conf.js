fis.set('project.ignore', ['*/node_modules/**','node_modules/**','fis-conf.js', '**/README.md', '*/e2e/**', '*/src/module/**', '*/src/architecture/components/**', '*/src/architecture/assets/**', '*/src/architecture/core/**', '*/src/architecture/pipe/**', '*/src/architecture/environments/**', '*/foxcloud-dist/**']);

const RegBackend = /(?:backend\/dist\/(.*)\.*)|(?:backend-portal\/dist\/(.*)\.*)|(?:backend-portal(\/public\/.*)?\.*)|(?:backend\/src(\/architecture\/translate\/.*)?\.*)/i;
const RegFrontend = /(?:frontend\/dist\/(.*)\.*)|(?:frontend-portal\/dist\/(.*)\.*)|(?:frontend-portal(\/public\/.*)?\.*)|(?:frontend\/src(\/architecture\/translate\/.*)?\.*)/i;

const releaseToLocal = (name, path, reg) =>    //发布到本地
	fis.media(name).match(reg, {
		release: '/$1$2$3$4',
		deploy: fis.plugin('local-deliver', {
			to: path
		})
	});

const releaseServer = (name, path, reg, ip) =>    //发布到服务器
	fis.media(name).match(reg, {
		release: '/$1$2$3$4',
		deploy: fis.plugin('http-push', {
			receiver: 'http://'+ ip +'/receiver',
			to: path
		})
	});

//后台发布到开发环境
releaseServer("backendDev", "/root/nginx/foxcloud/adm", RegBackend, "15.114.100.36:8999");
// releaseServer("backendDev", "/etc/nginx/foxcloud/adm", RegBackend, "16.187.145.52:8999");
//前台发布到开发环境
releaseServer("frontendDev", "/root/nginx/foxcloud/mpp", RegFrontend, "15.114.100.36:8999");
// releaseServer("frontendDev", "/etc/nginx/foxcloud/mpp", RegFrontend, "16.187.145.52:8999");
// 后台发布到测试环境
releaseServer("backendTest", "/root/nginx/foxcloud/backend", RegBackend, "15.114.100.65:8999");
// releaseServer("backendTest", "/etc/nginx/foxcloud/backend", RegBackend, "16.187.145.52:8999");
//前台发布到测试环境
releaseServer("frontendTest", "/root/nginx/foxcloud/frontend", RegFrontend, "15.114.100.65:8999");
// releaseServer("frontendTest", "/etc/nginx/foxcloud/frontend", RegFrontend, "16.187.145.52:8999");


//boe开发环境发布到本地
releaseToLocal("backendBoeprod", '../foxcloud-dist/boeprod/backend', RegBackend);
releaseToLocal("frontendBoeProd", '../foxcloud-dist/boeprod/frontend', RegFrontend);
//boe演示环境发布到本地
releaseToLocal("backendBoe", '../foxcloud-dist/boe/backend', RegBackend);
releaseToLocal("frontendBoe", '../foxcloud-dist/boe/frontend', RegFrontend);
