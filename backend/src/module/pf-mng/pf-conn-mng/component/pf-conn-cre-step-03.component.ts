import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnMngService, PfConnCreStep03Service, StateService } from '../service';
import { Zone } from '../model';

@Component({
    selector: 'pf-conn-cre-step-03',
    templateUrl: '../template/pf-conn-cre-step-03.component.html',
    styleUrls: [],
    providers: []
})

export class PfConnCreStep03Component implements OnInit {
    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    // 确认/通知Box的标题
    title: String = "";
    // 确认/通知Box的内容
    msg: String = "";

    zones: Array<Zone> = new Array<Zone>();

    constructor(
        private service: PfConnCreStep03Service,
        private pfConnMngService: PfConnMngService,
        private layoutService: LayoutService,
        private router: Router,
        private stateService: StateService
    ) {}

    ngOnInit() {
        this.layoutService.show();

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
                    this.showError("系统错误", "取得可用区资源错误");
                }

                this.layoutService.hide();
            }
        ).catch(
            reason => {
                this.showError("系统错误", reason.statusText);
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
        this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-02", { skipLocationChange: true });
    }

    // 更新可用区资源配置信息，迁移至存储资源配置画面
    next() {
        let platFormId: String = this.stateService.getPlatformId();

        this.service.putZoneQuota(platFormId, this.zones).then(
            response => {
                if (response && 100 == response.resultCode) {
                    this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-04", { skipLocationChange: true });
                } else {
                    this.showError("系统错误", "更新可用区资源配置信息错误");
                }
            }
        ).catch(
            reason => {
                this.showError("系统错误", reason.statusText);
            }
        );
    }
}
