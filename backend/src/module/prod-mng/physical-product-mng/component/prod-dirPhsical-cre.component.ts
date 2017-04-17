/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { Location } from '@angular/common';

import { LayoutService, ValidationService, NoticeComponent, PopupComponent } from '../../../../architecture';

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
        private service: PhysicalServiceService
    ) { }

    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('newUnitPop')
    newUnitPop: PopupComponent

    //
    // unitList: Array<PartsFlavor>=new Array <PartsFlavor>();
    resourcePooList: Array<FlatResourcePool>;
    physicalService: PhysicalService = new PhysicalService();
    flavorInfoList: Array<UnitObj>;
    newUnitObj: PartsFlavor = new PartsFlavor();
    ngOnInit() {
        this.getResourcePoolList();
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
    //获取部件列表
    // getUnitList() {
    //     this.service.getUnitList().then(res => {
    //         console.log('unitList', res);
    //         if (res.resultCode == '100') {
    //             this.unitList = res.resultContent;
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }
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
        this.selectedPartId='';
        this.selectedSpecId='';        
        this.newUnitPop.open('新增部件');
        // this.selectedFlavor=this.flavorInfoList[0];
    }
    partIdValid: boolean = true;
    specIdValid: boolean = true;
    specValueValid: boolean = true;
    specNumberValid: boolean = true;
    otcreateUnit() {
        console.log(this.selectedPartId);
        console.log(this.selectedSpecId);
        console.log(this.newUnitObj.partsFlavorValue);
        console.log(this.newUnitObj.partFlavorNum);
        if (!this.selectedPartId||this.newUnitObj.partsId == '') {
            this.partIdValid = false;
            return;
        }
        if (!this.selectedSpecId||this.newUnitObj.specId == '') {
            this.specIdValid = false;
            return;
        }
        if (this.newUnitObj.partsFlavorValue == '') {
            this.specValueValid = false;
            return;
        }
        if (this.newUnitObj.partFlavorNum == 0) {
            this.specNumberValid = false;
            return;
        }
        console.log(this.newUnitObj);
        this.physicalService.phyMachinePartsFlavors.push(this.newUnitObj);
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
        this.newUnitObj.partsFlavorValue = '';
        if (this.newUnitObj.specId != '') {
            this.specIdValid = true;
        }
    }
    //选择规格值

    //选择操作部件
    selectUnit(idx) {
        this.physicalService.phyMachinePartsFlavors.forEach(unit => {
            unit.selected = false;
        })
        this.physicalService.phyMachinePartsFlavors[idx].selected = true;
    }
    //编辑部件
    editUnit(){}
    //删除部件
    deleteUnit(){
        console.log();
        let list=this.physicalService.phyMachinePartsFlavors
        for(let i=0;i<list.length;i++){
            if(list[i].selected==true){
                list.splice(i,1);
                return
            }
            if(i==list.length){
                this.notice.open('操作错误','清选择操作部件');
            }
        }
    }
    //选择全部资源池
    allSelected: boolean = false;
    selectAllResourcePool() {
        this.allSelected = !this.allSelected;
        this.resourcePooList.forEach(ele => ele.selected = this.allSelected);
    }

    //拼接资源池对象数组
    combineObj() {
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
            obj.areaID = i;
            for (let resource of this.resourcePooList) {
                if (resource.selected && resource.regionId == i) {
                    obj.areaName = resource.region;
                    obj.areaDisplayName = '';
                    obj.phyMachineResourcPoolsProfile.push({
                        "resourcePoolId": resource.pmPoolId,
                        "resourcePoolName": resource.poolName,
                        "resourcePoolDisplayName": '',
                        selected: true
                    })
                }
            }
            this.physicalService.phyMachineAreaPoolsProfile.push(obj);
        }
        console.log(this.physicalService);
    }
    onCreateService() {
        // this.physicalService.phyMachineAreaPoolsProfile
        this.combineObj();
        // this.location.back;
    }
    cancel() {
        this.location.back;
    }

}
