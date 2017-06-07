import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, ValidationService, NoticeComponent, PopupComponent } from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';
//model 
import { DatabaseMiddlewareServiceModel, ResourcPool, PlatformSimpleItem, ServiceTemplat, Platform } from '../model/database-middleware-service.model'
// service;
import { DatabaseMiddlewareService } from '../service/database-middleware-service.service';

@Component({
    templateUrl: '../template/database-middleware-service-cre.component.html',
    providers: []
})
export class DatabaseMiddlewareServiceCreComponent implements OnInit {
    constructor(
        private v: Validation,
        private router: ActivatedRoute,
        private route: Router,
        private service: DatabaseMiddlewareService,
        private layoutService: LayoutService,
        private location: Location
    ) {
        this.v.result = {}
    }
    @ViewChild('notice')
    notice: NoticeComponent;
    //PrivateCloud   
    serviceType: string;//服务类型
    servcieTitle: string;//创建服务器标题
    pageType: string;
    resourcePooList: Array<ResourcPool>;
    _platformlist: Array<PlatformSimpleItem>;
    serviceTemplatList: Array<ServiceTemplat>;
    databaseMiddlewareService: DatabaseMiddlewareServiceModel = new DatabaseMiddlewareServiceModel();//数据库中间件服务
    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            if (params['id']) {
                this.databaseMiddlewareService.serviceId = params['id'];
                this.getEditServiceDetail();
                this.pageType = '编辑产品目录';
                this.servcieTitle =
                    params['type'] == '5' ? '中间件服务器' : '数据库服务器';
                this.serviceType =
                    params['type'] == '5' ? 'MiddleWare' : 'Database';
                // this.servcieTitle=this.databaseMiddlewareService.
            } else {
                this.pageType = '新建产品目录'
                this.serviceType = params['type'];
                this.servcieTitle =
                    this.serviceType == 'MiddleWare' ? '中间件服务器' : '数据库服务器';
                this.databaseMiddlewareService.serverType =
                    params['code'] == 'PrivateCloud' ? '0' : params['code'] == 'PhyMachine' ? '1' : '2';
                // (this.databaseMiddlewareService.serverType == '1') && this.getResourcePoolList();//物理机暂不实现
                (this.databaseMiddlewareService.serverType == '0') && this.getPlateForm();
            }
        });
        (this.serviceType == 'Database') && this.getDatabaseServeTemplateList();
        (this.serviceType == 'MiddleWare') && this.getMiddleWareServeTemplateList();

    }
    //获取中间件服务模板列表
    getMiddleWareServeTemplateList() {
        this.layoutService.show()
        this.service.getMiddleWareServeTemplateList().then(res => {
            console.log(res);
            if (res && res.resultCode == "100") {
                this.serviceTemplatList = res.resultContent;
                this.databaseMiddlewareService.serviceTemplateId = this.serviceTemplatList[0].serviceTemplateId;
                this.databaseMiddlewareService.serviceTemplateName = this.serviceTemplatList[0].serviceTemplateName;
                this.layoutService.hide();
            }
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    //获取数据库服务模板列表
    getDatabaseServeTemplateList() {
        this.layoutService.show()
        this.service.getDatabaseServeTemplateList().then(res => {
            console.log(res);
            if (res && res.resultCode == "100") {
                this.serviceTemplatList = res.resultContent;
                this.databaseMiddlewareService.serviceTemplateId = this.serviceTemplatList[0].serviceTemplateId;
                this.databaseMiddlewareService.serviceTemplateName = this.serviceTemplatList[0].serviceTemplateName;
                this.layoutService.hide();
            }
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    //获取资源池列表
    getResourcePoolList() {
        this.layoutService.show();
        this.service.getResourcePoolList().then(res => {
            console.log('resourcepool', res);
            if (res.resultCode == '100') {
                this.resourcePooList = res.resultContent;
                this.resourcePooList.forEach(ele => ele.selected = false);
                this.resourcePooList.sort((ele1, ele2) => {
                    return Number(ele1.regionId) - Number(ele2.regionId)
                })
                this.layoutService.hide();
            }
        }).catch(err => {
            console.log(err);
            this.layoutService.hide();
        })
    }
    //获取平台列表;
    getPlateForm() {
        this.layoutService.show();
        this.service.getDiskPlateForms().then(
            response => {
                console.log('PINGTAI', response);
                if (response && 100 == response.resultCode) {
                    // let resultContent = response.resultContent;
                    this._platformlist = response.resultContent;
                    for (let plate of this._platformlist) {
                        if (!plate) continue;
                        plate.selected = false;
                    }
                } else {

                }
                this.layoutService.hide();
            }
        ).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    //编辑时获取目录详情
    getEditServiceDetail() {
        this.service.getDatabaseMiddlewareServiceEdit(this.databaseMiddlewareService.serviceId).then(res => {
            console.log(res);
            this.databaseMiddlewareService = res.resultContent;
            if (this.databaseMiddlewareService.serverType != '1') {
                this._platformlist = JSON.parse(JSON.stringify(res.resultContent.platformSimpleItemResp));
                for (let plat of this._platformlist) {
                    if (!plat) continue;
                    plat.disabled = plat.selected
                }
            } else {
                //资源池
            }

        }).catch(err => {
            console.error(err);
            this.layoutService.hide();
        })
    }
    //选择全部资源池或平台
    allSelected: boolean = false;
    selectAll(list) {
        this.allSelected = !this.allSelected;
        list.forEach(ele => ele.selected = this.allSelected);
    }
    //选择资源池或平台
    selectOne(idx, list) {
        list[idx].selected = !list[idx].selected;
        for (let ele of list) {
            if (ele.selected == false) {
                this.allSelected = false;
                return;
            }
        }
        this.allSelected = true;
    }
    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            serviceName: [this.databaseMiddlewareService.serviceName, [this.v.isBase, this.v.maxLength(50), this.v.isUnBlank], "产品目录名称格式不正确"],

            description: [this.databaseMiddlewareService.desc, [this.v.maxLength(300)], "描述输入错误"],

        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    //创建数据库或中间件服务
    onCreateService() {
        console.log(this.databaseMiddlewareService);
        let message = this.checkForm();
        if (message) {
            this.notice.open('操作错误', message);
            return;
        }
        //获取模板名称
        this.serviceTemplatList.forEach(tem => {
            if (this.databaseMiddlewareService.serviceTemplateId == tem.serviceTemplateId) {
                this.databaseMiddlewareService.serviceTemplateName = tem.serviceTemplateName;
                this.databaseMiddlewareService.serviceType = tem.serviceTemplatType;
            }
        });
        if (this.databaseMiddlewareService.serverType == '1'||this.databaseMiddlewareService.serverType == '2') {
            // this.databaseMiddlewareService.resourcPoolsProfiles = [];
            // this.databaseMiddlewareService.resourcPoolsProfiles = this.resourcePooList.filter(ele => {
            //     if (ele.selected) {
            //         ele.poolName = ele.region + '地区-' + ele.poolName;
            //         return ele
            //     }
            // })
            // if (this.databaseMiddlewareService.resourcPoolsProfiles.length == 0) {
                this.notice.open('提示', '准备开发')
                return
            // }
        } else if (this.databaseMiddlewareService.serverType == '0') {
            this.databaseMiddlewareService.platformSimpleItemResp = [];
            this._platformlist.forEach(ele => {
                if (ele.selected) {
                    this.databaseMiddlewareService.platformSimpleItemResp.push(ele);
                }
            })
            if (this.databaseMiddlewareService.platformSimpleItemResp.length == 0) {
                this.notice.open('COMMON.OPERATION_ERROR', '请选择平台信息')
                return
            }
        }
        //编辑还是新建
        if (this.databaseMiddlewareService.serviceId) {
            this.layoutService.show();
            this.service.putDatabaseMiddlewareService(this.databaseMiddlewareService).then(res => {
                this.layoutService.hide();                
                if(res&&res.resultCode==12001001){
                    this.notice.open('COMMON.ERROR','产品目录名称已存在');
                }else if(res.resultCode==100){
                    console.log(res);
                    this.location.back();                    
                }else{
                    this.notice.open('COMMON.ERROR',res.resultCode);
                }
            }).catch(err => {
                console.error(err);
                this.layoutService.hide();
            })
        } else {
            console.log(this.databaseMiddlewareService);
            this.layoutService.show();
            this.service.postDatabaseMiddlewareService(this.databaseMiddlewareService).then(res => {
                this.layoutService.hide();                
                if(res&&res.resultCode==12001001){
                    this.notice.open('COMMON.ERROR','产品目录名称已存在');
                }else if(res.resultCode==100){
                    console.log(res);
                    this.location.back();
                }else{
                    this.notice.open('COMMON.ERROR',res.resultCode);
                }
            }).catch(err => {
                console.error(err);
                this.layoutService.hide();
            })
        }

    }
    cancel() {
        this.location.back();
    }
}