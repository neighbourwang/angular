/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'prod-dir-cre',
    templateUrl: '../template/prod-dir-cre.component.html',
    styleUrls: [],
    providers: []
})

export class ProdDirCreComponent implements OnInit {

    constructor(
        private router : Router
    ) {}

    ngOnInit (){
        console.log('init');
    }
    
   

}
