import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnMngService, PfConnCreStep05Service, StateService } from '../service';
import { Flavor } from '../model';

@Component({
    selector: 'pf-conn-cre-step-05',
    templateUrl: '../template/pf-conn-cre-step-05.component.html',
    styleUrls: [],
    providers: []
})

export class PfConnCreStep05Component implements OnInit {
    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    // 确认/通知Box的标题
    title: String = "";
    // 确认/通知Box的内容
    msg: String = "";

    flavors: Array<Flavor> = new Array<Flavor>();

    constructor(
        private service: PfConnCreStep05Service,
        private pfConnMngService: PfConnMngService,
        private layoutService: LayoutService,
        private router: Router,
        private stateService: StateService
    ) {}

    ngOnInit() {
        this.layoutService.show();

        let platFormId: String = this.stateService.getPlatformId();

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

                this.layoutService.hide();
            }
        ).catch(
            reason => {
                this.showError("COMMON.SYSTEM_ERROR", reason.statusText);
            }
        );
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
        this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-04", { skipLocationChange: true });
    }

    // 更新云主机类型配置信息，迁移至总述画面
    next() {
        let platFormId: String = this.stateService.getPlatformId();

        this.service.putFlavorQuota(platFormId, this.flavors).then(
            response => {
                if (response && 100 == response.resultCode) {
                    this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-06", { skipLocationChange: true });
                } else {
                    this.showError("COMMON.SYSTEM_ERROR", "PF_MNG.UPDATE_CLOUD_HOST_INFO_FAILURE");
                }
            }
        ).catch(
            reason => {
                this.showError("COMMON.SYSTEM_ERROR", reason.statusText);
            }
        );
    }
}
