import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, Params, ActivatedRoute } from '@angular/router';

import { ClMngIdService } from '../service/cl-mng-id.service';

import { ClMngCreStep2Service } from '../service/cl-mng-cre-step-2.service';

import { CreStep2Model } from '../model/cre-step2.model';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

@Component({
    templateUrl: '../template/desk-cloud-cre-step2.component.html',
    styleUrls: [
    ],
    providers: []
})

export class DeskCloudCreStep2Component implements OnInit {

    constructor(
        private router: ActivatedRoute,
        private route: Router,
        private idService: ClMngIdService,
        private service: ClMngCreStep2Service,
        private layoutService: LayoutService
    ) { }

    creStep2Model: CreStep2Model = new CreStep2Model('PF_MNG2.SYNC_ZONE', 0);

    platformType: string;
    ngOnInit() {
        let platFormId: string = this.idService.getPlatformId();
        //控制下一步disabled
        this.creStep2Model.isNext = false;
        this.creStep2Model.isBack = false;
        console.log('init');
        //获取平台类型
        this.router.params.forEach((params: Params) => {
            this.platformType = params['type'];
            console.log(this.platformType);
        })        
        this.service.zones(platFormId).then(
            res => {
                console.log('zone', res);
                this.creStep2Model.zones = 'ok';
                this.creStep2Model.zonesStatus = true;
                this.creStep2Model.message = 'PF_MNG2.SYNC_ZONE_COMP_SYNC_STORAGE';
                this.creStep2Model.percentage = 33.33;
                this.storages();
            }
        ).catch(
            error => {
                this.creStep2Model.zones = 'fail';
                this.creStep2Model.message = 'PF_MNG2.SYNC_ZONE_FAILED';
                this.creStep2Model.isBack = true;
            }           
            )        
    }
    private storages() {
        let platFormId: string = this.idService.getPlatformId();
        this.service.storages(platFormId).then(
            res => {
                console.log('storage', res);
                this.creStep2Model.storages = 'ok';
                this.creStep2Model.storagesStatus = true;
                this.creStep2Model.message = 'PF_MNG2.SYNC_STORAGE_COMP_SYNC_SPEC';
                this.creStep2Model.percentage = 66.66;
                this.hosts();                
            }
        ).catch(
            error => {
                this.creStep2Model.storages = 'fail';
                this.creStep2Model.message = 'PF_MNG2.SYNC_STORAGE_FAILED';
                this.creStep2Model.isBack = true;
            }
            )
    }  
    private hosts() {
        let platFormId: string = this.idService.getPlatformId();

        this.service.hosts(platFormId).then(
            res => {
                // console.log(res);
                this.creStep2Model.hosts = 'ok';
                this.creStep2Model.hostsStatus = true;
                this.creStep2Model.message = 'PF_MNG.SYNC_COMPLETE';
                this.creStep2Model.percentage = 100;
                this.creStep2Model.isNext = true;
                this.creStep2Model.isBack = true;                
            }
        ).catch(
            error => {
                this.creStep2Model.hosts = 'fail';
                this.creStep2Model.message = 'PF_MNG2.SYNC_HOST_FAILED';
                this.creStep2Model.isBack = true;
            }
            )
    }
    next() {
        this.route.navigate(["pf-mng2/cl-mng/desk-cloud-cre-step2", { type: this.platformType }]);
    }
    cancel() {
        this.route.navigateByUrl("pf-mng2/cl-mng/cl-mng");
    }
}
