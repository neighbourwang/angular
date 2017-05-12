import { Component,ViewChild,OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params} from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent} from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';

import { DatabaseModel,DatabaseOption } from '../model/template-mng-database.model'
import { DatabaseService } from '../service/template-mng-database.service'

@Component({
    templateUrl:"../template/template-mng-database.component.html",    
})
export class DatabaseComponent implements OnInit{
    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private LayoutService: LayoutService,
        // private service: DatabaseMiddlewareProdService,
        private v: Validation,
    ) {
        this.v.result = {}
    }

    @ViewChild('notice')
    notice:NoticeComponent;
    pagetitle:string;
    database:DatabaseModel=new DatabaseModel();
    ngOnInit(){
        this.route.params.forEach((params: Params) => {
            this.pagetitle=
                params['type']=='new'?'新建数据库模板':'编辑数据库模板';             
            console.log();
        });

    }
    onSubmit(){
        this.router.navigateByUrl('prod-mng/template-mng/template-list', { skipLocationChange: true })
        
    }
    cancel(){
        this.router.navigateByUrl('prod-mng/template-mng/template-list', { skipLocationChange: true }) 
    }
    ccf(){

    }
}