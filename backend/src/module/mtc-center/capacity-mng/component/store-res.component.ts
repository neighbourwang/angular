import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

import { PlatformModel} from '../model/platform.model';
import { StorageModel} from '../model/storage.model';
//service
import { StoreResService } from "../service/store-res.service";
import { CapacityMngService } from "../service/capacity-mng.service";


@Component({
    selector: "store-res",
    templateUrl: "../template/store-res.html",
    styleUrls: [],
    providers: []
})
export class StoreResComponent implements OnInit {
    constructor(
        private service: StoreResService,
        private serviceParam:CapacityMngService,
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
        this.selectedPf = this.serviceParam.selectedPlatform;   
        this.getStorageList();
        console.log("status", this.service.statusDic);
    }

    getStorageList() {
        this.layoutService.show();
        this.service.getStorageList(this.selectedPf.id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.storageList = response["resultContent"];
                    console.log("存储列表",this.storageList);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
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
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

     showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }
}