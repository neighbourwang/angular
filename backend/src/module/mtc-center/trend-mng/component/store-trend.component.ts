import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";
import { PlfModel, RegionModel, ZoneModel } from "../model/plf.model";
import {StoreQuery} from "../model/store-query.model";
import {GeneralModel, zoneDisk, DoughnutChart} from "../model/general.model";
//service
import { StoreTrendService } from "../service/store-trend.service";


@Component({
    selector: "store-trend",
    templateUrl: "../template/store-trend.html",
    styleUrls: [],
    providers: []
})
export class StoreTrendComponent implements OnInit {
    constructor(
        private service: StoreTrendService ,
        private router: Router,
        private layoutService: LayoutService,
        private validationService: ValidationService
    ) {
    }

    @ViewChild("notice")
    notice: NoticeComponent;

    noticeTitle = "";
    noticeMsg = "";

    isSelected=false;
    queryOpt: StoreQuery = new StoreQuery();
    //平台联动列表
    defaultPlf: PlfModel = new PlfModel();
    selectedPlf: PlfModel = this.defaultPlf;
    defaultRegion: RegionModel = new RegionModel();
    selectedRegion: RegionModel = this.defaultRegion;
    defaultZone: ZoneModel = new ZoneModel();
    selectedZone: ZoneModel = this.defaultZone;

    plfList: Array<PlfModel>;
    general: GeneralModel=new GeneralModel();
    zoneDiskList: Array<zoneDisk>;
    diskCircle: DoughnutChart = new DoughnutChart();

    ngOnInit() {
        this.defaultPlf.platformId = 'all';
        this.defaultRegion.regionId = 'all';
        this.defaultZone.zoneId = 'all';
        this.reset();
        this.getPlfList();
    }

    //获取平台联动列表
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


    getQuery() {
        this.queryOpt.platformId = this.selectedPlf.platformId;
        this.queryOpt.regionId = this.selectedRegion.regionId;
        if (this.selectedZone == this.defaultZone) {
            if (this.isSelected == false) {
                this.queryOpt.zoneId = 'all';
            }
            else {
                this.queryOpt.zoneId = 'each';
            }
        } else {
            this.queryOpt.zoneId = this.selectedZone.zoneId;
        }
    }

    confirm() {
        this.getGeneral();
    }
    reset() {
        this.selectedPlf=this.defaultPlf;
        this.selectedRegion=this.defaultRegion;
        this.selectedZone = this.defaultZone;
        this.queryOpt.diskStatus = '1';
        this.queryOpt.diskSize = '1';
        this.queryOpt.period = '1';
    }

    getGeneral() {
        this.layoutService.show();
        this.service.getGeneral(this.queryOpt)
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.general = response["resultContent"];
                    this.zoneDiskList = response["resultContent"].zones;
                    this.getGraphData(this.diskCircle, this.general);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getGraphData(chart:DoughnutChart,source:GeneralModel) {
        chart.DataSets = [{ data: [source.s0_50GB, source.s50_150GB,source.s150_200GB]}];
        chart.Colors = [{ backgroundColor: ["#2bd2c8","#05ab83","#c9cacc"] }];
        chart.ChartType = "doughnut";
        chart.Options = {
            cutoutPercentage: 70,
            rotation: -1.2* Math.PI,
        }
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