import { Component,ViewChild,OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent} from '../../../../architecture';



@Component({
    templateUrl:"../template/template-mng-list.component.html",    
})
export class TemplateMngListComponent implements OnInit{
    constructor(
        private router:Router

    ){

    }

    @ViewChild('createTemplatePop')
    createTemplatePop:PopupComponent;

    templateType:string='0';
    ngOnInit(){
        
    }
    createTemplate(){
        this.createTemplatePop.open('PROD_MNG.CREATE_TEMPLATE')
    }
    otcreate(){
        console.log(this.templateType);
        this.templateType=='0'&&this.router.navigate(['prod-mng/template-mng/template-database',{type:'new'}])
        this.templateType=='1'&&this.router.navigate(['prod-mng/template-mng/template-middleware',{type:'new'}])
    }
    ccf(){

    }
}