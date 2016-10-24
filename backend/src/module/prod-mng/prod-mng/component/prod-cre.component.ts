/**
 * Created by wangyao on 2016/10/20.
 */
import { Component, ViewChild, OnInit ,OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
// import { Config} from '../model/config';
import { Config} from '../../../../architecture/components/countBar/config/config';

import { LayoutService, ValidationService, NoticeComponent, ConfirmComponent ,CountBarComponent} from '../../../../architecture';

// import {  } from '../service';

import { Product } from '../model/product.model';

@Component({
    selector: 'prod-cre',
    templateUrl: '../template/prod-cre.component.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class ProdCreComponent implements OnInit , OnChanges{
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

    ngOnChanges(changes : {[propKey : string] : SimpleChange }){
        for(let key in changes){
            let item = changes[key];
            console.log(item);
        }
    }

    countBar:Config={
        default:100,
        step:50,
        min:0,
        max:1024,
        disabled:true,
        name:'prodCre01'
    }
    outputValue(e,number){
        console.log(e);
        console.log(number);
        
    }

}
