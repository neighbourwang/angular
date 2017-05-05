import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, PopupComponent } from '../../../../architecture';

//model 
import { PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj, Spec } from '../model/physical-prod-service.model'

// service;
import { PhysicalProductService } from '../service/physical-prod-cre.service';


@Component({
    templateUrl: '../template/physical-prod-cre-step3.html',
    styleUrls: [],
    providers: []
})

export class PhysicalProdCreStep3Component implements OnInit {
    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service:PhysicalProductService
    ) { }


    @ViewChild('notice')
    notice: NoticeComponent;

    prodDirType: string = "";
    prodDirId: string = "";
    ngOnInit() {
        this.router.params.forEach((params: Params) => {
            
        })
        for(let resourcePool of this.service.physicalService.phyMachineAreaPoolsProfile){
            if(resourcePool.selected==false){
                this.allSelected=false;
                return;
            }
        }
        this.allSelected=true;
    }
    //选择全部资源池
    allSelected: boolean = false;
    selectAllResourcePool() {
        this.allSelected = !this.allSelected;
        this.service.physicalService.phyMachineAreaPoolsProfile.forEach(ele => ele.selected = this.allSelected);
    }
    //选择资源池
    selectResourcePool(idx){
        console.log(idx);
        console.log(this.service.physicalService.phyMachineAreaPoolsProfile[idx]);
        this.service.physicalService.phyMachineAreaPoolsProfile[idx].selected=!this.service.physicalService.phyMachineAreaPoolsProfile[idx].selected;
        for(let resourcePool of this.service.physicalService.phyMachineAreaPoolsProfile){
            if(resourcePool.selected==false){
                this.allSelected=false;
                return;
            }
        }
        this.allSelected=true;
    }
    //拼接资源池对象数组
    combineObj() {
        this.service.product.phyMachineAreaPoolsProfile=[];
        let list = this.service.physicalService.phyMachineAreaPoolsProfile.filter(ele => {
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
            for (let resource of this.service.physicalService.phyMachineAreaPoolsProfile) {
                if (resource.selected && resource.regionId == i) {
                    obj.region = resource.region;
                    obj.areaDisplayName = resource.areaDisplayName;
                    obj.phyMachineResourcPoolsProfile.push({
                        "pmPoolId": resource.pmPoolId,
                        "poolName": resource.poolName,
                        "resourcePoolDisplayName": resource.resourcePoolDisplayName,
                        "skuid":resource.skuid,
                        selected: true
                    })
                }
            }
            this.service.product.phyMachineAreaPoolsProfile.push(obj);
        }
        console.log(this.service.product);
    }
    // 下一步
    ccf() { }
    //获取platformRegionList
    // platFormRegionList:;
    previous(){
        this.route.navigate(["prod-mng/physical-prod-mng/prod-mng-cre-step2"]);        
    }
    next() {
        this.combineObj();
        if(this.service.product.phyMachineAreaPoolsProfile.length==0){
            this.notice.open('操作错误','请选择资源池');
            return;
        }
        this.route.navigate(["prod-mng/physical-prod-mng/prod-mng-cre-step4"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
