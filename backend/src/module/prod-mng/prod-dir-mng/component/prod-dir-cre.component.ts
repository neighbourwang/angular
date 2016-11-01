/**
 * Created by wangyao on 2016/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { Config } from '../../../../architecture/components/countBar/config/config';
import { LayoutService, ValidationService, NoticeComponent, ConfirmComponent, CountBarComponent } from '../../../../architecture';

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
    countBar: Config = {
        default: 0,
        step: 50,
        min: 0,
        max: 2046,
        disabled: false,
        name: 'prodCre01'
    }
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
    //点击选择可用平台
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
                        // console.log(zone.storageList);
                    }
                }
            } else {

            }
            this.LayoutService.hide();
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
    }

    cancel() {
        this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
    }

    onSubmit() {
        console.log(this.prodDir);
        this.CreateProdDirService.postVmProdDir(this.prodDir).then(response => {
            console.log(response)
            this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
        }).catch(err => {
            console.error(err);
        })
    }


}
