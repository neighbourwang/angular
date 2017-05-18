import { Component,ViewChild,OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params} from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent} from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';

import { MiddleWareModel } from '../model/template-mng-middleware.model';
import { DatabaseOptions } from '../model/template-mng-database.model'

import { MiddlewareService }from '../service/template-mng-middleware.service';

@Component({
    templateUrl:"../template/template-mng-middleware.component.html",
    styles: [
        `.btn-active{
            background-color: #00a982;
            color : #fff
        }`
    ],    
})
export class MiddlewareComponent implements OnInit{
    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private layoutService: LayoutService,
        private service: MiddlewareService,
        private v: Validation,
    ) {
        this.v.result = {}
    }

    @ViewChild('notice')
    notice:NoticeComponent;

    pagetitle:string;
    middleware:MiddleWareModel=new MiddleWareModel();
    middlewareOptionList:DatabaseOptions=new DatabaseOptions();
    softwareTypeList:Array<any>=new Array<any>();

    ngOnInit(){
        this.route.params.forEach((params: Params) => {
            this.pagetitle=
                params['type']=='new'?'新建中间件模板':'编辑中间件模板'               
            console.log();
        })
        this.layoutService.show();
        
        this.service.getMiddlewareOptionInitInfo().then(res=>{
            console.log(res);
            this.middlewareOptionList=Object.assign({},res.resultContent);
            // console.log();
            this.softwareTypeList.push(this.middlewareOptionList.items[0].middleware);
            this.middleware.type=this.middlewareOptionList.items[0].middleware.value;
            this.middleware.version=this.middlewareOptionList.items[0].version[0];
            this.layoutService.hide();
        }).catch(err=>{
            this.layoutService.hide();
            console.log(err);
        })
    }
    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            name: [this.middleware.name, [this.v.isBase, this.v.isUnBlank], "模板名称格式不正确"],
            bootStorageSize:[this.middleware.bootStorageSize,[this.v.isUnBlank, this.v.isNumber, this.v.min(1)],'启动盘设置不正确'],
            cpu:[this.middleware.cpu,[this.v.isUnBlank, this.v.isNumber, this.v.min(1)],'CPU设置不正确'],
            memory:[this.middleware.memory,[this.v.isUnBlank, this.v.isNumber, this.v.min(1)],'内存设置不正确']
        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    onSubmit(){
        let message=this.checkForm();
        if(message)return;
        console.log(this.middleware);
        // this.layoutService.show();
        // this.service.postMiddlewareTemplate(this.middleware).then(res=>{
        //     console.log(res);
        //     this.layoutService.hide();
        //     this.router.navigateByUrl('prod-mng/template-mng/template-list', { skipLocationChange: true })            
        // }).catch(err=>{
        //     console.log(err);
        //     this.layoutService.hide();            
        // })
        
    }
    cancel(){
        this.router.navigateByUrl('prod-mng/template-mng/template-list', { skipLocationChange: true }) 
    }
    ccf(){

    }
}