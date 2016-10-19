/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

// import { CreStep5Model }  from '../model/cre-step5.model';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

import { ClMngCreStep6Service } from '../service/cl-mng-cre-step-6.service'; 

import { ClMngIdService } from '../service/cl-mng-id.service';

@Component({
    selector: 'cl-mng-cre-step-6',
    templateUrl: '../template/cl-mng-cre-step-06.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep6Component implements OnInit{


    constructor(
        private router : Router,
        private service : ClMngCreStep6Service,
        private idService : ClMngIdService
    ) {}


    
    ngOnInit (){
        console.log('init');
    }

    previous (){
        this.router.navigateByUrl('pf-mng2/cl-mng/cre-step5');
    }
    cancel (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }
}
