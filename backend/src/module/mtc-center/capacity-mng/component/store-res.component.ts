﻿import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

import { PlatformModel} from '../model/platform.model';
import { StorageModel} from '../model/storage.model';
//service
import { StoreResService } from "../service/store-res.service";


@Component({
    selector: "store-res",
    templateUrl: "../template/store-res.html",
    styleUrls: [],
    providers: []
})
export class StoreResComponent implements OnInit {
    constructor(
        private service: StoreResService,
        private router: Router,
        private layoutService: LayoutService,
        private activatedRouter: ActivatedRoute,
        private validationService: ValidationService
    ) {
    }

    @ViewChild("notice")
    notice: NoticeComponent;

    noticeTitle = "";
    noticeMsg = "";
    PlatformId: string;

    selectedPf: PlatformModel = new PlatformModel();
    storageList: Array<StorageModel>;
    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["pfName"] != null) {
                this.selectedPf.name = params["pfName"];                              
            }
            if (params["pfType"] != null) {
                this.selectedPf.platformType = params["pfType"];              
            }
            if (params["pfUri"] != null) {
                this.selectedPf.uri = params["pfUri"];               
            }
            if (params["pfId"] != null) {
                this.PlatformId= params["pfId"];               
            }
        });
        this.getStorageList();
    }

    getStorageList() {
        this.layoutService.show();
        this.service.getStorageList(this.PlatformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.storageList = response["resultContent"];
                   
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    gotoStoreDetail(selectedStorage:StorageModel) {
        this.router.navigate([
            `mtc-center/capacity-mng/store-detail`,
            {
                "storage_Id":selectedStorage.storageId
            }
        ]);
    }

    BacktoCapacityMng(){
        this.router.navigate([`mtc-center/capacity-mng/capacity-mng`]);
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