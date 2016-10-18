/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'cl-mng-cre-step-6',
    templateUrl: '../template/cl-mng-cre-step-06.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep6Component implements OnInit{


    constructor(
        private router : Router
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
