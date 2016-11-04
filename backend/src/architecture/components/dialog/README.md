# 确认框组件

共有六个属性：

of(可选) ：点击取消的事件

cf(可选) ：点击确定的事件

title(可选) ：确认框的标题  默认为：提示

msg(**必选**) ：确认框的内容 

ct(可选) ：确认按钮的名称  默认为：确定

ot(可选) ：取消按钮的名称  默认为：取消 



### 例子

html：

```html
<fc-confirm #confirm 
            title="{{modalTitle}}" 
            msg="{{modalMessage}}" 
            ot="{{modalOKTitle}}" 
            (of)="cancel(1)" 
            ct="{{modalCancelTitle}}" 
            (cf)="confirm(0)"></fc-confirm>
```

javascript：

```javascript
import { ConfirmComponent } from '../../../../architecture';

export class testComponent implements OnInit {
	@ViewChild('confirm');
	private confirmDialog: ConfirmComponent;
     
     
    ...
    show() {
       this.modalTitle = "标题";
       this.modalMessage = "内容";
       this.modalOKTitle = "确定按钮";
       this.modalCancelTitle = "取消按钮";
       this.confirmDialog.open();
    }
}
```



# 警告框组件

共有六个属性：

of(可选) ：点击确定的事件

cf(可选) ：点击取消的事件

title(可选) ：确认框的标题  默认为：提示

msg(**必选**) ：确认框的内容 

ot(可选) ：取消按钮的名称  默认为：确定 



### 例子

html：

```html
<fc-notice #notice 
           title="{{modalTitle}}" 
           msg="{{modalMessage}}" 
           ot="{{modalOKTitle}}" 
           (of)="cancel(0)"></fc-notice>
```

javascript：

```javascript
import { NoticeComponent } from '../../../../architecture';

export class testComponent implements OnInit {
	@ViewChild('notice')
	private noticeDialog: NoticeComponent;
     
    ...
    show() {
       this.modalTitle = "标题";
       this.modalMessage = "内容";
       this.modalOKTitle = "确定按钮";
       this.NoticeComponent.open();
    }
}
```

