共有两个属性：

**tp**：总共的页数，如果为0的时候隐藏分页

**pf**：当改变页数的时候的事件 参数为：(page[当前分页]: number) 



html:

```html
<fc-pagination tp={{totalPages}} (pf)="changePage(page)"></fc-pagination>
```



javascript：

```javascript
totalPages: number = 0;   //默认设置为0 不显示
currPage: number = 1;

...

getList() {   //获取分页列表的方法
	this.server.getList().then(res => {
       //获取远程数据中的分页总数信息 赋值给 totalPages 这样才显示分页
       this.totalPages = res.pageInfo.totalPage;
	})
}

//分页
changePage(page: number) {
	page = page < 1 ? 1 : page > this.totalPages ? this.totalPages : page;   //判断分页是否非法

	if (this.currPage == page)  return;   //如果点击的是当前的page 则不再执行

	this.currPage = page;
}
```