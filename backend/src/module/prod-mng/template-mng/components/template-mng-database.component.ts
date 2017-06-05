import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';

import { DatabaseModel, TemplateOptions } from '../model/template-mng-database.model'
import { DatabaseService } from '../service/template-mng-database.service'

@Component({
    templateUrl: "../template/template-mng-database.component.html",
    styles: [
        `.btn-active{
            background-color: #00a982;
            color : #fff
        }`
    ],
})
export class DatabaseComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private layoutService: LayoutService,
        private service: DatabaseService,
        private v: Validation,
    ) {
        this.v.result = {}
    }

    @ViewChild('notice')
    notice: NoticeComponent;
    pagetitle: string;
    pageType: string;
    database: DatabaseModel = new DatabaseModel();
    databaseOptionList: TemplateOptions = new TemplateOptions();
    storageTypeList = [
        {
            type: 'FileSystem',
            value: 'FS',
            selected: true
        },
        {
            type: 'ASM',
            value: 'ASM',
            selected: false
        }
    ];
    softwareTypeList: Array<any> = new Array<any>();
    ngOnInit() {
        this.database = new DatabaseModel();
        this.databaseOptionList = new TemplateOptions();
        console.log(this.database);
        console.log(this.databaseOptionList);
        this.route.params.forEach((params: Params) => {
            this.pageType = params['type'];
            this.pagetitle =
                this.pageType == 'new' ? '新建数据库模板' : '编辑数据库模板';
            if (params['id']) {
                this.database.id = params['id'];
            }
        });
        this.getDatabseOptionInfo();
    }
    //获取基础选项类型数据    
    getDatabseOptionInfo() {
        this.layoutService.show();
        this.service.getDatabaseOptionInitInfo().then(res => {
            console.log(res);
            this.databaseOptionList = Object.assign({}, res.resultContent);
            // console.log();
            if (this.database.id) {
                this.getDatabaseTemplateList(this.database.id);
            }
            this.softwareTypeList.push(this.databaseOptionList.items[0].db);
            this.database.dbType = this.databaseOptionList.items[0].db.value;
            this.database.version = this.databaseOptionList.items[0].version[0];
            this.layoutService.hide();
        }).catch(err => {
            this.layoutService.hide();
            console.log(err);
        })
    }
    //编辑时查询数据库模板信息
    getDatabaseTemplateList(id: string) {
        let pageParameter = {
            "currentPage": 1,
            "offset": 0,
            "size": 10,
            "sort": {},
            "totalPage": 0
        }
        this.layoutService.show();
        this.service.getTemplatedetail({ id: id, pageParameter }).then(res => {
            console.log(res);
            this.database = res.resultContent[0];
            this.database.diskProfileList = JSON.parse(JSON.stringify(this.database.diskInfoList));
            this.database.diskProfileList.forEach(disk => {
                (disk.usageType == 0) && (disk.useDisplay = '安装主目录');
                (disk.usageType == 1) && (disk.useDisplay = '数据库文件');
                (disk.usageType == 2) && (disk.useDisplay = '归档日志,快速恢复区');
            })
            this.database.diskProfileList.sort((a,b)=>a.usageType-b.usageType);//排下序
            console.log(this.database);
            this.storageTypeList.forEach(v => {
                v.selected = false;
                if (v.value == this.database.storageType) {
                    v.selected = true;
                }
            })
            this.layoutService.hide();            
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    //选择存储类型
    chooseStorageType(item, idx) {
        this.storageTypeList.forEach(type => type.selected = false);
        this.storageTypeList[idx].selected = true;
        this.database.storageType = item.value;
    }
    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            name: [this.database.name, [this.v.isBase,this.v.maxLength(20), this.v.isUnBlank], "模板名称格式不正确"],
            bootStorageSize: [this.database.bootStorageSize, [this.v.isUnBlank, this.v.isNumber,this.v.maxLength(6), this.v.min(20)], '启动盘设置不正确'],
            cpu: [this.database.cpu, [this.v.isUnBlank, this.v.isNumber,this.v.maxLength(2) ,this.v.min(2)], 'CPU设置不正确'],
            memory: [this.database.memory, [this.v.isUnBlank, this.v.isNumber,this.v.maxLength(6), this.v.min(4)], '内存设置不正确']
        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    onSubmit() {
        let message = this.checkForm();
        if (message) {
            this.notice.open('操作错误', message);
            return;
        }
        console.log(this.database);
        if (this.pageType == 'new') {
            this.layoutService.show();
            this.service.postDatabaseTemplate(this.database).then(res => {
                console.log(res);
                this.layoutService.hide();
                this.router.navigate(['prod-mng/template-mng/template-list', {type:'0'}])            
            }).catch(err => {
                console.log(err);
                this.layoutService.hide();
            })
        } else {
            this.layoutService.show();
            this.service.putDatabaseTemplate(this.database).then(res => {
                console.log(res);
                this.layoutService.hide();
                this.router.navigate(['prod-mng/template-mng/template-list', {type:'0'}])            
            }).catch(err => {
                console.log(err);
                this.layoutService.hide();
            })
        }
    }
    cancel() {
        this.router.navigate(['prod-mng/template-mng/template-list', {type:'0'}])
    }
    ccf() {

    }
}