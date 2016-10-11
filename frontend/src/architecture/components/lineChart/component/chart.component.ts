import {Component, ViewChild, Input, OnChanges, ViewEncapsulation} from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import './chart.loader.ts';

@Component({
    selector: 'fc-line-chart',
    templateUrl: '../template/chart.component.html',
    styleUrls: ['../style/chart.component.css'],
    inputs: ['percent', 'size', 'font_size', 'color']
})
export class LineChart {
  // lineChart
  public lineChartData:Array<any> = [
    {data: [2.8, 0.2, 1.2, 4, 1.2, 0.7, 2.6], label: 'CPU'}
  ];
  public lineChartLabels:Array<any> = ['09:15:00', '09:20:00', '09:25:00', '09:30:00', '09:35:00', '09:40:00', '09:45:00'];
  public lineChartOptions:any = {
    animation: false,
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(239,244,248,0.2)',
      borderColor: 'rgba(53,213,200,1)',
      pointBackgroundColor: 'rgba(239,244,248,1)',
      pointBorderColor: 'rgba(53,213,200,1)',
      pointHoverBackgroundColor: 'rgba(239,244,248,1',
      pointHoverBorderColor: 'rgba(53,213,200,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}
