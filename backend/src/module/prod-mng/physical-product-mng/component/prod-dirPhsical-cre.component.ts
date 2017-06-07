import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, ValidationService, NoticeComponent, PopupComponent } from '../../../../architecture';
import { Validation, ValidationRegs } from '../../../../architecture';


//service
import { PhysicalServiceService } from '../service/physical-prod-service.service';
//model
import { PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj, Spec } from '../model/physical-prod-service.model'

@Component({
    templateUrl: '../template/prod-dirPhsical-cre.component.html',
    styles: [`
        .validErr{
            border:1px solid #a94442;
        }
    `],
    providers: []
})
export class PhsicalProdDirCreComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private location: Location,
        private service: PhysicalServiceService,
        private v: Validation,
        private router: Router,
        private route: ActivatedRoute

    ) {
        this.v.result = {};
    }

    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('newUnitPop')
    newUnitPop: PopupComponent

    //
    pageTitle: string;
    pageType:string;
    // unitList: Array<PartsFlavor>=new Array <PartsFlavor>();
    resourcePooList: Array<FlatResourcePool>;
    physicalService: PhysicalService = new PhysicalService();
    flavorInfoList: Array<UnitObj>;
    newUnitObj: PartsFlavor = new PartsFlavor();

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.pageType=params['type'];
            this.pageTitle =
                this.pageType == 'edit' ? '编辑产品目录' : '创建产品目录';
            if (this.pageType == 'edit') {
                this.physicalService.serviceId = params['id'];
            }
        })
        if (this.physicalService.serviceId) {
            console.log(this.physicalService.serviceId);
            this.service.getEditPhysicalService(this.physicalService.serviceId).then(res => {
                console.log(res);
                this.physicalService = res.resultContent;
                this.resourcePooList = JSON.parse(JSON.stringify(this.physicalService.pmResourcePools));
                this.resourcePooList.forEach(ele =>ele.disabled=ele.selected);                
                this.resourcePooList.sort((ele1, ele2) => {
                    return Number(ele1.regionId) - Number(ele2.regionId)
                })
            }).catch(err => {
                console.log(err)
            })
        }else{
            this.getResourcePoolList();            
        }
        this.getUnitFlavorList();
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

    //获取新增部件规格选择列表
    getUnitFlavorList() {
        this.service.getflavorInfoList().then(res => {
            console.log('flavorList', res);
            if (res.resultCode == '100') {
                this.flavorInfoList = res.resultContent;
            }
        }).catch(err => {
            console.log(err);
        })
    }
    addUnit() {
        this.newUnitObj = new PartsFlavor();
        this.selectedPartId = '';
        this.selectedSpecId = '';
        this.newUnitPop.open('新增部件');
        // this.selectedFlavor=this.flavorInfoList[0];
    }
    partIdValid: boolean = true;
    specIdValid: boolean = true;
    specValueValid: boolean = true;
    specNumberValid: boolean = true;
    hasSameUnit:boolean=false;
    changeSpecNum(){
        this.specNumberValid=
            this.newUnitObj.partFlavorNum!=0?true:false;
        //判定是否相同部件信息已存在
        for(let unit of this.physicalService.phyMachinePartsFlavors){
            if(unit.specId ==this.newUnitObj.specId&&unit.specName == this.newUnitObj.specName&&unit.partsFlavorValue==this.newUnitObj.partsFlavorValue&&unit.partFlavorNum== this.newUnitObj.partFlavorNum){
                return this.hasSameUnit=true;
            }else{
                return this.hasSameUnit=false;                
            }
        }
    }
    otcreateUnit() {
        console.log(this.selectedPartId);
        console.log(this.selectedSpecId);
        console.log(this.newUnitObj.partsFlavorValue);
        console.log(this.newUnitObj.partFlavorNum);
        if (!this.selectedPartId || this.newUnitObj.partsId == '') {
            if (!this.isEditUnit) this.partIdValid = false;
            return;
        }
        if (!this.selectedSpecId || this.newUnitObj.specId == '') {
            this.specIdValid = false;
            return;
        }
        if (this.newUnitObj.partsFlavorValue == 0) {
            this.specValueValid = false;
            return;
        }
        if (this.newUnitObj.partFlavorNum == 0) {
            this.specNumberValid = false;
            return;
        }
        if(this.hasSameUnit) return;
        if (this.newUnitObj.partsName == '内存' || this.newUnitObj.partsName == '磁盘') {
            this.newUnitObj.capacity = this.newUnitObj.partFlavorNum * this.newUnitObj.partsFlavorValue;
        } else {
            this.newUnitObj.capacity = 0;
        }
        console.log(this.newUnitObj);       
        if (this.isEditUnit) {
            this.physicalService.phyMachinePartsFlavors[this.selectedUnitIdex].specId = this.newUnitObj.specId;
            this.physicalService.phyMachinePartsFlavors[this.selectedUnitIdex].specName = this.newUnitObj.specName;
            this.physicalService.phyMachinePartsFlavors[this.selectedUnitIdex].partsFlavorValue = this.newUnitObj.partsFlavorValue;
            this.physicalService.phyMachinePartsFlavors[this.selectedUnitIdex].partFlavorNum = this.newUnitObj.partFlavorNum;
            this.physicalService.phyMachinePartsFlavors[this.selectedUnitIdex].capacity = this.newUnitObj.capacity;
        } else {
            this.physicalService.phyMachinePartsFlavors.push(this.newUnitObj);
        }
        this.newUnitPop.close();
        // this.unitList.push(this.newUnitObj);
        // this.newUnitPop.close();
    }

    ccf() {
        this.newUnitObj = new PartsFlavor();
        this.selectedPartId = '';
        this.selectedSpecId = '';
        this.partIdValid = true;
        this.specIdValid = true;
        this.specValueValid = true;
        this.specNumberValid = true;
        this.isEditUnit = false;
        this.hasSameUnit=false;
    }
    //选择部件规格
    selectedPartId: string = '';
    selectedFlavor: UnitObj = new UnitObj();
    selectFlavorObj(e) {
        console.log(e);
        this.selectedFlavor = Object.assign({}, this.flavorInfoList.filter(ele => {
            if (ele.partsId == this.selectedPartId) { return ele; }
        })[0]);
        this.newUnitObj.partsId = this.selectedFlavor.partsId;
        this.newUnitObj.partsName = this.selectedFlavor.partsName;
        this.selectedSpecId = ''
        this.newUnitObj.specId = '';
        this.newUnitObj.specName = '';
        if (this.newUnitObj.partsId != '') {
            this.partIdValid = true;
        }
    }
    //选择规格
    selectedSpecId: string = '';
    selectedSpecObj: Spec = new Spec();
    selectSpec() {
        this.selectedSpecObj = Object.assign({}, this.selectedFlavor.specList.filter(ele => {
            if (ele.specId == this.selectedSpecId) { return ele }
        })[0]);
        this.newUnitObj.specId = this.selectedSpecObj.specId;
        this.newUnitObj.specName = this.selectedSpecObj.specName;
        this.newUnitObj.partsFlavorValue = 0;
        if (this.newUnitObj.specId != '') {
            this.specIdValid = true;
        }
    }
    //选择规格值

    //选择操作部件
    selectedUnitIdex: number;
    selectUnit(idx) {
        this.physicalService.phyMachinePartsFlavors.forEach(unit => {
            unit.selected = false;
        })
        this.selectedUnitIdex = idx;
        this.physicalService.phyMachinePartsFlavors[idx].selected = true;
    }
    //编辑部件
    isEditUnit: boolean = false;
    editUnit() {
        let part: PartsFlavor;
        part = this.physicalService.phyMachinePartsFlavors.filter(ele => {
            if (ele.selected == true) {
                return ele
            }
        })[0];
        if (!part) {
            this.notice.open('操作错误', '请选择操作部件');
            return;
        }
        this.isEditUnit = true;
        console.log(part);
        console.log(this.newUnitObj);
        console.log(this.selectedSpecId);
        this.selectedPartId = part.partsId;
        this.selectedFlavor = Object.assign({}, this.flavorInfoList.filter(ele => {
            if (ele.partsId == this.selectedPartId) { return ele; }
        })[0]);
        this.selectedSpecId = part.specId;
        this.selectedSpecObj = Object.assign({}, this.selectedFlavor.specList.filter(ele => {
            if (ele.specId == this.selectedSpecId) { return ele }
        })[0]);
        this.newUnitObj.partFlavorNum = part.partFlavorNum;
        this.newUnitObj.partsFlavorValue = part.partsFlavorValue;
        this.newUnitPop.open('新增部件');
    }
    //删除部件
    deleteUnit() {
        console.log();
        if (this.physicalService.phyMachinePartsFlavors.length == 0) {
            this.notice.open('操作错误', '无可操作部件')
        }
        let list = this.physicalService.phyMachinePartsFlavors
        for (let i = 0; i < list.length; i++) {
            if (list[i].selected == true) {
                list.splice(i, 1);
                return
            }
        }
        this.notice.open('操作错误', '请选择操作部件');
    }
    //选择全部资源池
    allSelected: boolean = false;
    selectAllResourcePool() {
        this.allSelected = !this.allSelected;
        this.resourcePooList.forEach(ele => ele.selected = this.allSelected);
    }
    //选择资源池
    selectResourcePool(idx) {
        console.log(idx);
        console.log(this.resourcePooList[idx]);
        this.resourcePooList[idx].selected = !this.resourcePooList[idx].selected;
        for (let resourcePool of this.resourcePooList) {
            if (resourcePool.selected == false) {
                this.allSelected = false;
                return;
            }
        }
        this.allSelected = true;
    }
    //拼接资源池对象数组
    combineObj() {
        this.physicalService.phyMachineAreaPoolsProfile = [];
        console.log(this.resourcePooList);
        let list = this.resourcePooList.filter(ele => {
            if (ele.selected == true)
                return ele;
        }).map(ele => ele.regionId);
        let noRepeateList = [];
        for (let l of list) {
            if (noRepeateList.indexOf(l) === -1) {
                noRepeateList.push(l);
            }
        }
        let poolList: Array<ResourcePoolObj>;
        for (let i of noRepeateList) {
            let obj: ResourcePoolObj = new ResourcePoolObj();
            obj.regionId = i;
            for (let resource of this.resourcePooList) {
                if (resource.selected && resource.regionId == i) {
                    obj.region = resource.region;
                    obj.areaDisplayName = '';
                    obj.phyMachineResourcPoolsProfile.push({
                        "pmPoolId": resource.pmPoolId,
                        "poolName": resource.poolName,
                        "resourcePoolDisplayName": '',
                        "skuid": '',
                        selected: true
                    })
                }
            }
            this.physicalService.phyMachineAreaPoolsProfile.push(obj);
        }
        console.log(this.physicalService);
    }
    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            serviceName: [this.physicalService.serviceName, [this.v.isBase, this.v.isUnBlank,this.v.maxLength(50)], "产品目录名称格式不正确"],

            description: [this.physicalService.desc, [this.v.maxLength(300)], "描述输入错误"],
        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    onCreateService() {
        let message = this.checkForm();
        if (message) return;
        // this.physicalService.phyMachineAreaPoolsProfile
        if (this.physicalService.phyMachinePartsFlavors.length == 0) {
            this.notice.open('操作错误', '服务目录规格列表不能为空');
            return;
        }
        this.combineObj();
        if (this.physicalService.phyMachineAreaPoolsProfile.length == 0) {
            this.notice.open('操作错误', '服务目录资源池列表不能为空');
            return;
        }
        this.layoutService.show();        
        if (this.physicalService.serviceId) {
            this.physicalService.pmResourcePools=[];//清空无用数据;
            this.service.updatePhysicalService(this.physicalService).then(res => {
                 this.layoutService.hide();                
                if(res&&res.resultCode==12001001){
                    this.notice.open('COMMON.ERROR','产品目录名称已存在');
                }else if(res.resultCode==100){
                    console.log(res);
                    this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
                }else{
                    this.notice.open('COMMON.ERROR',res.resultCode);
                }
            }).catch(err => {
                console.error(err);
                this.layoutService.hide();
            })
        } else {
            this.service.postPhysicalService(this.physicalService).then(res => {
                this.layoutService.hide();                
                if(res&&res.resultCode==12001001){
                    this.notice.open('COMMON.ERROR','产品目录名称已存在');
                }else if(res.resultCode==100){
                    console.log(res);
                    this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
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
