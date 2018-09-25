/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

import { ZoneListModel } from '../model/cre-step3.model';




import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { ZoneListService } from '../service/cl-mng-cre-step-3.service';

import { ClMngIdService } from '../service/cl-mng-id.service';

@Component({
    selector: 'cl-mng-cre-step-3',
    templateUrl: '../template/cl-mng-cre-step-03.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep3Component implements OnInit {

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
                this.creStep3Model.forEach(ele => {
                    ele.displayNameValid = true;
                    ele.exceedPercentageValid = true;
                    ele.quotaPercentDisplayValid = true;
                    ele.quotaPercentage =
                        ele.quotaPercentage ? ele.quotaPercentage : 0;
                    ele.quotaPercentDisplay = ele.quotaPercentage * 100;
                });
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
    displayNameVa(item) {
        item.displayNameValid =
            item.displayName ? true : false;
    }
    exceedPercentageVa(item) {
        if (item.exceedPercentage && item.exceedPercentage >= 0) {
            item.exceedPercentageValid = true;
        } else {
            item.exceedPercentageValid = false;
        }
    }
    quotaPercentDisplayVa(item) {
        if (item.quotaPercentDisplay && item.quotaPercentDisplay >= 0 && item.quotaPercentDisplay <= 100) {
            item.quotaPercentDisplayValid = true;
        } else {
            item.quotaPercentDisplayValid = false;
        }
    }

    next() {

        let platFormId: string = this.idService.getPlatformId();

        // this.router.navigateByUrl("pf-mng2/cl-mng/cre-step4");
        for (let zone of this.creStep3Model) {
            this.displayNameVa(zone);
            if (!zone.displayNameValid) {
                return
            }
            this.exceedPercentageVa(zone);
            if (!zone.exceedPercentageValid) {
                return
            }
            this.quotaPercentDisplayVa(zone);
            if (!zone.quotaPercentDisplayValid) {
                return
            }
            zone.quotaPercentage = 0;
            zone.quotaPercentage = zone.quotaPercentDisplay * 0.01
        }
        // this.creStep3Model.forEach(ele => {

        // }
        // );
        console.log(this.creStep3Model);
        //等待接口
        this.layoutService.show();
        this.service.putZone(platFormId, this.creStep3Model).then(
            res => {
                console.log(res);
                this.layoutService.hide();
                this.router.navigate(["pf-mng2/cl-mng/cre-step4", { type: this.platformType }]);
            }
        ).catch(
            error => {
                this.layoutService.hide();
                console.error('error');
            }
            )
    }

    previous() {
        this.router.navigate(["pf-mng2/cl-mng/cre-step2", { type: this.platformType }]);
    }
    cancel() {
        this.router.navigate(["pf-mng2/cl-mng/cl-mng", { type: this.platformType }]);
    }

    outputValue(event, index) {
        this.creStep3Model[index].usageQuota = event;
    }
}
