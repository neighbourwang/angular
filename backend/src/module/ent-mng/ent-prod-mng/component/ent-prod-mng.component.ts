import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, PaginationComponent, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { EntProdMngService } from '../service/ent-prod-mng.service';
import { EntProdCreService } from '../service/ent-prod-cre.service';

import { EntProdMngServiceDetail, EntProdMngTemplate, Enterprise, Region } from '../model';

@Component({
    selector: 'ent-prod-mng',
    templateUrl: '../template/ent-prod-mng.component.html',
    styleUrls: [],
    providers: []
})

export class EntProdMngComponent implements OnInit{
    @ViewChild('pager')
    private pager: PaginationComponent;

    @ViewChild('confirm')
    private confirmDialog: ConfirmComponent;

    @ViewChild('notice')
    private noticeDialog: NoticeComponent;

	datas: EntProdMngTemplate[];

    modalTitle: string = '';
    modalMessage: string = '';

    enterprises: Enterprise[];
    regions: Region[] = [];

    // 企业ID
    enterpriseId: String;
    // 区域ID
    regionId: String;

    tp: number;

	constructor(
        private entProdMngService: EntProdMngService,
        private entProdCreService: EntProdCreService,
        private layoutService: LayoutService,
        private router: Router,
        private serviceDetail: EntProdMngServiceDetail
    ) {}

  
    ngOnInit() {
        this.serviceDetail.clear();

        this.entProdCreService.getEnterprises().then(
            ret => {
                if (ret && 100 == ret.resultCode) {
                    this.enterprises = ret.resultContent;
                } else {
                    this.showNotice('COMMON.GETTING_DATA_FAILED', 'ENT_MNG.GET_ENTERPRISE_DATA_FAILURE');
                }
            }
        ).catch(
            reason => this.showNotice("COMMON.SYSTEM_ERROR", reason.statusText)
        );
        this.entProdCreService.getRegions().then(
            ret => {
                if (ret && 100 == ret.resultCode) {
                    let idx = 0;
                    for (let content of ret.resultContent) {
                        let region: Region = new Region();

                        region.idx = idx;
                        idx++;

                        region.id = content.id;
                        region.name = content.name;
                        region.platformId = content.platformId;
                        region.desc = content.desc;

                        this.regions.push(region);
                    }
                } else {
                    this.showNotice('COMMON.GETTING_DATA_FAILED', 'ENT_MNG.GET_ZONE_DATA_FAILURE');
                }
            }
        ).catch(
            reason => this.showNotice("COMMON.SYSTEM_ERROR", reason.statusText)
        );

        this.getEntProds(1);
	}

    // 迁移到创建产品画面
    creation() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-01");
    }

    // 切换企业
    changeEnt(ent) {
        this.enterpriseId = ent;

        this.getEntProds(1);

        this.pager.render(1);
    }

    // 切换区域
    changeRegion(region) {
        this.regionId = region;

        this.getEntProds(1);

        this.pager.render(1);
    }

    // 更改产品状态
    changeStatus(status) {
        this.entProdMngService.changeStatus(status, this.datas).then(
            response => {
                if(response && 100 == response.resultCode) {
                    this.getEntProds(1);

                    this.pager.render(1);
                }
            }
        ).catch(
            reason => this.showNotice("COMMON.SYSTEM_ERROR", reason.statusText)
        );
    }

    // 取得全部产品信息
    getEntProds(page: number) {
        this.layoutService.show();

        this.entProdMngService.getEntProds(this.enterpriseId, this.regionId, page, 10).then(ret => {
            if (!ret) {
                this.showNotice('COMMON.GETTING_DATA_FAILED', 'ENT_MNG.GET_PRODUCT_DATA_FAILURE');
            } else {
                if (ret && ret.resultContent) {
                    this.datas = ret.resultContent;

                    let pageInfo = ret.pageInfo;

                    this.tp = pageInfo.totalPage;
                }
            }

            this.layoutService.hide();
        })
        .catch(error => {
            this.showNotice('COMMON.GETTING_DATA_FAILED', 'ENT_MNG.GET_PRODUCT_DATA_FAILURE');
            this.layoutService.hide();
        });
    }

    // 显示错误信息
    showNotice(title: string, msg: string) {
    	this.modalTitle = title;
        this.modalMessage = msg;

    	this.noticeDialog.open();
    }

    // 分页检索
    paging(page) {
        this.getEntProds(page);
    }
}