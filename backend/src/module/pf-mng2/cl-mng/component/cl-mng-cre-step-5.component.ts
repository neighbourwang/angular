/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { CreStep5Model }  from '../model/cre-step5.model';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

import { ClMngCreStep5Service } from '../service/cl-mng-cre-step-5.service'; 

import { ClMngIdService } from '../service/cl-mng-id.service';


@Component({
    selector: 'cl-mng-cre-step-5',
    templateUrl: '../template/cl-mng-cre-step-05.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep5Component implements OnInit{


    constructor(
        private router : Router,
        private service : ClMngCreStep5Service,
        private idService : ClMngIdService
    ) {}

    creStep5Model : Array<CreStep5Model> = new Array<CreStep5Model>();

    ngOnInit (){
        console.log('init');

        let platFormId : String = this.idService.getPlatformId();
        
        this.service.getFlavors(platFormId).then(
            res => {
                console.log(res);
            }
        ).catch(
            error => {
                console.error('error');
            }
        )
    }

    next (){

        let platFormId : String = this.idService.getPlatformId();

        this.service.putFlavors(platFormId ,this.creStep5Model).then(
            res => {
                console.log(res);
                this.router.navigateByUrl("pf-mng2/cl-mng/cre-step6");
            }
        ).catch(
            error => {
                console.error('error');
            }
        )
        
        this.router.navigateByUrl("pf-mng2/cl-mng/cre-step6");
    }

    previous (){
        this.router.navigateByUrl('pf-mng2/cl-mng/cre-step4');
    }
    cancel (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }
}
