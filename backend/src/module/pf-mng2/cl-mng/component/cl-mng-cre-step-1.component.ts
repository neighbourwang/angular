/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

//model 
import { CreStep1Model } from '../model/Cre-step1.model';

import { ClMngCreStep1Service } from '../service/cl-mng-cre-step-1.service'

@Component({
    selector: 'cl-mng-cre-step-1',
    templateUrl: '../template/cl-mng-cre-step-01.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep1Component implements OnInit{

    creStep1Model : CreStep1Model;

    constructor(
        private router : Router,
        private service : ClMngCreStep1Service,
        private layoutService : LayoutService
    ) {}

    ngOnInit (){
        console.log('init');
        //this.layoutService.show();

        //获取地域

        //获取云平台类型
        this.service.getPlatFormType().then(
            response => {
                if (response && 100 == response.resultCode) {
                    console.log(response);
                }
                this.layoutService.hide();
            }
        ).catch(function () {
                //this.notice.open('错误','获取信息错误');
            }
        );
    }

    next (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cre-step2");
    }

    cancel (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }
}
