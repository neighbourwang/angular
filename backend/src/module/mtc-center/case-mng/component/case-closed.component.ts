import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent,dictPipe} from "../../../../architecture";

import { CaseClosedService} from "../service/case-closed.service";

// import { PhysicalModel,CPU,Memory,Disk } from "../model/physical.model";
// import { ServerType } from "../model/serverType.model";
// import { Brand, Model } from "../model/brand.model";
//import { IpmiInfo } from "../model/physical-ipmi.model";

@Component({
    selector: "case-closed",
    templateUrl: "../template/case-closed.html",
    styleUrls: [],
    providers: []
})
export class CaseClosedComponent implements OnInit {
    constructor(
        private activeRoute: ActivatedRoute,
        private route: Router,
        //private service: PhysicalEditService,
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

        this.noticeTitle = "PHYSICAL_MNG.NOTICE";
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