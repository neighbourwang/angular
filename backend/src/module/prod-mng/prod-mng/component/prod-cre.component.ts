/**
 * Created by wangyao on 2016/10/20.
 */
import { Component, ViewChild, OnInit ,OnChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
// import { Config} from '../model/config';
import { Config} from '../../../../architecture/components/countBar/config/config';

import { LayoutService, ValidationService, NoticeComponent, ConfirmComponent ,CountBarComponent} from '../../../../architecture';

// import {  } from '../service';
import { ProdDirDetailService } from '../../prod-dir-mng/service/prod-dir-detail.service';
import { ProdListService } from '../service/prodList.service';


import { Product } from '../model/product.model';

@Component({
    selector: 'prod-cre',
    templateUrl: '../template/prod-cre.component.html',
    styleUrls: ['.././style/prod-cre.less'],
    providers: []
})

export class ProdCreComponent implements OnInit , OnChanges{
    constructor(
        private router : Router,
        private ProdDirDetailService : ProdDirDetailService,
        private ProdListService : ProdListService
    ) {}

    enterpriseList = new Array();
    
    ngOnInit (){
        console.log('init');
         //获取企业列表
        this.ProdListService.getEnterpriseList().then(response => {
            console.log('企业', response);
            // if (response && 100 == response.resultCode) {
                this.enterpriseList = response.resultContent;
                console.log(this.enterpriseList);
            // } else {

            // }
        }).catch(err => {
            console.error(err)
        })
    }

    getProdDirDetail(id){
        this.ProdDirDetailService.getVmProdDirDetail(id).then(response => {
            console.log('企业', response);
            // if (response && 100 == response.resultCode) {
                this.enterpriseList = response.resultContent;
                console.log(this.enterpriseList);
            // } else {

            // }
        }).catch(err => {
            console.error(err)
        })
    }


    //选择企业
    selectEnterprise(ent,index){
        console.log(ent);
        console.log(index);        
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

    postProd(){
        
    }
}
