import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { cloudHostDetailService } from '../service/cloud-host-detail.service'



@Component({
    selector: 'cloud-host-detail',
    templateUrl: '../template/cloud-host-detail.component.html',
    styleUrls: ['../style/cloud-host-detail.less'],
})

export class cloudHostDetailComponent implements OnInit {

    @ViewChild('confirm')
    private confirmDialog: ConfirmComponent;

    @ViewChild('notice')
    private noticeDialog: NoticeComponent;

    @ViewChild('platformZone') platformZone;



    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: cloudHostDetailService
    ) {

    }
    ngOnInit() {


    }
}