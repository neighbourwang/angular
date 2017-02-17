import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

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
        private validationService: ValidationService
    ) {
    }

    ngOnInit() {
        
    }

    gotoStoreDetail() {
        this.router.navigate([`mtc-center/capacity-mng/store-detail`]);
    }
    BacktoCapacityMng(){
        this.router.navigate([`mtc-center/capacity-mng/capacity-mng`]);
    }
}