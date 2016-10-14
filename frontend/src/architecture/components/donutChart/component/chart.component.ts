import {Component, ViewChild, Input, OnChanges, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'fc-donut-chart',
    templateUrl: '../template/chart.component.html',
    // encapsulation: ViewEncapsulation.None,
    styleUrls: ['../style/chart.component.css'],
    inputs: ['percent', 'size', 'font_size', 'color']
})
export class DonutChart implements OnChanges{
  @ViewChild('chartRef')
  private chartRef: any;

  @ViewChild('borderRef')
  private borderRef: any;

  @ViewChild('labelRef')
  private labelRef: any;

  private chart: any;

  private percent: number = 0;
  private size: number = 110;
  private font_size: number = 16;
  private color: string = '#2bd2c8';
  
  constructor() {
    
  }

  ngAfterViewInit() {
    // this.chart = jQuery(this.chartRef.nativeElement);
  }

  ngOnChanges() {
    if (this.chartRef) {
      /*this.chart = jQuery(this.chartRef.nativeElement);
      this.setChartSize();
      this.loadPieCharts();
      this.updatePieCharts();*/
    }
  }

  private setChartSize() {
    let el = this.chartRef.nativeElement;
    el.style.width = this.size + 'px';
    el.style.height = this.size + 'px';

    el = this.labelRef.nativeElement;
    el.style.lineHeight = this.size + 'px';
    el.style.fontSize = this.font_size + 'px';

    el = this.borderRef.nativeElement;
    el.style.width = this.size + 'px';
    el.style.height = this.size + 'px';
  }

  private loadPieCharts() {

    this.chart.easyPieChart({
      easing: 'easeOutBounce',
      // onStep: function (from, to, percent) {
      //   jQuery(this.el).find('.percent').text(Math.round(70));
      // },
      barColor: this.color,
      trackColor: 'rgba(0,0,0,0)',
      size: this.size,
      scaleLength: 0,
      animation: 2000,
      lineWidth: 10,
      lineCap: 'round'
    });
  }

  private updatePieCharts() {
    this.chart.data('easyPieChart').update(this.percent);
  }
}
