﻿import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

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

    noticeTitle = "";
    noticeMsg = "";

    page = 1;
    size = 10;
    pfList: Array<PlatformModel>;

    ngOnInit() {
        this.getPlatformList();
    }

    getPlatformList() {
        this.layoutService.show();
        this.service.getPlatformList(this.page, this.size)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.pfList = response["resultContent"];
                   
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    selectPlatform(pf: PlatformModel) {
        this.pfList.forEach((pf) => {
            pf.selected = false;
        });
        pf.selected = true;
    }

    gotoComputeRes() {
        this.router.navigate([`mtc-center/capacity-mng/compute-res`]);
    }

    gotoStoreRes() {
        const selectedPf = this.pfList.find((pf) => { return pf.selected });
        if (!selectedPf) {
            this.showAlert("请选择云平台");
            return;
        }
        this.router.navigate([
            `mtc-center/capacity-mng/store-res`,
            {
                "pfName": selectedPf.name,
                "pfType": selectedPf.platformType,
                "pfUri":selectedPf.uri
            }
        ]);   
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