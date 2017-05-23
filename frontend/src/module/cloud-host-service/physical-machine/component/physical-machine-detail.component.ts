import { Component,ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { PhysicalMachineDetailService } from '../service/physical-machine-detail.service'

import { cloudHostDetailComponent } from '../../vm-instance/component/cloud-host-detail.component'
import { cloudHostDetailService } from '../../vm-instance/service/cloud-host-detail.service'

@Component({
    selector: 'physical-machine-detail',
    templateUrl: '../template/physical-machine-detail.component.html',
    styleUrls: ['../style/physical-machine-detail.less'],
})

export class PhysicalMachineDetailComponent extends cloudHostDetailComponent implements OnInit {

    pm: any;

    constructor(
        public layoutService: LayoutService,
        public router: Router,
        public route: ActivatedRoute,
        public service: cloudHostDetailService,
        public PMservice: PhysicalMachineDetailService
    ) {
        super(layoutService, router, route, service)
    }
    ngOnInit() {
        this.fetchPmDetailAndFill()

    }

    fetchPmDetailAndFill(callbackFn?) {
        this.layoutService.show();

        this.route.params.subscribe(params => {
            this.PMservice.getPmInfo(params["pmId"]).then(res => {
                this.layoutService.hide();
                this.pm = res;
                console.log(res)
                
                callbackFn && callbackFn();
            }).catch(error => {
                this.layoutService.hide();
            })
        });
    }
}