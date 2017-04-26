import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, ValidationService, NoticeComponent, PopupComponent } from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';
//service
import { ManagerServeServiceService } from '../service/manager-serve-service.service';
//model
import { ManagerServeServiceModel, PmPool, Platform ,PlatformObj} from '../model/manager-serve-service.model';

@Component({
    templateUrl: '../template/manager-serve-service-cre.html',
    providers: []
})
export class ManagerServeServiceCreComponent implements OnInit {
    constructor(
        private v: Validation,
        private router: ActivatedRoute,
        private route: Router,
        private service: ManagerServeServiceService,
        private LayoutService: LayoutService,
        private location: Location
    ) {
        this.v.result = {}
    }

    serveObjName: string;
    resourcePooList: Array<PmPool>;
    _platformlist: Array<PlatformObj>;
    managerServeService: ManagerServeServiceModel = new ManagerServeServiceModel();
    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            this.serveObjName = params['objName'];
            this.managerServeService.serviceObjectCode = params['code'];
        });
        if (this.managerServeService.serviceObjectCode == '2') {
            this.getResourcePoolList();
        } else if (this.managerServeService.serviceObjectCode != '8') {
            this.getPlateForm();
        }
    }
    //获取资源池你列表
    getResourcePoolList() {
        this.service.getResourcePoolList().then(res => {
            console.log('resourcepool', res);
            if (res.resultCode == '100') {
                this.resourcePooList = res.resultContent;
                this.resourcePooList.forEach(ele => ele.selected = false);
                this.resourcePooList.sort((ele1, ele2) => {
                    return Number(ele1.regionId) - Number(ele2.regionId)
                })
            }
        }).catch(err => {
            console.log(err);
        })
    }
    //获取平台列表;
    getPlateForm() {
        this.LayoutService.show();
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
                this.LayoutService.hide();
            }
        ).catch(err => {
            console.error(err);
            this.LayoutService.hide();
        })
    }

    //选择全部资源池或平台
    allSelected: boolean = false;
    selectAll(list) {
        console.log(list);
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
            serviceName: [this.managerServeService.serviceName, [this.v.isBase, this.v.isUnBlank], "产品目录名称格式不正确"],

            description: [this.managerServeService.description, [this.v.maxLength(68)], "描述输入错误"],

        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    //创建管理服务
    onCreateService() {
        console.log(this.managerServeService);
        let message = this.checkForm();
        if (message) return;
        if (this.managerServeService.serviceObjectCode == '2') {
            this.managerServeService.pmPoolList=[];
            this.managerServeService.pmPoolList = this.resourcePooList.filter(ele => {
                if (ele.selected) { return ele; }
            })
        } else if (this.managerServeService.serviceObjectCode != '8') {
            this.managerServeService.platformList=[];
            this._platformlist.forEach(ele => {
                if (ele.selected) {
                    this.managerServeService.platformList.push({
                        "code": ele.platformName,
                        "id": ele.platformId,
                        "name": ele.platformName,
                    })
                }
            })
        }
        console.log(this.managerServeService);        
    }
    cancel() {
        this.location.back();
    }
}