import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, SystemDictionaryService, SystemDictionary, PaginationComponent, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { PfConnMngService, StateService } from '../service';
import { PfConnMngPlatform } from '../model';

@Component({
    selector: 'fc-pf-conn-mng',
    templateUrl: '../template/pf-conn-mng.component.html',
    styleUrls: [],
    providers: []
})

export class PfConnMngComponent implements OnInit {
    @ViewChild('pagination')
    pagination: PaginationComponent;

    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('deleteConfirm')
    deleteCfm: ConfirmComponent;

    @ViewChild('activeConfirm')
    activeCfm: ConfirmComponent;

    @ViewChild('disableConfirm')
    disableCfm: ConfirmComponent;

    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";

    // 选择全部平台标识
    isSelectedAll: boolean = false;
    platforms: Array<PfConnMngPlatform> = new Array<PfConnMngPlatform>();

    // 平台数据总页数
    tp: number = 0;
    // 每页显示的数据条数
    pp: number = 10;

    constructor(
        private service: PfConnMngService,
        private sysDicService: SystemDictionaryService,
        private layoutService: LayoutService,
        private router: Router,
        private stateService: StateService
    ) {
        stateService.clear();
    }

    ngOnInit() {
        this.backend(1, this.pp);
    }

    backend(page: number, size: number) {
        this.layoutService.show();

        this.tp = 0;

        this.service.getPlatforms(page, size).then(
            response => {
                if (response && 100 == response.resultCode) {
                    let resultContent = response.resultContent;

                    if (!resultContent) {
                        this.showError("COMMON.GETTING_DATA_FAILED", "ENT_MNG.NO_PLATFORM_DATA");

                        return;
                    }

                    let backend = new Array<PfConnMngPlatform>();

                    for (let content of resultContent) {
                        let platform = new PfConnMngPlatform();

                        platform.id = content.id;
                        platform.name = content.name;
                        platform.platformType = content.platformType;
                        platform.platformTypeName = content.platformTypeName;
                        platform.uri = content.uri;
                        platform.userName = content.userName;
                        platform.passwd = content.passwd;
                        platform.description = content.description;
                        platform.version = content.version;
                        platform.status = content.status;

                        backend.push(platform);
                    }

                    let pageInfo = response.pageInfo;

                    this.tp = pageInfo.totalPage;

                    this.platforms = backend;

                    this.sysDicService.sysDicOF(this, this.sysDicCallback, "GLOBAL", "STATUS");
                } else {
                    this.showError("COMMON.GETTING_DATA_FAILED", "ENT_MNG.ABNORMAL_RESPONSE");

                    return;
                }
            }
        ).catch(
            reason => this.showError("COMMON.GETTING_DATA_FAILED", reason.statusText)
        );
    }

    // 设置状态文字
    sysDicCallback(sf: boolean, systemDictionarys: Array<SystemDictionary>) {
        if (sf) {
            this.platforms.forEach(
                item => {
                    let systemDictionary: Array<SystemDictionary> = systemDictionarys.filter(
                        sysDic => { return sysDic.value == item.status.toString() }
                    );

                    if (systemDictionary.length > 0) {
                        item.statusText = systemDictionary[0].displayValue;
                    }
                }
            );
        }

      this.layoutService.hide();
    }

    // 显示错误信息
    showError(title: string, msg: string) {
        this.layoutService.hide();

        this.title = title;
        this.msg = msg;

        this.notice.open();
    }

    /*
      创建平台按钮事件处理
      创建平台 - 填写基本信息页面迁移
    */
    creation() {
        this.router.navigateByUrl("pf-mng/pf-conn-mng/pf-conn-cre-step-01", {skipLocationChange: true});
    }

    // 删除特定平台
    deletePlatform() {
        let selectedPlatform = this.selectedPlatform();

        if (selectedPlatform.length != 1) {
            this.notice.open("COMMON.OPERATION_ERROR", "PF_MNG.CHOOSE_ONE_PF");

            return;
        }

        this.deleteCfm.open("ENT_MNG.CONFIRM_DELETE", "PF_MNG.CONFIRM_DELETE_YOUR_PF^^^" + selectedPlatform[0].name );
    }

