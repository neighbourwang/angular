import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent,dictPipe,ConfirmComponent,PaginationComponent,SystemDictionaryService} from "../../../architecture";

// import { PhysicalListService } from "../service/physical-list.service";

// import { PhysicalListModel } from "../model/physicalList.model";
// import { PhysicalModel } from "../model/physical.model";
// import { PmQuery } from "../model/pmQuery.model";
// import { Pool } from "../model/pool.model";



@Component({
    selector: "mianAccount-list",
    templateUrl: "../template/ali-cloud-mainAccount-list.html",
    styleUrls: [],
    providers: []
})
export class AliCloudMianAccountList implements OnInit {
    constructor(
        private activeRoute: ActivatedRoute,
        private route: Router,
        //private service: PhysicalListService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private dictPipe : dictPipe
    ) {
    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;


    ngOnInit() {



    }


    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("PHYSICAL_MNG.ERROR");
    }
}
