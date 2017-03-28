import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

import {EntModel, DeptModel} from"../model/ent.model";
import {PlfModel,RegionModel,ZoneModel} from"../model/plf.model";
import {Hyper} from "../model/hyper.model";
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

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild('exportAllData')
    exportAllData: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    

    defaultEnt:EntModel = new EntModel();
    selectedEnt: EntModel = this.defaultEnt;
    defaultDept: DeptModel = new DeptModel();
    selectedDept: DeptModel = this.defaultDept;

    defaultPlf: PlfModel = new PlfModel();
    selectedPlf: PlfModel = this.defaultPlf;
    defaultRegion: RegionModel = new RegionModel();
    selectedRegion: RegionModel = this.defaultRegion;
    defaultZone: ZoneModel = new ZoneModel();
    selectedZone: ZoneModel = this.defaultZone;

    entList: Array<EntModel>;
    plfList: Array<PlfModel>;
    hyperList: Array<Hyper>;

    ngOnInit() {
        this.getEntList();
        this.getPlfList();
        this.getHyperList();
    }

    getEntList() {
        this.layoutService.show();
        this.service.getEntList()  
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.entList = response["resultContent"];
                   
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getPlfList() {
        this.layoutService.show();
        this.service.getPlfList()  
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.plfList = response["resultContent"];
                   
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }
    getHyperList() {
        this.layoutService.show();
        this.service.getHyperList()  //post 待完善
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.hyperList = response["resultContent"].computers;
                   
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }
    
    exportAll() {
        this.exportAllData.open("导出所有数据");
    }
    gotoAssignDetail(HyperId:string) {
        this.router.navigate([`mtc-center/assign-mng/assign-detail`,
            {
                "wm_Id":HyperId
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