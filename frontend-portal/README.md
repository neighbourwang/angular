

#项目所用技术
1. [ejs](http://www.embeddedjs.com/)  一种html模板引擎，直接用JavaScript渲染html   - 必须会用
2. [less](http://less.bootcss.com/)  css的超集   - 必须会用
3. [webpack](http://zhaoda.net/webpack-handbook/)  打包神器 - 需要了解

#启动项目
1. npm isntall 安装依赖
2. npm start
3. 打开浏览器 [http://localhost:4100](http://localhost:4100)

#项目构造

···
|--- public    //公共的资源文件夹
|--- src       //开发的文件夹
	|--- common     //公共部分的目录
		|--- cm-name  //公共的组件
		|--- ....
		|--- common.js  //公共的js
		|--- const.js   //js常量
		|--- const.less //less常量
	|--- login      //各个入口的目录
	|--- ....
|--- dist      //发布时生成的文件夹
|--- package.json   //npm的package文件
|--- webpack.config.dev.js   //build项目的时候用到的这个webpack配置
|--- webpack.config.js       //开发项目的时候用到的这个webpack配置
···

#开发流程
1.


#发布项目
1.删除项目下的dist文件将爱
2.npm run build
3.把项目下生成的dist里面的内容上传到服务器网站的根目录
4.把public文件夹放到服务器网站的根目录