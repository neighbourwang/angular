/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

import { StorageModel } from '../model/cre-step4.model';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { StorageListService } from '../service/cl-mng-cre-step-4.service';

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
        private service: StorageListService,
        private layoutService: LayoutService
    ) { }

    @ViewChild('notice')
    notice:NoticeComponent

    creStep4Model: Array<StorageModel> = new Array<StorageModel>();

    platformType: string;
    ngOnInit() {
        //获取平台类型
        this.route.params.forEach((params: Params) => {
            this.platformType = params['type'];
            console.log(this.platformType);
        })

        let platFormId: String = this.idService.getPlatformId();
        this.layoutService.show();
        this.service.getStorage(platFormId).then(
            res => {
                this.creStep4Model = res.resultContent;
                this.creStep4Model.forEach(ele => {
                    ele.valid=true;
                    ele.quota =
                        ele.quota ? ele.quota : 0;
                    ele.quotaPercentDisplay = ele.quota * 100;
                })
                //Openstack类型同步volumeType信息
                if (this.platformType == '0') {
                    this.service.getvolumeType(platFormId).then(
                        res => {
                            console.log(res);
                        }
                    ).catch(err => {
                        console.error(err);
                    });
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
    }
    keepSame(item) {
        // if (this.platformType == '2') {
             let sum:number=0;
            for (let storage of this.creStep4Model) {
                if (storage.id == item.id) {
                    // storage.displayName = item.displayName;
                    // storage.description = item.description;
                    storage.replica = item.replica;
                    sum+=storage.quotaPercentDisplay;
                    // item.valid=sum>100?false:true;
                }
            }
            item.valid=
                sum>100?false:true;
            console.log(sum);
        // }
    }
    next() {
        let valid:boolean=true;
        this.creStep4Model.forEach(ele => {
            if(ele.valid==false){
               return valid=false;
            }
            ele.quotaPercentage = ele.quotaPercentDisplay / 100
        })
        console.log(valid);
        if(!valid){
            this.notice.open('操作错误','存储区配额设置错误，同一存储区配额总额设置超额')
            return;
        }
        let platFormId: String = this.idService.getPlatformId();
        this.creStep4Model.forEach(ele => {
            ele.quotaPercentage = ele.quotaPercentDisplay * 0.01
        }
        );
        this.layoutService.show();
        this.service.putStorage(platFormId, this.creStep4Model).then(
            res => {
                console.log(res);
                // if (this.platformType == '0') {
                this.layoutService.hide();
                this.router.navigate(["pf-mng2/cl-mng/cre-step5", { type: this.platformType }]);
                // } else if (this.platformType == '2') {
                //     this.router.navigate(["pf-mng2/cl-mng/cre-step6", { type: this.platformType }]);
                // }

            }
        ).catch(
            error => {
                console.error('error');
                this.layoutService.hide();
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
