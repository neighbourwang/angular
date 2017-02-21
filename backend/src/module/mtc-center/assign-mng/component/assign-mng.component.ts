import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

//service
import { AssignMngService } from "../service/assign-mng.service";


@Component({
    selector: "assign-mng",
    templateUrl: "../template/assign-mng.html",
    styleUrls: ["../style/assign-mng.less"],
    providers: []
})
export class AssignMngComponent implements OnInit {
    constructor(
        private service: AssignMngService,
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    @ViewChild('exportAllData')
    exportAllData: PopupComponent;

    ngOnInit() {
        
    }

    exportAll() {
        this.exportAllData.open("导出所有数据");
    }
    gotoAssignMng() {
        this.router.navigate([`mtc-center/assign-mng/assign-detail`]);
    }

   
}