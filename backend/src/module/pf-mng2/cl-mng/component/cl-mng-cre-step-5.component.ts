/**
 * Created by junjie on 16/10/18.
 */
import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

import { CreStep5Model } from '../model/cre-step5.model';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { ClMngCreStep5Service } from '../service/cl-mng-cre-step-5.service';

import { ClMngIdService } from '../service/cl-mng-id.service';


@Component({
    selector: 'cl-mng-cre-step-5',
    templateUrl: '../template/cl-mng-cre-step-05.component.html',
    styleUrls: [
    ],
    providers: []
})

export class ClMngCreStep5Component implements OnInit {


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: ClMngCreStep5Service,
        private idService: ClMngIdService,
        private layoutService: LayoutService
    ) { }

    creStep5Model: Array<CreStep5Model> = new Array<CreStep5Model>();

    platformType: string;
    ngOnInit() {
        //获取平台类型
        this.route.params.forEach((params: Params) => {
            this.platformType = params['type'];
            console.log(this.platformType);
        })

        let platFormId: string = this.idService.getPlatformId();
        // platFormId = "4f565fe7-09fc-4b8b-8227-a0b5b8b1eb6c";
        if (this.platformType != '2') {
            this.layoutService.show();
            this.service.getFlavors(platFormId).then(
                res => {
                    // console.log(res);
                    this.creStep5Model = res.resultContent;
                    this.layoutService.hide();
                }
            ).catch(
                error => {
                    console.error('error');
                    this.layoutService.hide();
                }
                )
        }else{
            this.layoutService.show()
            window.setTimeout(()=>{
                this.layoutService.hide();
            },1000)
        }
    }

    next() {
        if (this.platformType != '2') {
            let platFormId: string = this.idService.getPlatformId();
            this.service.putFlavors(platFormId, this.creStep5Model).then(
                res => {
                    // console.log(res);
                    this.layoutService.hide();
                    this.router.navigate(["pf-mng2/cl-mng/cre-step6", { type: this.platformType }]);
                }
            ).catch(
                error => {
                    this.layoutService.hide();
                    console.error('error');
                }
                )
        } else {
                    this.router.navigate(["pf-mng2/cl-mng/cre-step6", { type: this.platformType }]);
        }
    }

    previous() {
        this.router.navigate(["pf-mng2/cl-mng/cre-step4", { type: this.platformType }]);
    }
    cancel() {
        this.router.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }
}
