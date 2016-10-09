import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnMngService, PfConnCreStep04Service, StateService } from '../service';
import { Storage } from '../model';

@Component({
    selector: 'pf-conn-cre-step-04',
    templateUrl: '../template/pf-conn-cre-step-04.component.html',
    styleUrls: [],
    providers: []
})

export class PfConnCreStep04Component implements OnInit {
    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    // 确认/通知Box的标题
    title: String = "";
    // 确认/通知Box的内容
    msg: String = "";

    storages: Array<Storage> = new Array<Storage>();

    constructor(
        private service: PfConnCreStep04Service,
        private pfConnMngService: PfConnMngService,
        private layoutService: LayoutService,
        private router: Router,
        private stateService: StateService
  ) {}

    ngOnInit() {
        this.layoutService.show();

        let platFormId: String = this.stateService.getPlatformId();

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
                    this.showError("系统错误", "取得存储资源配置信息错误");
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
        this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-03", { skipLocationChange: true });
    }

    // 更新存储资源配置信息，迁移至云主机类型配置画面
    next() {
        let platFormId: String = this.stateService.getPlatformId();

        this.service.putStorageQuota(platFormId, this.storages).then(
            response => {
                if (response && 100 == response.resultCode) {
                    this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-05", { skipLocationChange: true });
                } else {
                    this.showError("系统错误", "更新存储资源配置信息错误");
                }
            }
        ).catch(
            reason => {
                this.showError("系统错误", reason.statusText);
            }
        );
    }
}
