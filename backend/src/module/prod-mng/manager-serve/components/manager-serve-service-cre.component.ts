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

    @ViewChild('notice')
    notice: NoticeComponent;

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
        } else if (this.managerServeService.serviceObjectCode != '6'&&this.managerServeService.serviceObjectCode != '7'&&this.managerServeService.serviceObjectCode != '8') {
            this.getPlateForm();
        }
    }
    //获取资源池你列表
    getResourcePoolList() {
        this.LayoutService.show();        
        this.service.getResourcePoolList().then(res => {
            console.log('resourcepool', res);
            if (res.resultCode == '100') {
                this.resourcePooList = res.resultContent;
                this.resourcePooList.forEach(ele => ele.selected = false);
                this.resourcePooList.sort((ele1, ele2) => {
                    return Number(ele1.regionId) - Number(ele2.regionId)
                })
                this.LayoutService.hide();                
            }
        }).catch(err => {
            console.log(err);
                this.LayoutService.hide();            
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
    selectOne(idx,list) {
        console.log(list);
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
            serviceName: [this.managerServeService.serviceName, [this.v.isBase, this.v.isUnBlank,this.v.minLength(2),this.v.maxLength(50)], "产品目录名称格式不正确"],

            description: [this.managerServeService.description, [this.v.maxLength(255)], "描述输入错误"],
        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    //创建管理服务
    onCreateService() {
        console.log(this.managerServeService);
        let message = this.checkForm();
        if (message) {
            this.notice.open('操作错误', message);
            return;
        }
        if (this.managerServeService.serviceObjectCode == '2') {
            this.managerServeService.pmPoolList=[];
            this.managerServeService.pmPoolList = this.resourcePooList.filter(ele => {
                if (ele.selected) { 
                    return ele; }
            })
            if(this.managerServeService.pmPoolList.length==0){
                this.notice.open('COMMON.OPERATION_ERROR','请选择资源池信息')
                return 
            }
        } else if (this.managerServeService.serviceObjectCode != '6'&&this.managerServeService.serviceObjectCode != '7'&&this.managerServeService.serviceObjectCode != '8') {
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
             if(this.managerServeService.platformList.length==0){
                this.notice.open('COMMON.OPERATION_ERROR','请选择平台信息')
                return 
            }
        }
        console.log(this.managerServeService);
        this.LayoutService.show(); 
        this.service.postManagerServeService(this.managerServeService).then(res=>{
             this.LayoutService.hide();                
                if(res&&res.resultCode==12001001){
                    this.notice.open('COMMON_ERROR','产品目录名称已存在');
                }else if(res.resultCode==100){
                    this.location.back();
                }else{
                    this.notice.open('COMMON_ERROR',res.resultCode);
                }            
        }).catch(err=>{
            console.error(err);
            this.LayoutService.hide();            
        })       
    }
    cancel() {
        this.location.back();
    }
}