/**
 * Created by wangyao on 2016/10/20.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

// import {  } from '../service';

// import {  } from '../model';

@Component({
    selector: 'prod-cre',
    templateUrl: '../template/prod-cre.component.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class ProdCreComponent implements OnInit {
    constructor(
        private router : Router
    ) {}

    ngOnInit (){
        console.log('init');
    }

}
