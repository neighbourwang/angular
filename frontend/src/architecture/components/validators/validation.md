# 表单验证类

用法：

例子

typescript:

```javascript
checkForm(key?:string) {
		let regs:ValidationRegs = {
			email: [this.email, [this.v.isEmail], "Email输入不正确"],
			baseInput: [this.baseInput, [this.v.isBase, this.v.isUnBlank], "不能包含特殊字符"],
			phone: [this.phone, [this.v.isMoblie], "手机号码输入不正确"],
			password: [this.password, [this.v.isPassword, this.v.lengthRange(8, 16)], "密码输入不正确"],
			passwordCheck: [this.passwordCheck, [this.v.equalTo(this.password)], "两次密码输入不一致"],
			username: [this.username, [this.v.isInstanceName, this.v.isBase], "用户名输入格式不正确"],
			numberRange: [this.numberRange, [this.v.range(10, 80)], "数字范围不对"],
		}

		return this.v.check(key, regs);
	}
```





#### 验证方式：

| 方法             | 参数                                     | 描述                        |
| -------------- | -------------------------------------- | ------------------------- |
| isBase         | 无                                      | 基本的验证 不含特殊字符 可为空          |
| isUnBlank      | 无                                      | 非空验证                      |
| isNumber       | 无                                      | 是否为数字                     |
| isMoblie       | 无                                      | 是否为手机号                    |
| isTel          | 无                                      | 是否是电话号码                   |
| isUrl          | 无                                      | 是否是url                    |
| isInstanceName | 无                                      | 2-68个字符，以大小写字母或中文开头       |
| isPassword     | 无                                      | 同时包括三项（大写字母，小写字母，数字和特殊符号） |
| isEmail        | 无                                      | 是否是email                  |
| min            | (min:number)                           | 数字的最小值                    |
| max            | (max:number)                           | 数字的最大值                    |
| range          | (min:number, max:number)               | 数字的范围                     |
| minLength      | (min:number)                           | 字符的长度最小值                  |
| maxLength      | (max:number)                           | 字符串长度的最大值                 |
| lengthRange    | (min:number, max:number)               | 字符串长度范围                   |
| uuid           | (version:"3"\|"4"\|"5"\|"all" = "all") | uuid                      |
| equalTo        | (target:any)                           | 等于某个值                     |








### 例子

html：

```html
<count-bar 
            [step]=100 
            [max]=2000000 
            [min]=0 
            [disabled]=false 
            [stepCheck]=false
            [value]=0 #varName   (output)="outputValue($event)"></count-bar>
```

javascript：

```javascript
//获取count-bar值
outputValue(e){
    console.log(e);
}
//声明本地变量方式调用组件方法，控制是for可编辑;
this.varName.unEdit();
this.varName.editable();
```