    deleteCof() {
        let selectedPlatform = this.selectedPlatform();

        this.service.deletePlatform(selectedPlatform[0].id).then(
            response => {
                if (response && 100 == response.resultCode) {
                    this.notice.open("ENT_MNG.CONFIRM_DELETE", "PHY_MNG_POOL.DELETE_SUCCESS");

                    this.backend(1, this.pp);

                    this.pagination.render(1);
                } else {
                    this.notice.open("ENT_MNG.CONFIRM_DELETE", "PF_MNG.DELETE_FAILURE");
                }
            }
        ).catch(
            reason => this.showError("COMMON.SYSTEM_ERROR", reason.statusText)
            );
    }

    // 启用特定平台
    activePlatform() {
        let selectedPlatform = this.selectedPlatform();

        if (selectedPlatform.length > 1) {
            this.notice.open("COMMON.OPERATION_ERROR", "PF_MNG.CHOOSE_ONE_PF");

            return;
        }

        if (selectedPlatform[0].status == 1) {
            this.notice.open("COMMON.OPERATION_ERROR", "不能启用处于'启用'状态的平台。");

            return;
        }

        this.activeCfm.open("COMMON.ENABLE", "PF_MNG.CONFIRM_ENABLE_VALUE_PF" + selectedPlatform[0].name);
    }
    
    activeCof() {
        let selectedPlatform = this.selectedPlatform();

        this.service.activePlatform(selectedPlatform[0].id).then(
            response => {
                if (response && 100 == response.resultCode) {
                    this.notice.open("COMMON.ENABLE", "PF_MNG.ENABLE_PF_SUCCESS");

                    this.backend(1, this.pp);

                    this.pagination.render(1);
                } else {
                    this.notice.open("COMMON.ENABLE", "PF_MNG.ENABLE_PF_FAILURE");
                }
            }
        ).catch(
            reason => this.showError("COMMON.SYSTEM_ERROR", reason.statusText)
            );
    }

    // 禁用特定平台
    disablePlatform() {
        /*let selectedPlatform = this.selectedPlatform();

        if (selectedPlatform.length > 1) {
            this.notice.open("操作错误", "请选择单一平台");

            return;
        }

        this.deleteCfm.open("禁用", "您选择禁用'" + selectedPlatform[0].name + "'平台，请确认；如果确认禁用，所有企业将不能申请此平台的资源。");*/
        alert("Unimplement");
    }

    disableCof() {
        let selectedPlatform = this.selectedPlatform();

        this.service.deletePlatform(selectedPlatform[0].id).then(
            response => {
                if (response && 100 == response.resultCode) {
                    this.notice.open("COMMON.DISABLE", "PHY_MNG_POOL.DISABLE_SUCCESS");

                    this.backend(1, this.pp);

                    this.pagination.render(1);
                } else {
                    this.notice.open("COMMON.DISABLE", "PF_MNG.DISABLE_FAILURE");
                }
            }
        ).catch(
            reason => this.showError("COMMON.SYSTEM_ERROR", reason.statusText)
            );
    }

    /*
      选择全部平台checkbox事件处理
      全选/全选取消切换
    */
    switchSelectAll() {
        this.isSelectedAll = !this.isSelectedAll;

        this.switchSelect(this.isSelectedAll);
    }

    /*
      选择平台checkbox事件处理
      选择/选择取消切换
    */
    switchSelectIndividual(idx: number) {
        let isAllSelected: boolean = this.isAllSelected();

        if (isAllSelected) {
            this.isSelectedAll = isAllSelected;

            this.switchSelect(isAllSelected);
        } else {
            this.isSelectedAll = false;
        }
    }

    // 全部平台选择/选择取消切换
    private switchSelect(selected: boolean) {
        this.platforms.forEach(item => item.isSelected = selected);
    }
    
    // 全部Checkbox处于选择状态判断
    private isAllSelected() {
        let isAllSelected: boolean = true;

        this.platforms.forEach(
            item => {
                if (!item.isSelected) {
                    isAllSelected = false;
                }
            });

        return isAllSelected;
    }

    // 取得选择的平台
    private selectedPlatform(): Array<PfConnMngPlatform> {
        let platform: Array<PfConnMngPlatform> = new Array<PfConnMngPlatform>();

        this.platforms.forEach(
            item => {
                if (item.isSelected) {
                    platform.push(item);
                }
            });

        return platform;
    }

    // 分页检索
    paging(page) {
        this.backend(page, 10);
    }

    nof() {}

    ccf() {}
}