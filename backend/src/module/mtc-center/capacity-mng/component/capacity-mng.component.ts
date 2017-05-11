import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PaginationComponent,PopupComponent } from "../../../../architecture";

import {PlatformModel} from "../model/platform.model";

//service
import { CapacityMngService } from "../service/capacity-mng.service";


@Component({
    selector: "capacity-mng",
    templateUrl: "../template/capacity-mng.html",
    styleUrls: [],
    providers: []
})
export class CapacityMngComponent implements OnInit {
    constructor(
        private service: CapacityMngService,
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("pager")
    pager: PaginationComponent;

    noticeTitle = "";
    noticeMsg = "";

    page = 1;
    size = 10;
    totalPage = 1;
    pfList: Array<PlatformModel>;


    ngOnInit() {
        this.getPlatformList();
    }

    getPlatformList(pageIndex?) {
        this.layoutService.show();
        this.page= pageIndex || this.page;
        this.service.getPlatformList(this.page, this.size)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.pfList = response["resultContent"];
                    this.totalPage = response.pageInfo.totalPage;
                    console.log("平台列表", this.pfList);
                    
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getReport() {
        //this.layoutService.show();
        this.service.getReport();
            //.then(
            //response => {
            //    this.layoutService.hide();
            ////    if (response && "100" == response["resultCode"]) {
            ////        console.log("get report success!");
                   
            ////    } else {
            ////        this.showAlert("COMMON.OPERATION_ERROR");
            ////    }
            //}
            //)
            //.catch((e) => this.onRejected(e));
    }

    selectPlatform(pf: PlatformModel) {
        this.pfList.forEach((pf) => {
            pf.selected = false;
        });
        pf.selected = true;
    }

    gotoComputeRes() {
        const selectedPf = this.pfList.find((pf) => { return pf.selected });
        if (!selectedPf) {
            this.showAlert("请选择云平台");
            return;
        }
        this.service.selectedPlatform = selectedPf;
        this.service.selectedPage = this.page;
        this.router.navigate([ `mtc-center/capacity-mng/compute-res`]);
    }

    gotoStoreRes() {
        const selectedPf = this.pfList.find((pf) => { return pf.selected });
        if (!selectedPf) {
            this.showAlert("CAPACITY_MNG.PLEASE_CHOOSE_CLOUD_PLATFORM");
            return;
        }
        this.service.selectedPlatform = selectedPf;
        this.router.navigate([`mtc-center/capacity-mng/store-res`]);   
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
    }

     showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "NET_MNG_VM_IP_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }
}