import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnCreStep02Service, StateService } from '../service';

import { ResSync } from '../model';

@Component({
    selector: 'pf-conn-cre-step-02',
    templateUrl: '../template/pf-conn-cre-step-02.component.html',
    styleUrls: [],
    providers: []
})

export class PfConnCreStep02Component implements OnInit {
    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    // 确认/通知Box的标题
    title: String = "";
    // 确认/通知Box的内容
    msg: String = "";

    resSync: ResSync = new ResSync("资源信息取得中....", 0);

    constructor(
        private service: PfConnCreStep02Service,
        private layoutService: LayoutService,
        private router: Router,
        private stateService: StateService
    ) {}

    ngOnInit() {
        this.layoutService.show();

        let platFormId: String = this.stateService.getPlatformId();

        this.service.resSyncCount(platFormId).then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    let resultContent = response["resultContent"];

                    this.resSync.zonesCount = resultContent["zonesCount"];
                    this.resSync.storagesCount = resultContent["storagesCount"];
                    this.resSync.flavorsCount = resultContent["flavorsCount"];
                    this.resSync.regionsCount = resultContent["regionsCount"];
                    this.resSync.imagesCount = resultContent["imagesCount"];

                    this.layoutService.hide();

                    this.resSync.syncRes = "正在同步可用区....";

                    this.syncZones();
                } else {
                    this.showError("系统错误", "同步资源数据取得错误");
                }
            }
        ).catch(reason => {
            this.showError("系统错误", reason.statusText);
        });
    }

    // 可用区同步
    private syncZones() {
        let platFormId: String = this.stateService.getPlatformId();

        this.service.syncZones(platFormId).then(
            response => {
            if (response && 100 == response["resultCode"]) {
                let resultContent = response["resultContent"];

                let syncStatus: boolean = resultContent["success"];
                let syncCount: number = resultContent["count"];

                if (syncStatus) {
                    this.resSync.synchronizedZones = true;
                }

                this.resSync.synchronized(syncCount, "正在同步存储....");

                this.syncStorages();
            } else {
                this.showError("系统错误", "可用区同步错误");
            }
            }).catch(reason => {
                this.showError("系统错误", reason.statusText);
            });
    }

    // 存储同步
    private syncStorages() {
        let platFormId: String = this.stateService.getPlatformId();

        this.service.syncStorages(platFormId).then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    let resultContent = response["resultContent"];

                    let syncStatus: boolean = resultContent["success"];
                    let syncCount: number = resultContent["count"];

                    if (syncStatus) {
                        this.resSync.synchronizedStorages = true;
                    }

                    this.resSync.synchronized(syncCount, "正在同步云主机类型....");

                    this.syncFlavors();
                } else {
                    this.showError("系统错误", "存储同步错误");
                }
            }).catch(reason => {
                this.showError("系统错误", reason.statusText);
            });
    }

    // 云主机类型同步
    private syncFlavors() {
        let platFormId: String = this.stateService.getPlatformId();

        this.service.syncFlavors(platFormId).then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    let resultContent = response["resultContent"];

                    let syncStatus: boolean = resultContent["success"];
                    let syncCount: number = resultContent["count"];

                    if (syncStatus) {
                        this.resSync.synchronizedFlavors = true;
                    }

                    this.resSync.synchronized(syncCount, "正在同步可用域....");

                    this.syncRegions();
                } else {
                    this.showError("系统错误", "云主机类型同步错误");
                }
            }).catch(reason => {
                this.showError("系统错误", reason.statusText);
            });
    }

    // 可用域同步
    private syncRegions() {
        let platFormId: String = this.stateService.getPlatformId();

        this.service.syncRegions(platFormId).then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    let resultContent = response["resultContent"];

                    let syncStatus: boolean = resultContent["success"];
                    let syncCount: number = resultContent["count"];

                    if (syncStatus) {
                        this.resSync.synchronizedRegions = true;
                    }

                    this.resSync.synchronized(syncCount, "正在同步镜像....");

                    this.syncImages();
                } else {
                    this.showError("系统错误", "可用域同步错误");
                }
            }).catch(reason => {
                this.showError("系统错误", reason.statusText);
            });
    }

    // 镜像同步
    private syncImages() {
        let platFormId: String = this.stateService.getPlatformId();

        this.service.syncZones(platFormId).then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    let resultContent = response["resultContent"];

                    let syncStatus: boolean = resultContent["success"];
                    let syncCount: number = resultContent["count"];

                    if (syncStatus) {
                        this.resSync.synchronizedImages = true;
                    }

                    this.resSync.synchronized(syncCount, "同步完成");
                    this.resSync.syncCompleted = true;
                } else {
                    this.showError("系统错误", "镜像同步错误");
                }
            }).catch(reason => {
                this.showError("系统错误", reason.statusText);
            });
    }

    showError(title: string, msg: string) {
        this.layoutService.hide();

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
        this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-01", { skipLocationChange: true });
    }

    // 迁移至可用区资源配置画面
    next() {
        this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-03", { skipLocationChange: true });
    }
}
