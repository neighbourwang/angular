/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
    selector: 'prod-dir-cre',
    templateUrl: '../template/prod-dir-cre.component.html',
    styleUrls: ['../../prod-mng/style/prod-cre.less'],
    providers: []
})

export class ProdDirCreComponent implements OnInit {

    constructor(
        private router : Router
    ) {}

    ngOnInit (){
        console.log('init');
    }


    cancel() {
    this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng',{skipLocationChange: true})
}

    onSubmit() {
        this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng',{skipLocationChange: true})
    }


}
