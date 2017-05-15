import { Component,ViewChild,OnInit } from '@angular/core';
import { Router , ActivatedRoute, Params} from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent} from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';

import { DatabaseModel,DatabaseOptions } from '../model/template-mng-database.model'
import { DatabaseService } from '../service/template-mng-database.service'

@Component({
    templateUrl:"../template/template-mng-database.component.html", 
     styles: [
        `.btn-active{
            background-color: #00a982;
            color : #fff
        }`
    ],   
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
    databaseOptionList:DatabaseOptions=new DatabaseOptions();
    storageTypeList=[
            {
                type:'FileSystem',
                value:'FS',
                selected:true
            },
            {
                type:'ASM',
                value:'ASM',
                selected:false            
            }
        ];
    softwareTypeList:Array<any>=new Array<any>();
    ngOnInit(){
        this.database=new DatabaseModel();
        this.databaseOptionList=new DatabaseOptions();
        console.log(this.database);
        console.log(this.databaseOptionList);
        this.route.params.forEach((params: Params) => {
            this.pagetitle=
                params['type']=='new'?'新建数据库模板':'编辑数据库模板';             
        });
        this.service.getDatabaseOptionInitInfo().then(res=>{
            console.log(res);
            this.databaseOptionList=Object.assign({},res.resultContent);
            // console.log();
            this.softwareTypeList.push(this.databaseOptionList.items[0].db);
            this.database.dbType=this.databaseOptionList.items[0].db.value;
            this.database.version=this.databaseOptionList.items[0].version[0];
        }).catch(err=>{
            console.log(err);
        })
    }
    //选择存储类型
    chooseStorageType(item,idx){
        this.storageTypeList.forEach(type=>type.selected=false);
        this.storageTypeList[idx].selected=true;
        this.database.storageType=item.value;
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