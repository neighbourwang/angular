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
        private layoutService: LayoutService,
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
        let id:string;
        this.route.params.forEach((params: Params) => {
            this.pagetitle=
                params['type']=='new'?'新建数据库模板':'编辑数据库模板';
                if(params['id']){
                    this.database.id=params['id'];
                    this.getDatabaseTemplateList(this.database.id);                    
                }             
        });
        //获取基础选项类型数据
        this.layoutService.show();
        this.service.getDatabaseOptionInitInfo().then(res=>{
            console.log(res);
            this.databaseOptionList=Object.assign({},res.resultContent);
            // console.log();
            this.softwareTypeList.push(this.databaseOptionList.items[0].db);
            this.database.dbType=this.databaseOptionList.items[0].db.value;
            this.database.version=this.databaseOptionList.items[0].version[0];
            this.layoutService.hide();
        }).catch(err=>{
            this.layoutService.hide();
            console.log(err);
        })
    }
    //编辑时查询数据库模板信息
    getDatabaseTemplateList(id:string) {
        let pageParameter = {
            "currentPage": 1,
            "offset": 0,
            "size": 10,
            "sort": {},
            "totalPage": 0
        }
        this.service.getTemplatedetail({id:id, pageParameter}).then(res => {
            console.log(res);
            this.database=res.resultContent[0];
            this.database.diskProfileList=JSON.parse(JSON.stringify(this.database.diskInfoList));
            console.log(this.database);
        }).catch(err => console.error(err))
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
            bootStorageSize:[this.database.bootStorageSize,[this.v.isUnBlank, this.v.isNumber, this.v.min(1)],'启动盘设置不正确'],
            cpu:[this.database.cpu,[this.v.isUnBlank, this.v.isNumber, this.v.min(1)],'CPU设置不正确'],
            memory:[this.database.memory,[this.v.isUnBlank, this.v.isNumber, this.v.min(1)],'内存设置不正确']
        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    onSubmit(){
        let message=this.checkForm();
        if(message)return;
        console.log(this.database);
        this.layoutService.show();
        this.service.postDatabaseTemplate(this.database).then(res=>{
            console.log(res);
            this.layoutService.hide();
            this.router.navigateByUrl('prod-mng/template-mng/template-list', { skipLocationChange: true })            
        }).catch(err=>{
            console.log(err);
            this.layoutService.hide();            
        })        
    }
    cancel(){
        this.router.navigateByUrl('prod-mng/template-mng/template-list', { skipLocationChange: true }) 
    }
    ccf(){

    }
}