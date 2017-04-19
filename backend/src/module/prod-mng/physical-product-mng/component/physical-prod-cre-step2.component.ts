import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';

//model 
import { PhysicalService, FlatResourcePool, ResourcePoolObj, PartsFlavor, UnitObj ,FlatUnitObj} from '../model/physical-prod-service.model'
// service;
import { PhysicalServiceService } from '../service/physical-prod-service.service';
import { PhysicalProductService } from '../service/physical-prod-cre.service';


@Component({
    templateUrl: '../template/physical-prod-cre-step2.html',
    styleUrls: [],
    providers: []
})

export class PhysicalProdCreStep2Component implements OnInit {


    constructor(
        private route: Router,
        private router: ActivatedRoute,
        private LayoutService: LayoutService,
        private service:PhysicalProductService,
        private serviceService:PhysicalServiceService
    ) { }


    @ViewChild('notice')
    notice: NoticeComponent;

    unitList:FlatUnitObj;
    ngOnInit() {
        // this.router.params.forEach((params: Params) => {
            
        // })
        // if (this.prodDirId) {
           
        // }
        this.getUnitList();
    }
    //获取部件列表
    getUnitList() {
        this.serviceService.getUnitList().then(res => {
            console.log('unitList', res);
            if (res.resultCode == '100') {
                this.unitList = res.resultContent;
            }
        }).catch(err => {
            console.log(err);
        })
    }
    // 下一步
    ccf() { }
    //获取platformRegionList
    // platFormRegionList:;
    previous(){
        this.route.navigate(["prod-mng/physical-prod-mng/prod-mng-cre-step1"]);        
    }
    next() {
        this.route.navigate(["prod-mng/physical-prod-mng/prod-mng-cre-step3"]);
    }
    //取消
    cancel() {
        this.route.navigateByUrl('prod-mng/prod-mng/prod-mng', { skipLocationChange: true })
    }

}
