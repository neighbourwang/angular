/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, ValidationService, NoticeComponent, PopupComponent } from '../../../../architecture';

//service
import { ProdDirDetailService } from '../service/prod-dir-detail.service';
import { CreateProdDirService } from '../service/prod-dir-new.service';
//model
import { ProdDir, platform } from '../model/prodDir.model';

@Component({
    templateUrl: '../template/prod-dirPhsical-cre.component.html',
    styleUrls: ['../../prod-mng/style/prod-cre.less'],
    providers: []
})
export class PhsicalProdDirCreComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private location: Location,

    ) { }

    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('newUnit')
    newUnit:PopupComponent

    ngOnInit() {
        
    }
    
    otcreateUnit(){}
    ccf(){}

    onCreateService(){
        this.location.back;
    }
    cancel(){
        this.location.back;
    }

}
