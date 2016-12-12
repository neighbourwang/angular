import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../architecture';
import { MngConsoleService } from '../service/mng-console.service';



@Component({
    selector: 'cloud-host-detail',
    templateUrl: '../template/mng-console.html',
    styleUrls: ['../style/mng-console.less'],
})

export class MngConsoleComponent implements OnInit {

    @ViewChild('confirm')
    private confirmDialog: ConfirmComponent;

    @ViewChild('notice')
    private noticeDialog: NoticeComponent;

    @ViewChild('platformZone') platformZone;



    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: MngConsoleService 
    ) {

    }
    ngOnInit() {


    }

    public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
      public doughnutChartData:number[] = [350, 450, 100];
      public doughnutChartType:string = 'doughnut';

      // events
      public chartClicked(e:any):void {
        console.log(e);
      }

      public chartHovered(e:any):void {
        console.log(e);
      }
}