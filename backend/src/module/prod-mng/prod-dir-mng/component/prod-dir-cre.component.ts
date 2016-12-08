/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { LayoutService, ValidationService, NoticeComponent, CountBarComponent } from '../../../../architecture';

//service
import { ProdDirDetailService } from '../service/prod-dir-detail.service';
import { CreateProdDirService } from '../service/prod-dir-new.service';
//model
import { ProdDir, platform } from '../model/prodDir.model';

@Component({
    selector: 'prod-dir-cre',
    templateUrl: '../template/prod-dir-cre.component.html',
    styleUrls: ['../../prod-mng/style/prod-cre.less'],
    providers: []
})

export class ProdDirCreComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ProdDirDetailService: ProdDirDetailService,
        private CreateProdDirService: CreateProdDirService,
        private LayoutService: LayoutService
    ) { }

    @ViewChild('notice')
    notice: NoticeComponent;


    prodDir = new ProdDir();
    _platformlist: Array<platform> = new Array<platform>();
    ngOnInit() {
        let prodDirId: string;
        let prodDirType: string;
        console.log(this.route.params)
        this.route.params.forEach((params: Params) => {
            // let id=+params['id'];
            prodDirId = params['id'];
            prodDirType = params['type'];
            if(params['vcpu']){
                this.prodDir.specification.vcpu=params['vcpu'];
                this.prodDir.specification.mem=params['mem'];
                this.prodDir.specification.startupDisk=params['startupDisk'];
            }           
            this.selectPlateForm();
        })
        if (prodDirType == 'new') {

        } else {
            // this.getProdDirDetail(prodDirId);
        }
    }
    getProdDirDetail(id) {
        this.ProdDirDetailService.getVmProdDirDetail(id).then(
            response => {
                console.log(response);
                if (response && 100 == response.resultCode) {
                    let resultContent = response.resultContent;
                    this.prodDir = response.resultContent;
                } else {

                }
                this.LayoutService.hide();
            }
        ).catch(err => {
            console.error(err);
        })
        console.log(this.prodDir);
    }
    //同步countBar数据
    outputValue(e, arg) {
        console.log(arg);
        this.prodDir.specification[arg] = e;
        // arg=e;
        console.log(e);
        console.log(this.prodDir.specification.mem);
        // console.log(this.prodDir.specification.vcpu);          

    }
    testList = [
        {
            displayName: "高速I/O",
            selected: false,
            serviceSKUId:'sadasdasdas',
            storageId: "88",
            storageName: "高速I/O",
        },
        {
            displayName: "高速I/O",
            selected: false,
            serviceSKUId:'sadasdasdas',
            storageId: "77",
            storageName: "高速I/O",
        }
    ]
    //点击获取可用平台
    selectPlateForm() {
        console.log(this.prodDir.specification.vcpu);
        console.log(this.prodDir.specification.mem);
        this.CreateProdDirService.postCpuMmr(this.prodDir.specification.vcpu, this.prodDir.specification.mem).then(response => {
            // console.log(response);
            if (response && 100 == response.resultCode) {
                let resultContent = response.resultContent;
                this._platformlist = response.resultContent;
                console.log(this._platformlist);
                for (let plate of this._platformlist) {
                    for (let zone of plate.zoneList) {
                        zone.storageId = zone.storageList[0].storageId;
                        zone.serviceSKUId = zone.storageList[0].serviceSKUId;
                        // console.log(zone.storageList);
                    }
                }
            } else {

            }
            this.LayoutService.hide();
            this.selectAllZone = false;
        }).catch(err => {
            console.error(err);
        });
    }
    //选择全部可用区
    selectAllZone: boolean = false;
    selectAllZones() {
        this.selectAllZone = !this.selectAllZone;
        console.log(this.selectAllZone);
        for (let plate of this._platformlist) {
            for (let zone of plate.zoneList) {
                zone.selected = this.selectAllZone;
                // console.log(zone.storageList);
            }
        }
        this.prodDir.platformList = this._platformlist.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
    }
    //选择平台启动盘,this 
    selectStorage(id,idx) {
        console.log(id);
        console.log(idx);
    }
    //选择平台可用区
    selectZone(idx, idxx) {
        this._platformlist[idx].zoneList[idxx].selected = !this._platformlist[idx].zoneList[idxx].selected;
        console.log(this._platformlist[idx]);
        this.prodDir.platformList = this._platformlist.filter(function (ele) {
            for (let zone of ele.zoneList) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        if(this.prodDir.platformList.length==0){this.selectAllZone=false}
        if(this.prodDir.platformList.length==this._platformlist.length){this.selectAllZone=true}
    }

    cancel() {
        this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
    }

    onSubmit() {
        console.log(this.prodDir);
        if (!this.prodDir.serviceName) {
            this.notice.open('操作错误', '请输入产品目录名称');
            return;
        }
        if (this.prodDir.specification.vcpu == 0 || this.prodDir.specification.mem == 0) {
            this.notice.open('操作错误', '产品规格数据设置错误');
            return;
        }
        if (this.prodDir.platformList.length == 0) {
            this.notice.open('操作错误', '请选择可用平台');
            return;
        }
        this.prodDir.serviceTemplateId = '';
        this.LayoutService.show();
        this.CreateProdDirService.postVmProdDir(this.prodDir).then(response => {
            console.log(response);
            this.LayoutService.hide();
            this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
        }).catch(err => {
            console.error(err);
            this.LayoutService.hide();
        })
    }


}
