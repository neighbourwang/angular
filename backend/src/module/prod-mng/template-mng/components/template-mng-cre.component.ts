import { Component,ViewChild,OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params} from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent} from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';



@Component({
    templateUrl:"../template/template-mng-cre.component.html",    
})
export class TemplateMngCreComponent implements OnInit{
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
    ngOnInit(){
        this.route.params.forEach((params: Params) => {
            this.pagetitle=
                params['type']=='new'&&params['code']=='0'?'新建数据库模板':
                params['type']=='new'&&params['code']=='1'?'新建中间件模板':
                params['type']=='edit'&&params['code']=='0'?'编辑数据库模板':'编辑中间件模板';

            console.log();
        })
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