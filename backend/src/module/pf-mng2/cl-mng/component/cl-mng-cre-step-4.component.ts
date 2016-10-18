/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'cl-mng-cre-step-4',
    templateUrl: '../template/cl-mng-cre-step-04.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep4Component implements OnInit{

    constructor(
        private router : Router
    ) {}

    ngOnInit (){
        console.log('init');
    }



    next (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cre-step5");
    }

    previous (){
        this.router.navigateByUrl('pf-mng2/cl-mng/cre-step3');
    }
    cancel (){
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }
}
