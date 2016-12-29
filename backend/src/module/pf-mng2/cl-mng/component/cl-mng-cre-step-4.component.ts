/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

import { CreStep4Model } from '../model/cre-step4.model';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { ClMngCreStep4Service } from '../service/cl-mng-cre-step-4.service';

import { ClMngIdService } from '../service/cl-mng-id.service';




@Component({
    selector: 'cl-mng-cre-step-4',
    templateUrl: '../template/cl-mng-cre-step-04.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep4Component implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private idService: ClMngIdService,
        private service: ClMngCreStep4Service
    ) { }

    creStep4Model: Array<CreStep4Model> = new Array<CreStep4Model>();

    platformType: string;
    ngOnInit() {
        //获取平台类型
        this.route.params.forEach((params: Params) => {
            this.platformType = params['type'];
            console.log(this.platformType);
        })

        let platFormId: String = this.idService.getPlatformId();

        this.service.getStorage(platFormId).then(
            res => {
                this.creStep4Model = res.resultContent;
                this.creStep4Model.forEach(ele => {
                    if (ele.quotaPercentage) {
                        ele.quotaPercentDisplay = ele.quotaPercentage * 100;
                    }
                })
                this.service.getvolumeType(platFormId).then(
                    res=>{
                        console.log(res);
                    }
                ).catch(err=>{
                    console.error(err);
                });
            }
        ).catch(
            error => {
                console.error('error');
            }
            )
    }



    next() {
        let platFormId: String = this.idService.getPlatformId();
        this.creStep4Model.forEach(ele => {
            ele.quotaPercentage = ele.quotaPercentDisplay * 0.01
        }
        );
        this.service.putStorage(platFormId, this.creStep4Model).then(
            res => {
                console.log(res);
                if (this.platformType == '0') {
                    this.router.navigate(["pf-mng2/cl-mng/cre-step5", { type: this.platformType }]);
                } else if (this.platformType == '2') {
                    this.router.navigate(["pf-mng2/cl-mng/cre-step6", { type: this.platformType }]);
                }

            }
        ).catch(
            error => {
                console.error('error');
            }
            )
        // this.router.navigateByUrl("pf-mng2/cl-mng/cre-step5");
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
