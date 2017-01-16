import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, ValidationService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { EntProdCreService } from '../service/ent-prod-cre.service';

import { EntProdMngServiceDetail, Enterprise, Region, Directory } from '../model';

@Component({
    selector: 'ent-prod-cre-01',
    templateUrl: '../template/ent-prod-cre-01.component.html',
    styleUrls: [],
    providers: []
})

export class EntProdCre01Component implements OnInit{	
    @ViewChild('notice')
    private noticeDialog: NoticeComponent;

    datas: EntProdMngServiceDetail[];
    enterprises : Enterprise[];
    regions: Region[] = [];
    serviceItems : Directory[];

    modalTitle: string = '';
    modalMessage: string = '';

	constructor(
	    private entProdCreService: EntProdCreService,
        private serviceDetail: EntProdMngServiceDetail,
        private layoutService: LayoutService,
        private router: Router,
        private validationService: ValidationService
    ) { }

    ngOnInit(){      
        this.layoutService.show();

        this.getEnterprises();

        this.getRegions();

        if (!this.validationService.isBlank(this.serviceDetail.regionId)) {
            this.getDirectories();
        }
        
        this.layoutService.hide();
    }

    cancel() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-mng");
    }

    next() {
        if (!this.validate()) {
            return;
        }

      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-02");
	}

    // 画面输入值校验
    validate() {
        let msg: Array<String> = new Array<String>();

        // 产品名称必须输入
        if (this.validationService.isBlank(this.serviceDetail.entProdName)) {
            msg.push("ENT_MNG.INPUT_PRODUCT_NAME");
        }

        // 企业必须选择
        if (this.validationService.isBlank(this.serviceDetail.enterpriseId)) {
            msg.push("ENT_MNG.CHOOSE_ENTERPRISE");
        }

        // 区域必须选择
        if (this.validationService.isBlank(this.serviceDetail.regionId)) {
            msg.push("ENT_MNG.CHOOSE_ZONE");
        }

        // 服务目录必须选择
        if (this.validationService.isBlank(this.serviceDetail.serviceId)) {
            msg.push("ENT_MNG.CHOOSE_SERVICE_DIR");
        }

        if (msg.length > 0) {
            this.noticeDialog.open("COMMON.SYSTEM_PROMPT", msg.join("<br />"));

            return false;
        }

        return true;
    }

    // 企业
    getEnterprises(){
		this.layoutService.show();
  
    	this.entProdCreService.getEnterprises().then(ret => {
            if (!ret) {
                this.showNotice('COMMON.GETTING_DATA_FAILED', 'ENT_MNG.GET_ENTERPRISE_DATA_FAILURE');
            } else {
                if (ret && ret.resultContent) {
                  this.enterprises = ret.resultContent;
                }
            }
            this.layoutService.hide();
        }).catch(error => {
            this.showNotice('COMMON.GETTING_DATA_FAILED', 'ENT_MNG.GET_ENTERPRISE_DATA_FAILURE');
            this.layoutService.hide();
        });
    }

    // 区域
    getRegions() {
    	this.layoutService.show();
  
    	this.entProdCreService.getRegions().then(ret => {
            if (!ret) {
                this.showNotice('COMMON.GETTING_DATA_FAILED', 'ENT_MNG.GET_ZONE_DATA_FAILURE');
            } else {
                if (ret && ret.resultContent) {
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
                }
            }

            this.layoutService.hide();
        }).catch(error => {
            this.showNotice('COMMON.GETTING_DATA_FAILED', 'ENT_MNG.GET_ZONE_DATA_FAILURE');
            this.layoutService.hide();
        });
    }

    // 区域切换
    regionChange(idx) {
        this.serviceDetail.regionId = this.regions[idx].id;
        this.serviceDetail.platformId = this.regions[idx].platformId;

        this.getDirectories();
    }

    // 服务目录
    getDirectories() {
    	this.layoutService.show();

        this.entProdCreService.getDirectories(this.serviceDetail.regionId).then(ret => {
            if (!ret) {
                this.showNotice('COMMON.GETTING_DATA_FAILED', 'ENT_MNG.GET_SERVER_DIR_FAILURE');
            } else {
                if (ret && ret.resultContent) {
                  this.serviceItems = ret.resultContent;
                }
            }

            this.layoutService.hide();
        }).catch(error => {
            this.showNotice('COMMON.GETTING_DATA_FAILED', 'ENT_MNG.GET_SERVER_DIR_FAILURE');
            this.layoutService.hide();
        });
    }

    // 显示错误信息
    showNotice(title: string, msg: string) {
        this.modalTitle = title;
        this.modalMessage = msg;

        this.noticeDialog.open();
    }
}