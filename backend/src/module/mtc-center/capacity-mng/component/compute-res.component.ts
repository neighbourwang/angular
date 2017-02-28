import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, NoticeComponent, ValidationService, ConfirmComponent, PopupComponent } from "../../../../architecture";

import { PlatformModel} from '../model/platform.model';
import {ComputeResModel, Region, ZoneInfo } from '../model/compute-res.model';
import {ZoneModel, ResAllocation, ResActual, ResUsed} from '../model/zone.model';
import {HostModel} from'../model/host.model';
//service
import { ComputeResService } from "../service/compute-res.service";


@Component({
    selector: "compute-res",
    templateUrl: "../template/compute-res.html",
    styleUrls: [],
    providers: []
})
export class ComputeResComponent implements OnInit {
    constructor(
        private service: ComputeResService,
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
    computeRes: ComputeResModel = new ComputeResModel();
    hostList: Array<HostModel>;
    regionList: Array<Region>;
    selectedRegion: Region = new Region();
    zones: Array<ZoneInfo>; //region对应的zones
    zoneResInfo: ZoneModel = new ZoneModel(); //可用区资源信息ZoneModel
    zoneId: string;//选中的可用区id

    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["pfName"] != null) {
                this.selectedPf.name = params["pfName"];                
                
            }
            if (params["pfType"] != null) {
                this.selectedPf.platformType = params["pfType"];
               
            }
            if (params["pfUri"] != null) {
                this.selectedPf.uri = params["pfUri"];
               
            }
            if (params["pfId"] != null) {
                this.PlatformId= params["pfId"];               
            }
        });
        this.getComputeRes();
        
    }

    //获取Region
    getComputeRes() {
        this.layoutService.show();
        this.service.getComputeRes(this.PlatformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.computeRes = response["resultContent"];
                    this.regionList = response["resultContent"].regions;
                    this.getZoneList(this.regionList[0].regionId);
                    
                } else {
                    alert("Res sync error");
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
    //获取可用区资源信息
    getZoneResInfo() {
        this.layoutService.show();
        this.service.getZoneResInfo(this.zoneId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && "100" == response["resultCode"]) {
                    this.zoneResInfo = response["resultContent"];
                    
                } else {
                    alert("Res sync error");
                }
            }
            )
            .catch((e) => this.onRejected(e));
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
                    alert("Res sync error");
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
        this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
    }

     showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "NET_MNG_VM_IP_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }
}