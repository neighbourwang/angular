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

    ngOnInit(){
        
    }
    createTemplate(){
        this.createTemplatePop.open('PROD_MNG.CREATE_TEMPLATE')
    }
    otcreate(){
        this.router.navigate(['prod-mng/template-mng/template-cre'])
    }
    ccf(){

    }
}