# 前端国际化使用的是基于 angular2 的 ng2-translate。 
https://github.com/ocombe/ng2-translate


## 1.安装 (必须安装 4.2.0版本,不然要报错)
在项目目录下执行 npm --save install ng2-translate@4.2.0

## 2.引入 

### 1.在一个被所有组件都引用过的模块中引入 ng2-translate。
例如 fronted项目中的 src/architecture/component/common.module.ts中引用如下：

    import { HttpModule } from '@angular/http';
    import { TranslateModule } from 'ng2-translate';
    
    @NgModule({
        imports: [
            HttpModule,
            TranslateModule.forRoot()
        ]
        exports: [
            HttpModule,
            TranslateModule
        ]
    })

### 2.找到 app.module.ts 中的 @NgModule({ bootstrap: [ 启动组件 ] }) 中的启动组件。
例如：fronted项目中的启动模块为 src/architecture/component/site,
在 site.component.ts 文件中引用 ：

    import { TranslateService } from 'ng2-translate';
    import { TranslateEN } from '../../../../architecture/translate/translateEN';
    import { TranslateCN } from '../../../../architecture/translate/translateCN';

    constructor(
        public translate: TranslateService
    ) {
        translate.setTranslation('EN',  TranslateEN);
        translate.setTranslation('CN',  TranslateCN);

        translate.addLangs(["EN", "CN"]);
        translate.setDefaultLang('CN');

        //这里是测试，选择网页语言的代码
        let browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/EN|CN/) ? browserLang : 'CN');
    }

## 3.使用
### 1.在 src/architecture/translate 中添加和编辑 语言映射文件

### 2.html文件添加语言映射的代码方式   {{ 'key' | translate }}   如下：

    <div>{{'DIALOG.CONFIRM' | translate }}</div>

（其中'DIALOG.CONFIRM'相当于映射文件中的key值。）

### 3.ts文件添加语言映射的代码方式    'key^^^param^^^param^^^param^^^param.....'  ,'^^^'前为要翻译的字段，后为需要带的参数,可以传递多个参数  如下：（可以参考 org-mng-list.component.ts）


    //这个为不带参数直接传值。
    this.notice.open('ORG_MNG_LIST.OPERATION_ERROR', 'ORG_MNG_LIST.ORGANIZATIONAL_STATUS_IS_ENABLED')

    //这个为参数传值，变量跟在 '^^^' 后面。
    this.confirmMessage = "ORG_MNG_LIST.YOU_CHOOSE_TO_ENABLE_VALUE_PLEASE_CONFIRM^^^" + org.name;

### 4.translateXXX.ts的写法   key: 'xxxx{{value_1}}xxxxxx{{value_2}}{{value_3}}'  ,{{value}}为传入的参数，在如下

    ORG_MNG_LIST: {

        OPERATION_ERROR: '操作错误',

        //带参数的映射写法
        YOU_CHOOSE_TO_ENABLE_VALUE_PLEASE_CONFIRM: '您选择启用{{value}}，请确认',
        
    }

   
### 5.translate 在html template中的写法   key: 'xxxx{{value_1}}xxxxxx{{value_2}}{{value_3}}'  ,{{value}}为传入的参数，在如下
 
 字典中定义为
        MY_MSG: '您选择启用{{value}}, 请确认; 如果{{value}}确认，用户{{value2}}将能够在订购中选择此镜像.',
 
 html中代码：{{'MY_MSG' | translate:{value:"hee",value2:"3333"} }}

 html呈现结果：VMware您选择启用hee, 请确认; 如果hee确认，用户3333将能够在订购中选择此镜像.


 注意 参数中最后三个“}}}”必须写成“} }}”，否则会编译错误