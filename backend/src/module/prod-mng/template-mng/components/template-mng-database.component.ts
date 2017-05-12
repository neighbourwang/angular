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
        private service: DatabaseService,
        private v: Validation,
    ) {
        this.v.result = {}
    }

    @ViewChild('notice')
    notice:NoticeComponent;
    pagetitle:string;
    database:DatabaseModel=new DatabaseModel();
    databaseOptionList:Array<DatabaseOption>=new Array<DatabaseOption>();
    ngOnInit(){
        this.database=new DatabaseModel();
        this.databaseOptionList=new Array<DatabaseOption>();
        console.log(this.database);
        console.log(this.databaseOptionList);
        this.route.params.forEach((params: Params) => {
            this.pagetitle=
                params['type']=='new'?'新建数据库模板':'编辑数据库模板';             
            console.log();
        });
        this.service.getDatabaseOptionInitInfo().then(res=>{
            console.log(res);
            this.databaseOptionList=res.resultContent.items;
            // this.database.version=this.databaseOptionList[0].version[0];
        }).catch(err=>{
            console.log(err);
        })
    }
    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            name: [this.database.name, [this.v.isBase, this.v.isUnBlank], "模板名称格式不正确"],
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