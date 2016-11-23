/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { CreStep4Model }  from '../model/cre-step4.model';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

import { ClMngCreStep4Service } from '../service/cl-mng-cre-step-4.service'; 

import { ClMngIdService } from '../service/cl-mng-id.service';




@Component({
    selector: 'cl-mng-cre-step-4',
    templateUrl: '../template/cl-mng-cre-step-04.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep4Component implements OnInit{

    constructor(
        private router : Router,
        private idService : ClMngIdService,
        private service : ClMngCreStep4Service
    ) {}

    creStep4Model : Array<CreStep4Model> = new Array<CreStep4Model>();  

    ngOnInit (){
        console.log('init');

        let platFormId : String = this.idService.getPlatformId();
        
        this.service.getStorage(platFormId).then(
            res => {
                this.creStep4Model = res.resultContent;
            }
        ).catch(
            error => {
                console.error('error');
            }
        )
    }



    next (){

        let platFormId : String = this.idService.getPlatformId();

        this.service.putStorage(platFormId , this.creStep4Model).then(
            res => {
                console.log(res);
                this.router.navigateByUrl("pf-mng2/cl-mng/cre-step5");
            }
        ).catch(
            error => {
                console.error('error');
            }
        )
        // this.router.navigateByUrl("pf-mng2/cl-mng/cre-step5");
    }

    previous (){
        this.router.navigateByUrl('pf-mng2/cl-mng/cre-step3');
    }
    cancel (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }

    outputValue(e , index){
        this.creStep4Model[index].quota = e;
    }
}
