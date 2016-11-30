# popover组件

![angular 2 popover](https://raw.githubusercontent.com/pleerock/ng2-popover/master/resources/popover-example.png)



### 使用方法

html:

```html
<button [popover]="myPopover">element on which this popover is applied.</button>

<popover-content #myPopover 
                title="Popover title" 
                placement="left"
                [animation]="true" 
                [closeOnClickOutside]="true" >
    <b>Very</b> <span style="color: #C21F39">Dynamic</span> <span style="color: #00b3ee">Reusable</span>
    <b><i><span style="color: #ffc520">Popover With</span></i></b> <small>Html support</small>.
</popover-content>


<!-- 可以通过myPopover.popover?.visible 来获取content是否已经隐藏 -->
<!-- <button [ngClass]="{'active': myPopover.popover?.visible}" ></button> -->
```

或者 

```html
<div popover="content to be shown in the popover"
     popoverTitle="Popover header"
     popoverPlacement="top"
     [popoverOnHover]="false"
     [popoverCloseOnClickOutside]="true"
     [popoverCloseOnMouseOutside]="false"
     [popoverDisabled]="false"
     [popoverAnimation]="true"
     [popoverDismissTimeout]="1000">
    element on which this popover is applied.
</div>
```

如果在循环里用，如下：

```html
<li  *ngFor="let i of [1,2,3,4,5]">
    <button  class="btn btn-default" [popover]="popover">
        点我
    </button>
    <popover-content #popover [closeOnClickOutside]="true" >
        {{i}}
    </popover-content>
</li>
```

### 可选参数



- `<popover-content>`:
  - `placement="top|bottom|left|right|auto|auto top|auto bottom|auto left|auto right"` popover弹出的方向. 当带有auto时候，如果显示的空间不够，会弹向反方向. Default is **"bottom"**.
  - `[animation]="true|false"` 弹出的时候是否有动画效果. Default is **true**.
  - `[closeOnMouseOutside]="true|false"` 当鼠标移到popover之外的地方会隐藏. Default is **false**.
  - `[closeOnClickOutside]="true|false"` 当鼠标点击popover之外的地方会隐藏. Default is **false**.

* `<div popover>`:
    * `popover="string"` 提示的信息.
    * `popoverTitle="string"` 信息等标题.
    * `popoverPlacement="top|bottom|left|right|auto|auto top|auto bottom|auto left|auto right"` 弹出的方向，当带有auto时候，如果显示的空间不够，会弹向反方向. Default is **"bottom"**.
    * `[popoverDisabled]="true|false"` 不弹出. Default is **false**
    * `[popoverAnimation]="true|false"` 弹出是否带有动画. Default is **true**.
    * `[popoverOnHover]="true|false"` 是否鼠标hover就弹出. Default is **false**.
    * `[popoverCloseOnMouseOutside]="true|false"` 当鼠标移到popover之外的地方会隐藏. Default is **false**.
    * `[popoverCloseOnClickOutside]="true|false"` 当鼠标点击popover之外的地方会隐藏. Default is **false**.
    * `[popoverDismissTimeout]="number"` 过多少毫秒会自动隐藏. Default is **0**, 意思是不消失.


### 例子

[例子](https://github.hpe.com/FoxCloud/frontend/blob/master/frontend/src/module/cloud-host-service/cloud-drive/template/cloud-drive-order.component.html)
