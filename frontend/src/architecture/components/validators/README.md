

2017-03-29 更新  
  
在constructor里添加 this.v.result = {};  使初始化组件的时候设置result为空,避免重新载入组件的时候错误提示还存在   
查看[用法](https://github.hpe.com/FoxCloud/frontend/blob/master/frontend/src/architecture/components/validators/README.md#用法)  


# 表单验证类

## 验证方式(可以多重验证)(除了isUnBlank，其它的方法空值验证返回均为true)：

| 方法             | 参数                                     | 描述                        |
| -------------- | -------------------------------------- | ------------------------- |
| isBase         | 无                                      | 基本的验证 不含特殊字符          |
| isUnBlank      | 无                                      | 非空验证                      |
| isNumber       | 无                                      | 是否为数字                  |
| isInteger      | 无                                      | 是否是整数             |
| isMoblie       | 无                                      | 是否为手机号                  |
| isTel          | 无                                      | 是否是电话号码               |
| isUrl          | 无                                      | 是否是url             |
| isInstanceName | 无                                      | 2-68个字符，以大小写字母或中文开头     |
| isPassword     | 无                                      | 同时包括三项（大写字母，小写字母，数字和特殊符号）|
| isEmail        | 无                                      | 是否是email                 |
| isIpaddress    | 无                                      | 是否是IP地址                 |
| min            | (min:number)                           | 数字的最小值                    |
| max            | (max:number)                           | 数字的最大值                    |
| range          | (min:number, max:number)               | 数字的范围                     |
| minLength      | (min:number)                           | 字符的长度最小值                  |
| maxLength      | (max:number)                           | 字符串长度的最大值                 |
| lengthRange    | (min:number, max:number)               | 字符串长度范围                   |
| uuid           | (version:"3"\|"4"\|"5"\|"all" = "all") | uuid                      |
| equalTo        | (target:any)                           | 等于某个值                     |
| equalToArr        | (arr:any[])                           | 在某个数组里含有                     |
| notEqualTo        | (target:any)                           | 不等于某个数                     |
| notEqualToArr        | (arr:any[])                           | 不在某个数组里含有                     |
| startAtValue        | (value:string)                           | 开头必须包含某个值                     |
| notStartAtValue        | (value:string)                           | 开头不能包含某个值                     |


##用法：


typescript:

引入Validation和验证model:ValidationRegs

```javascript
import { Validation, ValidationRegs } from '../../../../architecture';
```

constructor里面加入装饰类Validation

```javascript
constructor(
		private v: Validation
	){
	    this.v.result = {};   //初始化组件的时候设置result为空
	}
```

加入以下函数：

```javascript
checkForm(key?:string) {
		let regs:ValidationRegs = {  //regs是定义规则的对象
			email: [this.email, [this.v.isEmail, this.v.isUnBlank], "Email输入不正确"], 
  			//验证email
			baseInput: [this.baseInput, [this.v.isBase, this.v.isUnBlank], "不能包含特殊字符"],
  			//两次验证[基础的验证不能包含特殊字符，不能为空]
			phone: [this.phone, [this.v.isMoblie, this.v.isUnBlank], "手机号码输入不正确"],
  			//手机号码验证
			password: [this.password, [this.v.isPassword, this.v.lengthRange(8, 16)], "密码输入不正确"],
  			//两次验证[密码验证，8-16个字]
			passwordCheck: [this.passwordCheck, [this.v.equalTo(this.password)], "两次密码输入不一致"],
  			//再次输入密码验证
			username: [this.username, [this.v.isInstanceName, this.v.isBase], "用户名输入格式不正确"],
  			//云主机名称验证
			numberRange: [this.numberRange, [this.v.range(10, 80)], "数字范围不对"],
  			//数字范围10-80
		}

		return this.v.check(key, regs);
	}
```
**注一：select或者rodio等之类的验证直接进行isUnBlank非空验证即可**  
**注二：regs为定义规则的对象需要和ValidationRegs保持对应，格式为**

```javascript
ValidationRegs {
    [key: string] : [string|number, Array<Function> , string];
  	//验证属性的名称  [需要验证的值，验证的方法(为一个数组可以多重验证)，验证失败的提示]
}
```

**checkForm函数里有一个参数key，是指要验证的值，如果我在模板里要验证username**

```html
<input type="text" [(ngModel)]="username" (ngModelChange)="checkForm('username')" placeholder="用户名" class="form-control">
```

验证的结果保存在 this.v.result里面和regs里面的key对应，如果验证正确值为空，如果验证失败，值为错误提示.

例如如果用户名验证失败，则结构为：

```
console.log(this.v.result);
{
  email:"",
  baseInput:"",
  phone:"",
  passwordCheck:"",
  username:"用户名输入格式不正确",
  numberRange:""
}
```

那么，我可以在模板里自由的提示一些东西：

```html
<div class="form-group has-feedback" [ngClass]="{'has-error':v.result.username}">
		<input type="text" [(ngModel)]="email" (ngModelChange)="checkForm('username')" placeholder="用户名" class="form-control">
		<span *ngIf="v.result.username" class="glyphicon glyphicon-remove form-control-feedback"></span>
		<div *ngIf="v.result.username" class="alert alert-danger" role="alert">{{v.result.username}}</div>
</div>
```

**checkForm函数的参数key如果不传入的话，则验证所有表单：**

**在提交form表单的时候需要用到**

```html
<button type="submit" (click)="submitForm()" class="btn btn-default">Submit</button>
```

```javascript
submitForm() {
	let errorMessage = this.checkForm();   //不传入参数则验证regs里所有规则
	if(errorMessage) return alert(errorMessage);
	console.log("通过！");
}
```





## 完整的例子

html：

```html
<div style="width:500px">
	
	<div class="form-group has-feedback" [ngClass]="{'has-error':v.result.email}">
		<input type="text" [(ngModel)]="email" (ngModelChange)="checkForm('email')" placeholder="邮箱" class="form-control">
		<span *ngIf="v.result.email" class="glyphicon glyphicon-remove form-control-feedback"></span>
		<div *ngIf="v.result.email" class="alert alert-danger" role="alert">{{v.result.email}}</div>
	</div>

	<div class="form-group has-feedback" [ngClass]="{'has-error':v.result.baseInput}">
		<input type="text" [(ngModel)]="baseInput" (ngModelChange)="checkForm('baseInput')" placeholder="基本表单不包含特殊字符" class="form-control">
	</div>

	<div class="form-group has-feedback" [ngClass]="{'has-error':v.result.phone}">
		<input type="text" [(ngModel)]="phone" (ngModelChange)="checkForm('phone')" placeholder="手机号" class="form-control">
	</div>

	<div class="form-group has-feedback" [ngClass]="{'has-error':v.result.password}">
		<input type="text" [(ngModel)]="password" (ngModelChange)="checkForm('password')" placeholder="密码" class="form-control">
	</div>

	<div class="form-group has-feedback" [ngClass]="{'has-error':v.result.passwordCheck}">
		<input type="text" [(ngModel)]="passwordCheck" (ngModelChange)="checkForm('passwordCheck')" placeholder="再次输入密码" class="form-control">
	</div>

	<div class="form-group has-feedback" [ngClass]="{'has-error':v.result.username}">
		<input type="text" [(ngModel)]="username" (ngModelChange)="checkForm('username')" placeholder="用户名" class="form-control">
	</div>

	<div class="form-group has-feedback" [ngClass]="{'has-error':v.result.numberRange}">
		<input type="text" [(ngModel)]="numberRange" (ngModelChange)="checkForm('numberRange')" placeholder="大于10小于80" class="form-control">
	</div>

	<button type="submit" (click)="submitForm()" class="btn btn-default">Submit</button>

</div>
```

javascript：

```javascript
constructor(
		private v: Validation
	){
	    this.v.result = {};  //初始化组件的时候设置result为空
	}
	
checkForm(key?:string) {
		let regs:ValidationRegs = {  //regs是定义规则的对象
			email: [this.email, [this.v.isEmail, this.v.isUnBlank], "Email输入不正确"], 
  			//验证email
			baseInput: [this.baseInput, [this.v.isBase, this.v.isUnBlank], "不能包含特殊字符"],
  			//两次验证[基础的验证不能包含特殊字符，不能为空]
			phone: [this.phone, [this.v.isMoblie, this.v.isUnBlank], "手机号码输入不正确"],
  			//手机号码验证
			password: [this.password, [this.v.isPassword, this.v.lengthRange(8, 16)], "密码输入不正确"],
  			//两次验证[密码验证，8-16个字]
			passwordCheck: [this.passwordCheck, [this.v.equalTo(this.password)], "两次密码输入不一致"],
  			//再次输入密码验证
			username: [this.username, [this.v.isInstanceName, this.v.isBase], "用户名输入格式不正确"],
  			//云主机名称验证
			numberRange: [this.numberRange, [this.v.range(10, 80)], "数字范围不对"],
  			//数字范围10-80
		}

		return this.v.check(key, regs);
	}
    
    submitForm() {
		var errorMessage = this.checkForm();
		if(errorMessage) return alert(errorMessage);
		console.log("通过！");
	}
```
