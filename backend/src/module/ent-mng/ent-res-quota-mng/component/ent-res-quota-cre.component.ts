import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { EntResQuotaCreService } from '../service/ent-res-quota-cre.service';

import { EntResQuota, Enterprise, Region } from '../model';

@Component({
  selector: 'fc-ent-res-quota-cre',
  templateUrl: '../template/ent-res-quota-cre.component.html',
  styleUrls: [],
  providers: []
})

export class EntResQuotaCreComponent implements OnInit {
    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";

    entResQuota: EntResQuota = new EntResQuota();
    enterprises: Array<Enterprise> = new Array<Enterprise>();
    regions: Array<Region> = new Array<Region>();

    constructor(
        private service: EntResQuotaCreService,
        private layoutService: LayoutService,
        private router: Router,
        private validationService: ValidationService
    ) {}

    ngOnInit() {
        this.layoutService.show();

        this.service.enterprises().then(
            response => {
                if (response && 100 == response.resultCode) {
                    let resultContent = response.resultContent;

                    if (!resultContent) {
                        this.showError("企业信息取得错误", "没有取得企业信息");

                        return;
                    }

                    let backend = new Array<Enterprise>();

                    for (let content of resultContent) {
                        let enterprise: Enterprise = new Enterprise();

                        enterprise.id = content.id;
                        enterprise.code = content.code;
                        enterprise.name = content.name;
                        enterprise.description = content.description;
                        enterprise.status = content.status;

                        backend.push(enterprise);
                    }

                    this.enterprises = backend;

                    this.layoutService.hide();
                } else {
                    this.showError("企业信息取得错误", "异常响应");
                }
            }
        ).catch(
            reason => this.showError("系统错误", reason.statusText)
        );

        this.service.virtualRegions().then(
            response => {
                if (response && 100 == response.resultCode) {
                    let resultContent = response.resultContent;

                    if (!resultContent) {
                        this.showError("区域信息取得错误", "没有取得区域信息");

                        return;
                    }

                    let backend = new Array<Region>();

                    for (let content of resultContent) {
                        let region: Region = new Region();

                        region.id = content.id;
                        region.code = content.code;
                        region.name = content.name;
                        region.platformId = content.platformId;

                        backend.push(region);
                    }

                    this.regions = backend;

                    this.layoutService.hide();
                } else {
                    this.showError("区域信息取得错误", "异常响应");
                }
            }
        ).catch(
            reason => this.showError("系统错误", reason.statusText)
        );
    }

    // 显示错误信息
    showError(title: string, msg: string) {
        this.layoutService.hide();

        this.title = title;
        this.msg = msg;

        this.notice.open();
    }

    // 取消
    cancel() {
        this.router.navigateByUrl("ent-mng/ent-res-quota-mng/ent-res-quota-mng");
    }

    // 创建企业资源配额
    next() {
        if (!this.validate()) {
            return;
        }

        this.confirm.open("创建企业资源配额", "确认创建企业资源配额？");
    }

    // 画面输入值校验
    validate() {
        let msg: Array<String> = new Array<String>();

        // 企业必须选择
        if (this.validationService.isBlank(this.entResQuota.enterpriseId)) {
            msg.push("企业必须选择");
        }

        // 区域必须选择
        if (this.validationService.isBlank(this.entResQuota.regionId)) {
            msg.push("区域必须选择");
        }

        if (msg.length > 0) {
            this.notice.open("系统提示", msg.join("<br />"));

            return false;
        }

        return true;
    }

    // 创建企业资源配额
    cof() {
        this.service.postEntResQuota(this.entResQuota).then(
            response => {
                if (response && 100 == response.resultCode) {
                    this.router.navigateByUrl("ent-mng/ent-res-quota-mng/ent-res-quota-mng");
                } else {
                    this.showError("创建企业资源配额", "创建企业资源配额失败");
                }
            }
        ).catch(
            reason => this.showError("系统错误", reason.statusText)
        );
    }
}
