import {Component, OnChanges, ViewEncapsulation, SimpleChanges} from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { LineChartData } from '../model/lineChartData';

@Component({
    selector: 'fc-line-chart',
    templateUrl: '../template/chart.component.html',
    styleUrls: ['../style/chart.component.css'],
    inputs: ['data', 'title']
})
export class LineChart implements OnChanges{
  // lineChart
  lineChartData:Array<any> = [{}];
  lineChartLabels:Array<any> = [];
  lineChartOptions:any = {
    animation: false,
    responsive: true
  };

  lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(239,244,248,0.2)',
      borderColor: 'rgba(53,213,200,1)',
      pointBackgroundColor: 'rgba(239,244,248,1)',
      pointBorderColor: 'rgba(53,213,200,1)',
      pointHoverBackgroundColor: 'rgba(239,244,248,1',
      pointHoverBorderColor: 'rgba(53,213,200,0.8)'
    }
  ];
  lineChartLegend:boolean = true;
  lineChartType:string = 'line';

  // public randomize():void {
  //   let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  //   for (let i = 0; i < this.lineChartData.length; i++) {
  //     _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
  //     for (let j = 0; j < this.lineChartData[i].data.length; j++) {
  //       _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
  //     }
  //   }
  //   this.lineChartData = _lineChartData;
  // }
  data: Array<LineChartData>;
  title: string;


  ngOnChanges(changes: SimpleChanges) {
    if (!this.data) {
      return;
    }

    let dataList: string[] = [];
    let labelList: string[] = [];
    let _lineChartData:Array<any>;

    this.data.forEach((element: LineChartData) => {
      labelList.push(element.xValue);
      dataList.push(element.yValue);
    });

    this.lineChartData = this.getChartDataSet(dataList, this.title);
    this.lineChartLabels = labelList;
  }

  getChartDataSet(dataset: string[], title: string) {
    return [
      {
        data: dataset,
        label: title,
        lineTension: 0,
        borderWidth: 1,
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 5,
        scaleShowLabels: false,
        pointStyle: 'circle'
      }
    ];
  }
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
