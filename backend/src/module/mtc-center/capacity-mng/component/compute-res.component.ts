import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";
import { chartColors } from "../model/color.mock";
import { PlatformModel} from '../model/platform.model';
import {ComputeResModel, Region, ZoneInfo } from '../model/compute-res.model';
import {ZoneModel, Percent, DoughnutChart} from '../model/zone.model';
import {HostModel} from'../model/host.model';
//service
import { ComputeResService } from "../service/compute-res.service";
import { CapacityMngService } from "../service/capacity-mng.service";


@Component({
    selector: "compute-res",
    templateUrl: "../template/compute-res.html",
    styleUrls: [],
    providers: []
})
export class ComputeResComponent implements OnInit {
    constructor(
        private service: ComputeResService,
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
    hostList: Array<HostModel>;
    regionList: Array<Region>;
    selectedRegion: Region = new Region();
    zones: Array<ZoneInfo>; //region对应的zones
    zoneResInfo: ZoneModel = new ZoneModel(); //可用区资源信息ZoneModel
    zoneId: string;//选中的可用区id

    resAllocationInfo: Percent = new Percent();
    resActualInfo: Percent = new Percent();
    resUsedInfo: Percent = new Percent();

    cpuAllocation: DoughnutChart = new DoughnutChart();
    memAllocation: DoughnutChart = new DoughnutChart();
    cpuActual: DoughnutChart = new DoughnutChart();
    memActual: DoughnutChart = new DoughnutChart();
    cpuUsed: DoughnutChart = new DoughnutChart();
    memUsed: DoughnutChart = new DoughnutChart();
    color: Object = new Object();

    ngOnInit() {
        this.selectedPf = this.serviceParam.selectedPlatform;
        //this.color = chartColors;
        this.getComputeRes();
        
    }

    //获取Region
    getComputeRes() {
        this.layoutService.show();
        this.service.getComputeRes(this.selectedPf.id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.regionList = response["resultContent"].regions;
                    this.getZoneList(this.regionList[0].regionId);
                    
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    //获取region对应的zones
    getZoneList(region_Id: string) {
        this.selectedRegion = this.regionList.find((p) => { return p.regionId == region_Id });
        this.zones = this.selectedRegion.zones;
        this.getZoneId(this.zones[0].zoneId);
    }

    getZoneId(zone_Id: string) {
        this.zoneId = zone_Id;
        this.getZoneResInfo();
        this.getHostList();
    }
    //获取可用区资源信息和图标数据
    getZoneResInfo() {
        this.layoutService.show();
        this.service.getZoneResInfo(this.zoneId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.zoneResInfo = response["resultContent"];
                    this.resAllocationInfo = response["resultContent"].resourceAllocation;
                    this.resActualInfo = response["resultContent"].resourceActual;
                    this.resUsedInfo = response["resultContent"].resourceUsed;
                    
                    //数据处理
                    this.getGraphData(this.cpuAllocation, this.resAllocationInfo.cpu, this.resAllocationInfo.cpuTotal);
                    this.getGraphData(this.memAllocation, this.resAllocationInfo.memory, this.resAllocationInfo.memoryTotal);
                    this.getGraphData(this.cpuActual, this.resActualInfo.cpu, this.resActualInfo.cpuTotal);
                    this.getGraphData(this.memActual, this.resActualInfo.memory, this.resActualInfo.memoryTotal);
                    this.getGraphData(this.cpuUsed, this.resUsedInfo.cpu, this.resUsedInfo.cpuTotal);
                    this.getGraphData(this.memUsed, this.resUsedInfo.memory, this.resUsedInfo.memoryTotal);
                    
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    getGraphData(chart: DoughnutChart, part: number, total: number) {
        let circleNum = 0;
        let tempData = new Array<any>();
        let tempColor = new Array<any>();
        while (part > total) {
           
            tempData.push({ data: [100] });
            tempColor.push({backgroundColor: [chartColors.circleMain]});
            part = part - total;
            circleNum++;
        }
   
        tempData.push({ data: [part, total - part] });
        tempColor.push({ backgroundColor: [chartColors.circleMain, chartColors.circleGrey] });
        circleNum++;

        chart.DataSets = tempData;
        chart.Colors = tempColor;
        chart.CircleNum = circleNum;
        chart.Options = {
            cutoutPercentage: 100-chart.CircleNum*12,
            rotation: -1.2* Math.PI,
        }
        chart.ChartType="doughnut";

    }
 
    
    //获取宿主机列表
    getHostList() {
        this.layoutService.show();
        this.service.getHostList(this.zoneId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.hostList = response["resultContent"];
                    
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
            )
            .catch((e) => this.onRejected(e));
    }

    gotoHostDtail(hostId:string) {
        this.router.navigate([`mtc-center/capacity-mng/host-detail`,
            {
                "host_Id":hostId
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