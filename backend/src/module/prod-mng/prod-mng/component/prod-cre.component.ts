/**
 * Created by wangyao on 2016/10/20.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Config} from '../model/config';
import { Config} from '../../../../architecture/components/countBar/config/config';

import { LayoutService, ValidationService, NoticeComponent, ConfirmComponent ,CountBarComponent} from '../../../../architecture';

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

    cancel() {
        this.router.navigateByUrl('prod-mng/prod-mng/prod-mng',{skipLocationChange: true})
    }

    onSubmit() {
        this.router.navigateByUrl('prod-mng/prod-mng/prod-mng',{skipLocationChange: true})
    }

    countBar:Config={
        default:100,
        step:50,
        min:0,
        max:1000,
        disabled:true,
        value:20
    }

}
