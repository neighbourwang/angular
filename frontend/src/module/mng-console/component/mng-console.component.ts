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

    public quotaDtasets = [{ data: [ 30, 70 ], backgroundColor: [ "#00CC99","#E7E9ED" ], borderWidth:[  0,0  ] }]

    public quotaOptions = {
                legend: { display: false },
                tooltips: {  enabled: false },
                cutoutPercentage: 82
            }


    public useDatasets = [{
                        data: [25,57,173],
                        backgroundColor: [ "#FFCC33","#FF6666","#00CC99"],
                        borderWidth:[ 0,0,0]
                    }];
    public useLabels = [ '<30% (25)', '30%~70% (57)',  '>70% (173)' ];
    public useOptions = {
                    legend: {
                        position: 'bottom',
                        display: true,
                        labels: {
                            boxWidth: 10
                        }
                    },
                    tooltips: {
                        enabled: false,
                    },
                    cutoutPercentage: 82,
                }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}