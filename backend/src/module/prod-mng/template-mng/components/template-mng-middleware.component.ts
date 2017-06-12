import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';

import { MiddleWareModel } from '../model/template-mng-middleware.model';
import { TemplateOptions } from '../model/template-mng-database.model'

import { MiddlewareService } from '../service/template-mng-middleware.service';

@Component({
    templateUrl: "../template/template-mng-middleware.component.html",
    styles: [
        `.btn-active{
            background-color: #00a982;
            color : #fff
        }`
    ],
})
export class MiddlewareComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private layoutService: LayoutService,
        private service: MiddlewareService,
        private v: Validation,
    ) {
        this.v.result = {}
    }

    @ViewChild('notice')
    notice: NoticeComponent;

    pagetitle: string;
    pageType: string;
    middleware: MiddleWareModel = new MiddleWareModel();
    middlewareOptionList: TemplateOptions = new TemplateOptions();
    softwareTypeList: Array<any> = new Array<any>();

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.pageType = params['type']
            this.pagetitle =
                this.pageType == 'new' ? '新建中间件模板' : '编辑中间件模板';
            if (params['id']) {
                this.middleware.id = params['id'];
            }
        })
        this.getInitInfoList();
    }
    //获取创建中间件模板初始信息
    getInitInfoList() {
        this.layoutService.show();
        this.service.getMiddlewareOptionInitInfo().then(res => {
            console.log(res);
            this.middlewareOptionList = Object.assign({}, res.resultContent);
            // console.log();
            if (this.middleware.id) {
                this.getMiddlewareTemplateList(this.middleware.id);
            }
            this.softwareTypeList.push(this.middlewareOptionList.items[0].middleware);
            this.middleware.type = this.middlewareOptionList.items[0].middleware.value;
            this.middleware.version = this.middlewareOptionList.items[0].version[0];
            this.layoutService.hide();
        }).catch(err => {
            this.layoutService.hide();
            console.log(err);
        })
    }
    //编辑时查询中间件模板信息
    getMiddlewareTemplateList(id: string) {
        let pageParameter = {
            "currentPage": 1,
            "offset": 0,
            "size": 10,
            "sort": {},
            "totalPage": 0
        }
        this.service.getTemplatedetail({ id: id, pageParameter }).then(res => {
            console.log(res);
            this.middleware = res.resultContent[0];
            this.middleware.dbMiddlewareDiskTemplateModelList = JSON.parse(JSON.stringify(this.middleware.diskInfoList));
            this.middleware.dbMiddlewareDiskTemplateModelList.forEach(disk => {
                (disk.usageType == 1) && (disk.useDisplay = '应用数据及日志');
            })
            this.middleware.dbMiddlewareDiskTemplateModelList.sort((a, b) => a.usageType - b.usageType);//排下序
            console.log(this.middleware);
        }).catch(err => console.error(err))
    }
    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            name: [this.middleware.name, [this.v.isBase,this.v.maxLength(45),this.v.minLength(2), this.v.isUnBlank], "模板名称格式不正确"],            
            cpu: [this.middleware.cpu, [this.v.isUnBlank, this.v.isNumber, this.v.min(2)], 'CPU设置不正确'],
            memory: [this.middleware.memory, [this.v.isUnBlank, this.v.isNumber ,this.v.min(4)], '内存设置不正确'],
            bootStorageSize: [this.middleware.bootStorageSize, [this.v.isUnBlank,this.v.isNumber, this.v.min(20)], '启动盘设置不正确'],
        }
         for (let i = 0; i < this.middleware.dbMiddlewareDiskTemplateModelList.length; i++) {
            regs["diskProfileList_" + i] = [this.middleware.dbMiddlewareDiskTemplateModelList[i].minDiskSize, [this.v.isUnBlank, this.v.isNumber, this.v.min(0)], `附件云硬盘(${i + 1})最小配置不正确`]
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
        console.log(this.middleware);
        this.layoutService.show();
        if (this.pageType == 'new') {
            this.service.postMiddlewareTemplate(this.middleware).then(res => {
                console.log(res);
                this.layoutService.hide();
                this.router.navigate(['prod-mng/template-mng/template-list', { type: '1' }])
            }).catch(err => {
                console.log(err);
                this.layoutService.hide();
            })
        } else {
            console.log(this.middleware);
            this.service.updateMiddlewareTemplate(this.middleware).then(res => {
                console.log(res);
                this.layoutService.hide();
                this.router.navigate(['prod-mng/template-mng/template-list', { type: '1' }])
            }).catch(err => {
                console.log(err);
                this.layoutService.hide();
            })
        }


    }
    cancel() {
        this.router.navigate(['prod-mng/template-mng/template-list', { type: '1' }])
    }
    ccf() {

    }
}