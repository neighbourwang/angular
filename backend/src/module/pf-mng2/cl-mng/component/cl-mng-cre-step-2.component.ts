/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { ClMngIdService } from '../service/cl-mng-id.service';

import { ClMngCreStep2Service } from '../service/cl-mng-cre-step-2.service';

@Component({
    selector: 'cl-mng-cre-step-2',
    templateUrl: '../template/cl-mng-cre-step-02.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep2Component implements OnInit{

    constructor(
        private router : Router,
        private idService : ClMngIdService,
        private service : ClMngCreStep2Service
    ) {}


    ngOnInit (){
        let platFormId : String = this.idService.getPlatformId();
        console.log('init');
        //可用区同步
        this.service.synchronize(platFormId).then(
            res => {
                console.log(res);
            }
        ).catch(function(){
            
        })
    }


    next (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cre-step3");
    }

    previous (){
        this.router.navigateByUrl('pf-mng2/cl-mng/cre-step1');
    }
    cancel (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }
}
