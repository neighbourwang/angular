# 项目目录

```
四个子项目

|--backend   //foxcloud后台
|--backend-portal   //后台的登录页面
|--frontend   //foxcloud前台
|--frontend-portal   //前台的首页与登录页
```

# 启动

1. 分别进入四个目录
2. npm install （安装所有依赖） 
3. npm start   （启动项目）
4. 打开http://localhost:4200/(后台)     
http://localhost:4201/(后台登录)  
http://localhost:4000/(前台)  
http://localhost:4001/(前台首页登陆页)


# 项目发布

[点击进入项目发布页面](https://github.houston.entsvcs.net/FoxCloud/frontend/tree/master/frontend/src/architecture/assets/README/dist.md)

# 项目公共组件

|    组件名称     |  类型  |      负责人      | 开发进度 |                   用法链接                   |
| :---------: | :--: | :-----------: | :--: | :--------------------------------------: |
|    分页组件     |  组件  |  zi.qing-ren  |  完成  | [点击](https://github.houston.entsvcs.net/FoxCloud/frontend/blob/master/frontend/src/architecture/components/pagination/README.md) |
|    确认框组件    |  组件  |  zi.qing-ren  |  完成  | [点击](https://github.houston.entsvcs.net/FoxCloud/frontend/tree/master/frontend/src/architecture/components/dialog#确认框组件) |
|    警告框组件    |  组件  |  zi.qing-ren  |  完成  | [点击](https://github.houston.entsvcs.net/FoxCloud/frontend/tree/master/frontend/src/architecture/components/dialog#警告框组件) |
| 整屏loading组件 |  组件  |  zi.qing-ren  |  完成  | [点击](https://github.houston.entsvcs.net/FoxCloud/frontend/blob/master/frontend/src/architecture/components/spinner/README.md) |
|   上传文件组件    |  组件  | cao.zong-ying | 准备开发 |                    暂无                    |
|  加减控制数字组件   |  组件  | wang.yao-yao  |  完成  | [点击](https://github.houston.entsvcs.net/FoxCloud/frontend/blob/master/backend/src/architecture/components/countBar/README.md) |
|   日期选择组件    |  组件  |  zi.qing-ren  |  完成  | [点击](https://github.houston.entsvcs.net/FoxCloud/frontend/blob/master/frontend/src/architecture/components/date-picker/README.md) |
|   表单验证组件    |  组件  |  zi.qing-ren  | 完成 |                    [点击](https://github.houston.entsvcs.net/FoxCloud/frontend/blob/master/frontend/src/architecture/components/validators/README.md)                    |
|  popover组件  |  组件  |  zi.qing-ren  |  完成  | [点击](https://github.houston.entsvcs.net/FoxCloud/frontend/tree/master/frontend/src/architecture/components/popover) |
|    图表组件     |  组件  |  zi.qing-ren  |  完成  | [点击](https://github.houston.entsvcs.net/FoxCloud/frontend/tree/master/frontend/src/architecture/assets/README/chart.md) |
| 点击元素以外触发事件  |  指令  |  zi.qing-ren  |  完成  | [点击](https://github.houston.entsvcs.net/FoxCloud/frontend/tree/master/frontend/src/architecture/assets/README/clickoutside.md) |
| 鼠标滑过显示详细文字  |  组件  |  zi.qing-ren  |  完成  | [点击](https://github.houston.entsvcs.net/FoxCloud/frontend/blob/master/frontend/src/architecture/components/staticTooltip/README.mdown) |
| 标签表单组件  |  组件  |  zi.qing-ren  |  完成  | [点击](https://github.houston.entsvcs.net/FoxCloud/frontend/blob/master/frontend/src/architecture/components/tagInput/README.md) |



### 

# 项目的公共pipe

### 1.保留小数点的位数

**pipe名称**：decimalPlaces

**接收参数**：(length : number = 2)  保存小数点后的位数，默认两位

**用法**：

```javascript
{{22.1122232323 | decimalPlaces}} ===> 22.11   //默认保留两位
{{22.1122232323 | decimalPlaces : 4}} ===> 22.1122   //手动设置保留的位数
```



### 2.时间戳转为时间

**pipe名称**：formatData

**接收参数**：无

**用法**：

```javascript
{{1497654369000 | formatData}} ===> 2017-06-17 07:06:09
```



### 3.把对象转换为数组

**pipe名称**：objectToArr

**接收参数**：无

**用法**：

```html
<!-- object是一个对象 通过这个pipe可以循环它 -->
<tr>           
  <td *ngFor="#key of object | objectToArr">{{key}}: {{object[key]}}</td>
</tr>
```



### 4.数组排序

**pipe名称**：orderBy

**接收参数**：(arg:string)  //属性名称，按这个属性名排序，前面加叹号为倒序

**用法**：

```html
<!-- 按它的属性a排序 正序 -->
<div *ngFor="let a of [{a:1,b:2},{a:8,b:2},{a:4,b:2}] | orderBy:'a'">{{a.a}}</div>
<!-- 按它的属性a排序 倒序 参数前面加一个叹号 -->
<div *ngFor="let a of [{a:1,b:2},{a:8,b:2},{a:4,b:2}] | orderBy:'!a'">{{a.a}}</div>  
```



### 5.字典应用



**调用方法如下**：  


1.在你自己组件的service里面引入 SystemDictionaryService，并添加到constructor里面

```javascript
   import { SystemDictionaryService } from '../../../../architecture';

   constructor(
      private dict:SystemDictionaryServicei
   ) { };

   //设置你自己所需要的数据，如：
   dictProductType = this.dict.get({      //这里的调用的方法为promise 所以dictProductType是一个promise
      owner : "GLOBAL",
      field : “SERVICE_TYPE”    
   });
```


2.直接用替换后台发来的数据里面需要查字典的地方

```javascript
   {{cart.serviceType | dict:service.dictProductType | async}}

   //解读：cart.serviceType为调用后端的数据，一般是0，1，2之类的数字，后面是一个dict的管道，冒号后面的service.dictProductType是我们在service设置的promise，后面再加一个async的管道，就渲染出来的
```

   或者是用在循环出字典的地方

```html
   <div *ngFor="let v of service.dictProductType | async">{{v.displayValue}}</div>  
```

  ps： 如果用在compontent里面想通过某个code获取displayvalue，这样调用pipe

```javascript
import { dictPipe } from '../../../../architecture';

constructor(
  private dictPipe : dictPipe
) {}

test() {
    this.dictPipe.transform("1",this.service.dictProductType).then(res => console.log(res))
}
```



