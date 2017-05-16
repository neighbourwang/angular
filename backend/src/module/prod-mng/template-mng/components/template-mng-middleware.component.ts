import { Component,ViewChild,OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params} from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent} from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';

import { MiddleWareModel } from '../model/template-mng-middleware.model'

@Component({
    templateUrl:"../template/template-mng-middleware.component.html",    
})
export class MiddlewareComponent implements OnInit{
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
    middleware:MiddleWareModel=new MiddleWareModel();
    ngOnInit(){
        this.route.params.forEach((params: Params) => {
            this.pagetitle=
                params['type']=='new'?'新建中间件模板':'编辑中间件模板'               
            console.log();
        })
    }
    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            name: [this.middleware.name, [this.v.isBase, this.v.isUnBlank], "模板名称格式不正确"],
        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
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