# 点击元素以外触发点事件

作用：点击某个元素以外所触发的事件

用法如下：

html:

```html
<div (clickOutside)="onClickedOutside($event)">Click outside this</div>
```

ts：

```javascript
onClickedOutside($event){
    ...
}
```



