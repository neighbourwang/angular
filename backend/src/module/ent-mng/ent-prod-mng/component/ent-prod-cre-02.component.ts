import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { EntProdCreService } from '../service/ent-prod-cre.service';

import { EntProdMngServiceDetail, Flavor, Enterprise, Region, Directory } from '../model';

@Component({
    selector: 'ent-prod-cre-02',
    templateUrl: '../template/ent-prod-cre-02.component.html',
    styleUrls: ['../style/product.css'],
    providers: []
})

export class EntProdCre02Component implements OnInit {
    @ViewChild('notice')
    private noticeDialog: NoticeComponent;

    modalTitle: string = '';
    modalMessage: string = '';

	constructor(
        private entProdCreService: EntProdCreService,
        private layoutService: LayoutService,
        private serviceDetail: EntProdMngServiceDetail,
		private router: Router
    ) { }

    ngOnInit() {
        this.getFlavors(this.serviceDetail.platformId);
    }

    cancel() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-mng");
    }

	next(){
      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-03");
	}

    prev(){
      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-01");
    }
    
    getFlavors(platformId: String) {
    	this.layoutService.show();
  
        this.entProdCreService.getFlavors(platformId).then(ret => {
            if (!ret) {
                this.showNotice('COMMON.GETTING_DATA_FAILED', 'ENT_MNG.GET_AVAILABLE_ZONE_DATA_FAILURE');
            } else {
                if (ret && ret.resultContent) {
                    let flavors: Array <Flavor> = new Array<Flavor>();

                    let idx = 0;

                    for (let content of ret.resultContent) {
                            let flavor: Flavor = new Flavor();

                            flavor.idx = idx++;
                            flavor.direct = 1;

                            flavor.uuid = content.uuid;
                            flavor.displayName = content.displayName;
                            flavor.description = content.description;
                            flavor.diskSize = content.diskSize;

                            flavors.push(flavor);
                    }

                    this.serviceDetail.flavors = flavors;
                }
            }

            this.layoutService.hide();
        }).catch(error => {
            this.showNotice('COMMON.GETTING_DATA_FAILED', 'ENT_MNG.GET_AVAILABLE_ZONE_DATA_FAILURE');
            this.layoutService.hide();
        });
    }

    // 取得可用区
    flavors(direct: number) {
        let flavor: Array<Flavor> = new Array<Flavor>();

        for (let item of this.serviceDetail.flavors) {
            if (item.direct == direct) {
                flavor.push(item);
            }
        }

        return flavor;
    }

    // 所有可用区选择
    selectAvailableFlavor(idx) {
        this.serviceDetail.flavors[idx].isSelected = !this.serviceDetail.flavors[idx].isSelected;
    }

    // 已选择的可用区选择
    selectSelectedFlavor(idx) {
        this.serviceDetail.flavors[idx].isSelected = !this.serviceDetail.flavors[idx].isSelected;
    }

    // 加入
    addFlavor() {
        for (let flavor of this.serviceDetail.flavors) {
            if (flavor.isSelected && flavor.direct == 1) {
                flavor.isSelected = false;
                flavor.direct = 2;
            }
        }
    }

    // 移除
    removeFlavor() {
        for (let flavor of this.serviceDetail.flavors) {
            if (flavor.isSelected && flavor.direct == 2) {
                flavor.isSelected = false;
                flavor.direct = 1;
            }
        }
    }

    // 显示错误信息
    showNotice(title: string, msg: string) {
        this.modalTitle = title;
        this.modalMessage = msg;

        this.noticeDialog.open();
    }
}