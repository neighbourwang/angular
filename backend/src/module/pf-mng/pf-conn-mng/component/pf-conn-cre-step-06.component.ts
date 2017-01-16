import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnMngService, PfConnCreStep06Service, StateService } from '../service';
import { Zone, Storage, Flavor } from '../model';

@Component({
    selector: 'pf-conn-cre-step-06',
    templateUrl: '../template/pf-conn-cre-step-06.component.html',
    styleUrls: [],
    providers: []
})

export class PfConnCreStep06Component implements OnInit {
    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    // 确认/通知Box的标题
    title: String = "";
    // 确认/通知Box的内容
    msg: String = "";

    expandZone: boolean = true;
    expandStorage: boolean = true;
    expandFlavor: boolean = true;

    zones: Array<Zone> = new Array<Zone>();
    storages: Array<Storage> = new Array<Storage>();
    flavors: Array<Flavor> = new Array<Flavor>();

    constructor(
        private pfConnMngService: PfConnMngService,
        private layoutService: LayoutService,
        private router: Router,
        private stateService: StateService
    ) {}

    ngOnInit() {
        let platFormId: String = this.stateService.getPlatformId();

        this.pfConnMngService.zoneQuota(platFormId).then(
            response => {
                if (response && 100 == response.resultCode) {
                    let resultContent = response.resultContent;

                    for (let content of resultContent) {
                        let zone = new Zone();

                        zone.uuid = content.uuid;
                        zone.id = content.id;
                        zone.code = content.code;
                        zone.name = content.name;
                        zone.displayName = content.displayName;
                        zone.hostNum = content.hostNum;
                        zone.vcpunum = content.vcpunum;
                        zone.memSize = content.memSize;
                        zone.vmQuota = content.vmQuota;
                        zone.description = content.description;

                        this.zones.push(zone);
                    }
                } else {
                    this.showError("COMMON.SYSTEM_ERROR", "PF_MNG.GET_AVAILABLE_ZONE_RESOURCE_FAILURE");
                }
            }
        ).catch(
            reason => {
                this.showError("COMMON.SYSTEM_ERROR", reason.statusText);
            }
        );

        this.pfConnMngService.storageQuota(platFormId).then(
            response => {
                if (response && 100 == response.resultCode) {
                    let resultContent = response.resultContent;

                    for (let content of resultContent) {

                        let storage = new Storage();

                        storage.uuid = content.uuid;
                        storage.id = content.id;
                        storage.code = content.code;
                        storage.name = content.name;
                        storage.displayName = content.displayName;
                        storage.quota = content.quota;
                        storage.maximum = content.maximum;
                        storage.description = content.description;

                        this.storages.push(storage);
                    }
                } else {
                    this.showError("COMMON.SYSTEM_ERROR", "PF_MNG.GET_STORAGE_RESOURCE_FAILURE");
                }
            }
        ).catch(
            reason => {
                this.showError("COMMON.SYSTEM_ERROR", reason.statusText);
            }
        );

        this.pfConnMngService.flavorQuota(platFormId).then(
            response => {
                if (response && 100 == response.resultCode) {
                    let resultContent = response.resultContent;

                    for (let content of resultContent) {
                        let flavor = new Flavor();

                        flavor.uuid = content.uuid;
                        flavor.id = content.id;
                        flavor.name = content.name;
                        flavor.displayName = content.displayName;
                        flavor.vcpu = content.vcpu;
                        flavor.memSize = content.memSize;
                        flavor.diskSize = content.diskSize;
                        flavor.publicFlag = content.publicFlag;
                        flavor.publicFlagText = content.publicFlag ? "COMMON.YES" : "COMMON.NO";
                        flavor.description = content.description;

                        this.flavors.push(flavor);
                    }
                } else {
                    this.showError("COMMON.SYSTEM_ERROR", "PF_MNG.GET_CLOUD_HOST_INFO_FAILURE");
                }
            }
        ).catch(
            reason => {
                this.showError("COMMON.SYSTEM_ERROR", reason.statusText);
            }
        );
    }

    // 可用区收起/展开切换
    switchExpandZone() {
        this.expandZone = !this.expandZone;
    }

    // 存储收起/展开切换
    switchExpandStorage() {
        this.expandStorage = !this.expandStorage;
    }

    // 云主机类型收起/展开切换
    switchExpandFlavor() {
        this.expandFlavor = !this.expandFlavor;
    }

    // 显示错误信息
    showError(title: string, msg: string) {
        this.layoutService.show();

        this.title = title;
        this.msg = msg;

        this.notice.open();
    }

    // 取消
    cancel() {
        this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng", { skipLocationChange: true });
    }

    // 返回上一步
    previous() {
        this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-05", { skipLocationChange: true });
    }

    // 启用平台
    next() {
        this.confirm.open("COMMON.ENABLE", "PF_MNG.CONFIRM_ENABLE_THE_PF");
    }

    // 启用平台
    cof() {
        let promise = this.pfConnMngService.activePlatform(this.stateService.getPlatformId());

        promise.then(
            response => {
                if (response && 100 == response.resultCode) {
                    this.notice.open("COMMON.ENABLE", "PF_MNG.ENABLE_PF_SUCCESS");

                    this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng", { skipLocationChange: true });
                } else {
                    this.showError("COMMON.SYSTEM_ERROR", "PF_MNG.ENABLE_PF_FAILURE");
                }
            }
        ).catch(
            reason => this.showError("COMMON.SYSTEM_ERROR", reason.statusText)
        );
    }
}
