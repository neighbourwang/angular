# 图表组件

### 概述：

本组件是基于[chart.js](http://www.chartjs.org/)的组件，[点击](http://www.chartjs.org/docs/#getting-started)查看chart.js相关文档

[点击](https://github.com/valor-software/ng2-charts)查看本组件相关文档。

[点击](http://valor-software.com/ng2-charts/)查看相关demo



### 集成到本项目的用法：

html

```html
<!-- 具体参数参考上面文档的相关用法 -->
<canvas baseChart
      width="100" height="100"
      [datasets]="quotaDtasets"
      chartType="doughnut"
      (chartHover)="chartHovered($event)"
      [options]="quotaOptions"
      (chartClick)="chartClicked($event)"></canvas>
```



ts

```typescript

//图表的数据
public quotaDtasets = [{ data: [ 30, 70 ], backgroundColor: [ "#00CC99","#E7E9ED" ], borderWidth:[  0,0  ] }];

public quotaOptions = {
            legend: { display: false },
            tooltips: {  enabled: false },
            cutoutPercentage: 82
        };

public useDatasets = [{
                    data: [25,57,173],
                    backgroundColor: [ "#FFCC33","#FF6666","#00CC99"],
                    borderWidth:[ 0,0,0]
                }];

//图表的事件
public chartClicked(e:any):void {
    console.log(e);
}

public chartHovered(e:any):void {
    console.log(e);
}
```







