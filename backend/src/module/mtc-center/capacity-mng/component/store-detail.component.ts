import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

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
        private validationService: ValidationService
    ) {
    }

    ngOnInit() {
        
    }

    BacktoStoreRes(){
        this.router.navigate([`mtc-center/capacity-mng/store-res`]);
    }
}