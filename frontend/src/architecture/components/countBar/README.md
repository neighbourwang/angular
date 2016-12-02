# 加减控制数字组件

共有六个属性：

value : number   输入的值  可选 默认0
step : number   步长  可选 默认1
max : number    最大值  可选 默认不限
min : number    最小值  可选 默认不限   
disabled : boolean  是否禁止  可选 默认不禁止   
stepCheck : boolean   输入表单的时候是否强制设置为步长的倍数 可选  默认false


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
