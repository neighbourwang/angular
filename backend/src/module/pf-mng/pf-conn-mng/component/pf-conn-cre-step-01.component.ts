import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, SystemDictionaryService, SystemDictionary, ValidationService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnMngService, PfConnCreStep01Service, StateService } from '../service';

import { Platform } from '../model';

@Component({
    selector: 'pf-conn-cre-step-01',
    templateUrl: '../template/pf-conn-cre-step-01.component.html',
    styleUrls: [],
    providers: []
})

export class PfConnCreStep01Component implements OnInit {
    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    // 确认/通知Box的标题
    title: String = "";
    // 确认/通知Box的内容
    msg: String = "";

    vmPlatforms: Array<SystemDictionary> = new Array<SystemDictionary>();

    platform = new Platform();

    constructor(
        private service: PfConnCreStep01Service,
        private pfConnMngService: PfConnMngService,
        private layoutService: LayoutService,
        private router: Router,
        private stateService: StateService,
        private sysDicService: SystemDictionaryService,
        private validationService: ValidationService
    ) {}

    ngOnInit() {
        let contains = this.stateService.contains();

        if (contains) {
            this.layoutService.show();

            let platformId = this.stateService.getPlatformId();

            this.pfConnMngService.getPlatform(platformId).then(
                response => {
                    let content = response.resultContent;

                    this.platform.name = content["name"];
                    this.platform.platformType = content["platformType"];
                    this.platform.uri = content["uri"];
                    this.platform.userName = content["userName"];
                    this.platform.passwd = content["passwd"];
                    this.platform.version = content["version"];
                    this.platform.description = content["description"];
                    this.platform.status = content["status"];

                    this.layoutService.hide();
                }
            ).catch(
                reason => {
                    this.showError("系统错误", reason.statusText)
                }
            );
        }

        this.sysDicService.sysDicOF(this, this.sysDicCallback, "PLATFORM", "TYPE");
    }

    // 类型数据取得
    sysDicCallback(sf: boolean, systemDictionarys: Array<SystemDictionary>) {
        if (sf) {
            this.vmPlatforms = systemDictionarys;
        }
    }

    // 显示错误信息
    showError(title: string, msg: string) {
        this.layoutService.hide();
        this.title = title;
        this.msg = msg;

        this.notice.open();
    }

    // 取消按钮事件处理
    cancel() {
        this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng", { skipLocationChange: true });
    }

    // 上一步按钮事件处理
    previous() {
        this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-mng", { skipLocationChange: true });
    }

    // 下一步按钮事件处理
    next() {
        if (!this.validate()) {
            return;
        }

        this.confirm.open("系统提示", "创建平台？");
    }

    // 画面输入值校验
    validate() {
        let msg: Array<String> = new Array<String>();

        // 平台名称必须输入
        if (this.validationService.isBlank(this.platform.name)) {
             msg.push("平台名称必须输入");
        }

        // 平台名称必须输入
        if (this.validationService.isBlank(this.platform.platformType)) {
            msg.push("类型必须输入");
        }

        if (msg.length > 0) {
            this.notice.open("系统提示", msg.join("<br />"));

            return false;
        }

        return true;
    }

    // 平台创建
    cof() {
        this.service.postPlatform(this.platform).then(
            response => {
                if (response && 100 == response.resultCode) {
                    this.stateService.setPlatformId(response.resultContent.platformId);
                    this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-02", { skipLocationChange: true });
                } else {
                    this.showError("系统错误", "平台创建错误");
                }
            }
        ).catch(
            reason => {
                this.showError("系统错误", reason.statusText)
            }
        );
    }

    ccf() { }
}
