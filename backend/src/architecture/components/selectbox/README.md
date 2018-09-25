
### 使用方法

html:
<fc-selectbox #selectbox [selectedList]="selectedEnterprise" [unSelectedList]="unselectedEnterprise" 
                titleL="可选企业" 
                titleR="选中企业" 
                displayKey="com">
</fc-selectbox>


参数：
    selectedList:     左侧box中要绑定的数组(Array) 
    unSelectedList:   右侧box中要绑定的数组(Array)
    titleL：          左侧box标题
    titleR：          右侧box标题
    displayKey：      在box中显示的数据的属性名，例如：
                        
                        绑定的数组类型是：Array<Enterprise> 
                        class Enterprise {
                                id: string; //id
                                com: string; //公司名称
                            }
                        要在box中显示的是公司名称，
                        则需设置  displayKey="com"

例子：
    请参考 src/module/net-mng/vm-mng-dbt/port-mng/component/port-mng-set.component.ts与../template/port-mng-set.html的对本组件的实际应用