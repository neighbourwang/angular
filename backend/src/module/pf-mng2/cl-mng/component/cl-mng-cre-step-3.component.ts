/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { CreStep3Model }  from '../model/cre-step3.model';




import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

import { ClMngCreStep3Service } from '../service/cl-mng-cre-step-3.service'; 

import { ClMngIdService } from '../service/cl-mng-id.service';

@Component({
    selector: 'cl-mng-cre-step-3',
    templateUrl: '../template/cl-mng-cre-step-03.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep3Component implements OnInit{

    creStep3Model : Array<CreStep3Model> = new Array<CreStep3Model>();

    constructor(
        private router : Router,
        private service : ClMngCreStep3Service,
        private layoutService : LayoutService,
        private idService : ClMngIdService
    ) {}
    ngOnInit (){
        console.log('init');

        let platFormId : String = this.idService.getPlatformId();
        
        this.service.getZone(platFormId).then(
            res => {
                console.log(res);
                this.creStep3Model = res.resultContent;
            }
        ).catch(
            error => {
                console.error('error');
            }
        )
    }

    next (){

        let platFormId : String = this.idService.getPlatformId();

        // this.router.navigateByUrl("pf-mng2/cl-mng/cre-step4");

        //等待接口
        this.service.putZone( platFormId , this.creStep3Model).then(
            res => {
                console.log(res);
                this.router.navigateByUrl("pf-mng2/cl-mng/cre-step4");
            }
        ).catch(
            error => {
                console.error('error');
            }
        )

        
    }

    previous (){
        this.router.navigateByUrl('pf-mng2/cl-mng/cre-step2');
    }
    cancel (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }

    outputValue(event , index){
        this.creStep3Model[index].usageQuota = event;
    }
}
