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
import { ProdDirDisk, platform } from '../model/prodDirDisk.model';

@Component({
    selector: 'prod-dirdisk-cre',
    templateUrl: '../template/prod-dirDisk-cre.component.html',
    styleUrls: ['../../prod-mng/style/prod-cre.less'],
    providers: []
})

export class ProdDirDiskCreComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ProdDirDetailService: ProdDirDetailService,
        private CreateProdDirService: CreateProdDirService,
        private LayoutService: LayoutService
    ) { }

    @ViewChild('notice')
    notice: NoticeComponent;


    prodDir = new ProdDirDisk();
    _platformlist: Array<platform> = new Array<platform>();
    ngOnInit() {
        // let prodDirId: string;
        // let prodDirType: string;
        // console.log(this.route.params)
        // this.route.params.forEach((params: Params) => {
        //     // let id=+params['id'];
        //     prodDirId = params['id'];
        //     prodDirType = params['type'];

        // })
        // if (prodDirType == 'new') {

        // } else {
        //     // this.getProdDirDetail(prodDirId);
        // }
        this.getPlateForm();
    }
    getPlateForm() {
        this.CreateProdDirService.getDiskPlateForms().then(
            response => {
                console.log(response);
                if (response && 100 == response.resultCode) {
                    // let resultContent = response.resultContent;
                    this._platformlist = response.resultContent;
                    for (let plate of this._platformlist) {
                        for (let zone of plate.platformInfo) {
                            zone.storageId = zone.storageItem[0].storageId;
                            // console.log(zone.storageList);
                        }
                    }
                } else {

                }
                this.LayoutService.hide();
            }
        ).catch(err => {
            console.error(err);
        })
    }

    //获取启动盘信息
    selectStorage(storage) {
        console.log(storage);
    }






    getProdDirDetail(id) {
        // this.ProdDirDetailService.getVmProdDirDetail(id).then(
        //     response => {
        //         console.log(response);
        //         if (response && 100 == response.resultCode) {
        //             let resultContent = response.resultContent;
        //             this.prodDir = response.resultContent;
        //         } else {

        //         }
        //         this.LayoutService.hide();
        //     }
        // ).catch(err => {
        //     console.error(err);
        // })
        // console.log(this.prodDir);
    }
    //同步countBar数据
    outputValue(e, arg) {
        console.log(arg);
        this.prodDir.specification[arg] = e;
        console.log(e);
    }
    //选择全部可用区
    selectAllZone: boolean = false;
    selectAllZones() {
        this.selectAllZone = !this.selectAllZone;
        console.log(this.selectAllZone);
        for (let plate of this._platformlist) {
            for (let zone of plate.platformInfo) {
                zone.selected = this.selectAllZone;
                // console.log(zone.storageList);
            }
        }
        this.prodDir.platformList = this._platformlist.filter(function (ele) {
            for (let zone of ele.platformInfo) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
    }
    //选择平台可用区
    selectZone(idx, idxx) {
        console.log(idx)
        console.log(idxx)
        this._platformlist[idx].platformInfo[idxx].selected = !this._platformlist[idx].platformInfo[idxx].selected;
        console.log(this._platformlist[idx]);
        this.prodDir.platformList = this._platformlist.filter(function (ele) {
            for (let zone of ele.platformInfo) {
                if (zone.selected == true) {
                    return ele;
                }
            }
        })
        console.log(this.prodDir.platformList);
        if(this.prodDir.platformList.length==0){
            this.selectAllZone=false;
        }
        if(this.prodDir.platformList.length==this._platformlist.length){
            this.selectAllZone=true;
        }
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
        if (this.prodDir.specification.maxSize == 0 || this.prodDir.specification.stepSize == 0) {
            this.notice.open('操作错误', '产品规格数据设置错误');
            return;
        }
        if (this.prodDir.platformList.length == 0) {
            this.notice.open('操作错误', '请选择可用平台');
            return;
        }
        this.LayoutService.show();
        this.CreateProdDirService.postDiskProdDir(this.prodDir).then(response => {
            console.log(response)
            this.LayoutService.hide();
            this.router.navigateByUrl('prod-mng/prod-dir-mng/prod-dir-mng', { skipLocationChange: true })
        }).catch(err => {
            console.error(err);
            this.LayoutService.hide();
        })
    }


}
