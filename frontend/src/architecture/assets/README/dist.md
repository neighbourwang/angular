# 项目发布

前端部署流程：

一、安装依赖（只需要执行一次）。

1 .项目下的，backend（后台），backend-portal（后台登录页），frontend （前台），frontend-portal（首页和前台登录页）。

四个子项目，需要进入并执行命令 npm install 安装依赖。

2. 全局安装fis3  执行命令  npm install -g fis3


二、执行命令发布到相应的环境  

1. 拉取最新的代码，打相应的tag 
2. 进入项目的最外层目录(有fis-conf.js的那层)
3. 根据需求执行相应的命令：

npm run release:backend    (编译后台并发布到开发环境)
npm run release:frontend    (编译前台并发布到开发环境)
npm run release:all               (编译前台与后台并发布到开发环境)

npm run release:backend:qa	 (编译后台并发布到测试环境)
npm run release:frontend:qa	(编译前台并发布到测试环境)
npm run release:all:qa 			(编译前台与后台并发布到测试环境)



ps: 请大家先安装依赖，发布的时候直接执行发布命令即可
