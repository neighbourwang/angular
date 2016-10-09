import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PaginationComponent, NoticeComponent, ConfirmComponent } from '../../../../architecture';

import { EntResQuotaMngService } from '../service/ent-res-quota-mng.service';

import { EntResQuotaMng } from '../model';

@Component({
    selector: 'fc-ent-res-quota-mng',
    templateUrl: '../template/ent-res-quota-mng.component.html',
    styleUrls: [],
    providers: []
})

export class EntResQuotaMngComponent implements OnInit {
    @ViewChild('pagination')
    pagination: PaginationComponent;

    @ViewChild('notice')
    notice: NoticeComponent;

    @ViewChild('confirm')
    confirm: ConfirmComponent;

    // 确认Box/通知Box的标题
    title: String = "";
    // 确认Box/通知Box的内容
    msg: String = "";

    // 选择全部企业资源配额标识
    isSelectedAll: boolean = false;
    entResQuotas: Array<EntResQuotaMng> = new Array<EntResQuotaMng>();

    // 平台数据总页数
    tp: number = 0;
    // 每页显示的数据条数
    pp: number = 10;

    constructor(
        private service: EntResQuotaMngService,
        private layoutService: LayoutService,
        private router: Router
    ) {}

    ngOnInit() {
        this.backend(1, this.pp);
    }

    // 显示错误信息
    showError(title: string, msg: string) {
        this.layoutService.hide();
        this.title = title;
        this.msg = msg;

        this.notice.open();
    }

    // 创建资源配额页面迁移
    creation() {
        this.router.navigateByUrl("ent-mng/ent-res-quota-mng/ent-res-quota-cre", { skipLocationChange: true });
    }

    backend(page: number, size: number) {
        this.layoutService.show();

        this.tp = 0;

        this.service.getEntResQuota(page, this.pp).then(
            response => {
                let resultCode = response.resultCode;

                if (response && 100 == response.resultCode) {
                    let resultContent = response.resultContent;

                    if (!resultContent) {
                        this.showError("数据取得错误", "没有取得平台数据");

                        return;
                    }

                    let backend = new Array<EntResQuotaMng>();

                    for (let content of resultContent) {
                        let entResQuotaMng: EntResQuotaMng = new EntResQuotaMng();

                        entResQuotaMng.id = content.id;
                        entResQuotaMng.platformId = content.platformId;
                        entResQuotaMng.enterpriseId = content.enterpriseId;
                        entResQuotaMng.enterpriseName = content.enterpriseName;
                        entResQuotaMng.regionId = content.regionId;
                        entResQuotaMng.regionName = content.regionName;
                        entResQuotaMng.vmQuota = content.vmQuota;
                        entResQuotaMng.storageQuota = content.storageQuota;
                        entResQuotaMng.networkQuota = content.networkQuota;

                        backend.push(entResQuotaMng);
                    }

                    let pageInfo = response.pageInfo;

                    this.tp = pageInfo.totalPage;

                    this.entResQuotas = backend;

                    this.layoutService.hide();
                } else {
                    this.showError("数据取得错误", "异常响应");
                }
              }
        ).catch(
            reason => this.showError("数据取得错误", reason.statusText)
        );
    }

    /*
      选择全部企业资源配额checkbox事件处理
      全选/全选取消切换
    */
    switchSelectAll() {
        this.isSelectedAll = !this.isSelectedAll;

        this.switchSelect(this.isSelectedAll);
    }

    /*
      选择企业资源配额checkbox事件处理
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

    // 全部企业资源配额选择/选择取消切换
    private switchSelect(selected: boolean) {
        this.entResQuotas.forEach(item => item.isSelected = selected);
    }

    // 全部Checkbox处于选择状态判断
    private isAllSelected() {
        let isAllSelected: boolean = true;

        this.entResQuotas.forEach(
            item => {
                if (!item.isSelected) {
                    isAllSelected = false;
                }
            });

        return isAllSelected;
    }

    // 分页检索
    paging(page) {
        this.backend(page, 10);
    }

    nof() {
        ("nof");
    }

    cof() {
        alert("cof");
    }

    ccf() {
        alert("ccf");
    }
}
