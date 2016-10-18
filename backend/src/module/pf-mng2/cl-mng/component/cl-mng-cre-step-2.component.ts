/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'cl-mng-cre-step-2',
    templateUrl: '../template/cl-mng-cre-step-02.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep2Component implements OnInit{

    constructor(
        private router : Router
    ) {}


    ngOnInit (){
        console.log('init');
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
