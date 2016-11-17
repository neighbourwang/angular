# 加减控制数字组件

共有六个属性：

step : number   步长  
max : number    最大值  
min : number    最小值    
disabled : boolean  是否禁止  
value : number   输入的值  


### 例子

html：

```html
<count-bar 
            [step]=100 
            [max]=2000000 
            [min]=0 
            [disabled]=false 
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
