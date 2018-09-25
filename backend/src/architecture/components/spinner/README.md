# 全屏幕loading组件

暂无

### 例子

html：

```html
／／不需要
```

javascript：

```javascript
import { LayoutService } from '../../../../architecture';


export class testComponent implements OnInit {
	constructor(
		private layoutService: LayoutService
      	...
	) {}
     
     
    ...
    show() {
       this.layoutService.show();  //出现
       this.layoutService.hide();  //隐藏
    }
}
```