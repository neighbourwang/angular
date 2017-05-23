import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

import { StoreInfoModel} from '../model/store-info.model';
//service
import { StoreDetailService } from "../service/store-detail.service";


@Component({
    selector: "store-detail",
    templateUrl: "../template/store-detail.html",
    styleUrls: [],
    providers: []
})
export class StoreDetailComponent implements OnInit {
    constructor(
        private service: StoreDetailService,
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
    StorageId: string;

    storeInfo: StoreInfoModel=new StoreInfoModel();
    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["storage_Id"] != null) {
                this.StorageId = params["storage_Id"];

            }
        });
        this.getStoreInfoList();
    }

    
    getStoreInfoList() {
        this.layoutService.show();
        this.service.getStoreInfoList(this.StorageId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.storeInfo = response["resultContent"];
                   
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }



    BacktoStoreRes(){
        this.router.navigate([`mtc-center/capacity-mng/store-res`]);
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