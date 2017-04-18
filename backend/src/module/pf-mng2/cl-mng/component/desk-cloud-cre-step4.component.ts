/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';
//model
import { StorageModel } from '../model/cre-step4.model';
import { VolumeTypeModel } from '../model/volumeType.model';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { StorageListService } from '../service/cl-mng-cre-step-4.service';

import { ClMngIdService } from '../service/cl-mng-id.service';




@Component({
    templateUrl: '../template/desk-cloud-cre-step4.component.html',
    styleUrls: [
    ],
    providers: []
})

export class DeskCloudCreStep4Component implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private idService: ClMngIdService,
        private service: StorageListService,
        private layoutService: LayoutService
    ) { }

    @ViewChild('notice')
    notice: NoticeComponent

    creStep4Model: Array<StorageModel> = new Array<StorageModel>();
    volumeTypeList: Array<VolumeTypeModel> = new Array<VolumeTypeModel>();

    platformType: string;
    platformId: string;
    ngOnInit() {
        //获取平台类型
        this.route.params.forEach((params: Params) => {
            this.platformType = params['type'];
            console.log(this.platformType);
        })

        this.platformId = this.idService.getPlatformId();
        this.layoutService.show();
        this.service.getStorage(this.platformId).then(
            res => {
                this.creStep4Model = res.resultContent;
                this.creStep4Model.forEach(ele => {
                    ele.valid = true;
                    ele.quota =
                        ele.quota ? ele.quota : 0;
                    ele.quotaPercentDisplay = ele.quota * 100;
                })
                ////获volumeType列表
                if (this.platformType == '0') {
                    this.getVolumeTypeList(this.platformId);
                }
                console.log(this.creStep4Model);
                this.layoutService.hide();
            }
        ).catch(
            error => {
                console.error('error');
                this.layoutService.hide();
            }
            )
        //获volumeType列表

    }
    //获取volumeType列表
    getVolumeTypeList(id: string) {
        return this.service.getVolumeTypeList(id).then(
            res => {
                console.log(res);
                this.volumeTypeList = res.resultContent
            }
        ).catch(err => {
            console.error(err);
        });
    }
    //
    keepSame(item) {
        // if (this.platformType == '2') {
        let sum: number = 0;
        for (let storage of this.creStep4Model) {
            storage.valid = true;
            if (storage.id == item.id) {
                // storage.displayName = item.displayName;
                // storage.description = item.description;
                storage.replica = item.replica;
                sum += storage.quotaPercentDisplay;
                // item.valid=sum>100?false:true;
            }
        }
        item.valid =
            sum > 100 ? false : true;
        console.log(sum);
        // for(let storage of this.creStep4Model){

        // }
        // }
    }
    next() {
        console.log(this.volumeTypeList);
        let valid: boolean = true;
        this.creStep4Model.forEach(ele => {
            if (ele.valid == false) {
                return valid = false;
            }
            ele.quotaPercentage = ele.quotaPercentDisplay / 100
        })
        console.log(valid);
        if (!valid) {
            this.notice.open('COMMON.OPERATION_ERROR', 'PF_MNG2.STOARGE_QUOTA_SET_ERROR');//存储区配额设置错误，同一存储区配额总额设置超额
            return;
        }
        let platFormId: String = this.idService.getPlatformId();
        this.creStep4Model.forEach(ele => {
            ele.quotaPercentage = ele.quotaPercentDisplay * 0.01
        }
        );

        if (this.platformType == '0') {
            this.layoutService.show();
            this.service.putVolumeTypeList(this.platformId,this.volumeTypeList)
                .then(() => {
                    this.service.putStorage(this.platformId, this.creStep4Model)
                })
                .then(() => {
                    this.layoutService.hide();
                    this.router.navigate(["pf-mng2/cl-mng/cre-step5", { type: this.platformType }]);
                })
                .catch(
                error => {
                    console.error('error');
                    this.layoutService.hide();
                }
                )
        } else {
            this.layoutService.show();
            this.service.putStorage(this.platformId, this.creStep4Model)
                .then(
                res => {
                    console.log(res);
                    // if (this.platformType == '0') {
                    this.layoutService.hide();
                    this.router.navigate(["pf-mng2/cl-mng/cre-step5", { type: this.platformType }]);
                    // } else if (this.platformType == '2') {
                    //     this.router.navigate(["pf-mng2/cl-mng/cre-step6", { type: this.platformType }]);

                }).catch(
                error => {
                    console.error('error');
                    this.layoutService.hide();
                }
                )
            // this.router.navigateByUrl("pf-mng2/cl-mng/cre-step5");
        }

    }

    previous() {
        this.router.navigate(["pf-mng2/cl-mng/cre-step3", { type: this.platformType }]);
    }
    cancel() {
        this.router.navigate(["pf-mng2/cl-mng/cl-mng", { type: this.platformType }]);
    }

    outputValue(e, index) {
        this.creStep4Model[index].quota = e;
    }
}
