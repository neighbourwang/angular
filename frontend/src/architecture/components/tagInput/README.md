标签组件


![WX20170321-162753@2x](/Users/ziqingren/Desktop/WX20170321-162753@2x.png)


输入和输出：

  @Input	类型      	描述         	默认  
  datas 	string[]	接受一个默认的数组列表	[]  

  @Output       	触发条件          	参数                      
  onAdd         	添加标签时         	(datas:string[]) 当前的标签列表
  onRemove      	删除标签时         	(datas:string[]) 当前的标签列表
  onDatasChanged	标签有变化时        	(datas:string[]) 当前的标签列表
  onSelect      	某个标签被点击时      	(data) 当前输入的内容          
  onTextChange  	input的model变化时	(data) 当前输入的内容          
  onBlur        	input失去焦点时    	(data) 当前输入的内容          



用法：

最小化用法：

 html

    <tag-input></tag-input>

最大化用法:

html

    <tag-input
    	[datas]="tagDatas"
    	(onAdd)="xxx($event)"
    	(onRemove)="xxx($event)"
    	(onDatasChanged)="xxx($event)"
    	(onSelect)="xxx($event)"
    	(onTextChange)="xxx($event)"
    	(onBlur)="xxx($event)">
    </tag-input>

