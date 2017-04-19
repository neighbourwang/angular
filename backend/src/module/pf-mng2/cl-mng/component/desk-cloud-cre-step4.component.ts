import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';
//model
import { StorageModel } from '../model/cre-step4.model';
import { VolumeTypeModel } from '../model/volumeType.model';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { StorageListService } from '../service/cl-mng-cre-step-4.service';

import { ClMngIdService } from '../service/cl-mng-id.service';

import { ClMngListService } from '../service/cl-mgn-list.service';

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
        private layoutService: LayoutService,
        private operationService:ClMngListService
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
    next() {
        console.log(this.volumeTypeList);
        let platFormId: String = this.idService.getPlatformId();

        this.layoutService.show();
        this.service.putStorage(this.platformId, this.creStep4Model)
            .then(
            res => {
                console.log(res);
                this.layoutService.hide();
                this.activePlatform();             
            }).catch(
            error => {
                console.error('error');
                this.layoutService.hide();
            }
            )
    }
    // PF_MNG2.ENABLE_PLATFORM
    private activePlatform() {
        let id: String = this.idService.getPlatformId();
        this.layoutService.show();
        this.operationService.activePlatform(id).then(
            res => {
                this.layoutService.hide();
                this.router.navigateByUrl('pf-mng2/cl-mng/cl-mng');
            }
        ).catch(
            err => {
                this.layoutService.hide();
                console.error('err');
            }
            )
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
