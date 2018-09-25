import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

import { ZoneListModel } from '../model/cre-step3.model';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { ZoneListService } from '../service/cl-mng-cre-step-3.service';

import { ClMngIdService } from '../service/cl-mng-id.service';

@Component({
    templateUrl: '../template/desk-cloud-cre-step3.component.html',
    styleUrls: [
    ],
    providers: []
})

export class DeskCloudCreStep3Component implements OnInit {

    creStep3Model: Array<ZoneListModel> = new Array<ZoneListModel>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ZoneListService,
        private layoutService: LayoutService,
        private idService: ClMngIdService
    ) { }

    platformType: string;
    ngOnInit() {
        //获取平台类型
        this.route.params.forEach((params: Params) => {
            this.platformType = params['type'];
            console.log(this.platformType);
        })

        let platFormId: string = this.idService.getPlatformId();
        this.layoutService.show();
        this.service.getZone(platFormId).then(
            res => {
                console.log(res);
                this.creStep3Model = res.resultContent;
                this.layoutService.hide();
            }
        ).catch(
            error => {
                console.error('error');
                this.layoutService.hide();
            }
            )
    }
    //验证Valid   
    next() {
        let platFormId: string = this.idService.getPlatformId();
        // for (let zone of this.creStep3Model) {
        //     this.displayNameVa(zone);
        //     if (!zone.displayNameValid) {
        //         return
        //     }                      
        // }       
        console.log(this.creStep3Model);
        //等待接口
        this.layoutService.show();
        this.service.putZone(platFormId, this.creStep3Model).then(
            res => {
                console.log(res);
                this.layoutService.hide();
                this.router.navigate(["pf-mng2/cl-mng/desk-cloud-cre-step4", { type: this.platformType }]);
            }
        ).catch(
            error => {
                this.layoutService.hide();
                console.error('error');
            }
            )
    }

    previous() {
        this.router.navigate(["pf-mng2/cl-mng/desk-cloud-cre-step2", { type: this.platformType }]);
    }
    cancel() {
        this.router.navigate(["pf-mng2/cl-mng/cl-mng", { type: this.platformType }]);
    }

    outputValue(event, index) {
        this.creStep3Model[index].usageQuota = event;
    }
}
