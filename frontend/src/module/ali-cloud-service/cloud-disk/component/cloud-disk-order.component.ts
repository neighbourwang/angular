import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import {
    LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent, SystemDictionary
} from "../../../../architecture";

import { Validation, ValidationRegs } from '../../../../architecture';

//import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { RegionModel, keysecretModel, AreaModel, diskOrderModel } from "../model/cloud-disk.model";

//Service
import { AliCloudDiskService } from "../service/cloud-disk.service";
import { AliCloudDiskDictService } from "../service/cloud-disk-dict.service";
import { AliCloudVmService } from "../../cloud-vm/service/cloud-vm.service";


@Component({
    selector: "alics_diskorder",
    templateUrl: "../template/cloud-disk-order.html",
    styleUrls: ["../style/cloud-disk.less"],
    providers: []
})
export class AliCloudDiskOrderComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: AliCloudDiskService,
        private vmService: AliCloudVmService,
        private dictService: AliCloudDiskDictService,
        private activatedRouter: ActivatedRoute,
        private v: Validation,
    ) {
        this.v.result = {};
    }

    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    //keysecret: keysecretModel = new keysecretModel();

    regions: Array<RegionModel> = [];

    defaultRegion: RegionModel = new RegionModel();

    selectedRegion: RegionModel = this.defaultRegion;

    calculatetimer: any = null;

    diskorder: diskOrderModel = new diskOrderModel(); //订购body模型

    diskCategoryDictArray: Array<SystemDictionary> = [];

    private okCallback: Function = null;

    okClicked() {
        console.log('okClicked');
        if (this.okCallback) {
            console.log('okCallback()');
            this.okCallback();
            this.okCallback = null;
        }
    }

    private confirmedHandler: Function = null;

    onConfirmed() {
        if (this.confirmedHandler) {
            this.confirmedHandler();
            this.confirmedHandler = null;
        }
    }

    ngOnInit(): void {
        this.dictService.diskCategoryDict
            .then((items) => {
                this.diskCategoryDictArray = items;
                console.log(this.diskCategoryDictArray, "this.diskCategoryDictArray");
            });

        this.getKeySecret();

    }
    getKeySecret(): void {
        this.layoutService.show();
        this.service.getKeySecret()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.service.keysecret = response.resultContent;
                    this.vmService.keysecret = response.resultContent;
                    //console.log(this.service.keysecret, "this.keysecret!");
                    this.getAllRegions();
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    getAllRegions(): void {
        this.layoutService.show();
        this.service.getAllRegions()
            .then(
            response => {
                this.layoutService.hide();
                //console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.regions = result.Regions.Region;
                    console.log(this.regions, "this.regions!");
                    this.selectRegion(this.regions[0]);
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    selectRegion(region: RegionModel) {
        this.regions.map((item) => {
            item.selected = false;
            item.selectedArea = new AreaModel();
            item.selectedArea.LocalName = "";
        });
        region.selected = true;
        if (region.areas == null || region.areas.length == 0) {
            this.getArea(region);
        } else {
            console.log(region, "the region which is selected and don't do getArea()!");

            this.resetSelectedRegion();
            this.selectedRegion.areas = region.areas;
            this.selectedRegion.selected = region.selected;
            this.selectedRegion.RegionId = region.RegionId;
            this.selectedRegion.LocalName = region.LocalName;
            //this.selectedRegion.selectedArea = new AreaModel();
            this.selectedRegion.selectedArea = region.areas[0];
            this.selectedRegion.selectedArea.AvailableDiskCategories.DiskCategories = [].concat(region.areas[0].AvailableDiskCategories.DiskCategories);
            {
                region.selectedArea = new AreaModel();
                region.selectedArea.LocalName = this.selectedRegion.selectedArea.LocalName;
                region.selectedArea.ZoneId = this.selectedRegion.selectedArea.ZoneId;
                region.selectedArea.AvailableDiskCategories.DiskCategories = this.selectedRegion.selectedArea.AvailableDiskCategories.DiskCategories;
            }
            console.log(this.selectedRegion, "this.selectedRegion!");

            this.selectedRegion.selectedDisk = this.selectedRegion.selectedArea.AvailableDiskCategories.DiskCategories[0];
            console.log(this.selectedRegion.selectedDisk, "selected selectedDisk!");
            if (this.selectedRegion.selectedDisk == undefined)  this.selectedRegion.selectedDisk = '';
            this.calculatePrice();
        }
    }
    //根据regionId获取可用区列表
    getArea(region: RegionModel) {
        this.layoutService.show();
        this.service.getArea(region.RegionId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                    } catch (ex) {
                        console.log(ex);
                    }
                    region.areas = result.Zones.Zone;
                    console.log(region, "the region which is selected!");
                    this.resetSelectedRegion();

                    this.selectedRegion.areas = region.areas;
                    this.selectedRegion.selected = region.selected;
                    this.selectedRegion.RegionId = region.RegionId;
                    this.selectedRegion.LocalName = region.LocalName;
                    //this.selectedRegion.selectedArea = new AreaModel();
                    this.selectedRegion.selectedArea = region.areas[0];
                    this.selectedRegion.selectedArea.AvailableDiskCategories.DiskCategories = [].concat(region.areas[0].AvailableDiskCategories.DiskCategories);
                    {
                        region.selectedArea = new AreaModel();
                        region.selectedArea.LocalName = this.selectedRegion.selectedArea.LocalName;
                        region.selectedArea.ZoneId = this.selectedRegion.selectedArea.ZoneId;
                        region.selectedArea.AvailableDiskCategories.DiskCategories = this.selectedRegion.selectedArea.AvailableDiskCategories.DiskCategories;
                    }
                    console.log(this.selectedRegion, "this.selectedRegion!");

                    this.selectedRegion.selectedDisk = this.selectedRegion.selectedArea.AvailableDiskCategories.DiskCategories[0];
                    console.log(this.selectedRegion.selectedDisk, "selected selectedDisk!");
                    if (this.selectedRegion.selectedDisk == undefined)  this.selectedRegion.selectedDisk = '';
                    this.calculatePrice();
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    resetSelectedRegion() {
        //this.defaultRegion = new RegionModel();
        this.defaultRegion.areas = [];
        //this.defaultRegion.count = 1;
        //this.defaultRegion.diskCount = "20";
        this.defaultRegion.LocalName = "";
        this.defaultRegion.RegionId = "";
        this.defaultRegion.selected = false;
        //this.defaultRegion.selectedArea.AvailableDiskCategories.DiskCategories = [];
        this.defaultRegion.selectedDisk = "";
        this.defaultRegion.price = "";
        this.selectedRegion = this.defaultRegion;
    }

    AreaChanged(region: RegionModel) {
        window.setTimeout(() => {
            console.log(region, "region in AreaChanged()!");
            region.selectedArea = new AreaModel();
            region.selectedArea.LocalName = this.selectedRegion.selectedArea.LocalName;
            region.selectedArea.ZoneId = this.selectedRegion.selectedArea.ZoneId;
            region.selectedArea.AvailableDiskCategories = this.selectedRegion.selectedArea.AvailableDiskCategories;
            console.log(region, this.selectedRegion, "region, this.selectedRegion in AreaChanged()!");
            
            this.selectedRegion.selectedDisk = this.selectedRegion.selectedArea.AvailableDiskCategories.DiskCategories[0];
            console.log(this.selectedRegion.selectedDisk, "selected selectedDisk!");
            if (this.selectedRegion.selectedDisk == undefined)  this.selectedRegion.selectedDisk = '';

            this.calculatePrice();
        }, 50); //window内的代码要延后50ms执行
    }

    outputValue(e: number) {
        this.selectedRegion.count = e;
        console.log(this.selectedRegion.count);
        this.calculatePrice();
    }

    DiskChanged() {
        window.setTimeout(() => {
            this.calculatePrice();
        }, 50); //window内的代码要延后50ms执行
    }

    displayDiskType(disktype: string): string {
        let diskDict: Array<SystemDictionary> = this.diskCategoryDictArray.filter((item) => {
            return item.value == disktype;
        });
        if (diskDict.length != 0) {
            return diskDict[0].displayValue;
        } else {
            return disktype;
        }
    }

    calculatePrice() {
        if (this.selectedRegion.selectedDisk != "" && this.selectedRegion.diskCount != "") {
            if (this.selectedRegion.selectedDisk == "cloud" && (parseInt(this.selectedRegion.diskCount) > 2000 || parseInt(this.selectedRegion.diskCount) < 5)) {
                //this.showMsg("请选择正确的配置！");
                return;
            }
            if ((this.selectedRegion.selectedDisk == "cloud_efficiency" || this.selectedRegion.selectedDisk == "cloud_ssd") && (parseInt(this.selectedRegion.diskCount) > 32768 || parseInt(this.selectedRegion.diskCount) < 20)) {
                //this.showMsg("请选择正确的配置！");
                return;
            }
            this.selectedRegion.price = "计算中...";
            this.calculatetimer && window.clearTimeout(this.calculatetimer);
            this.calculatetimer = window.setTimeout(() => {

                this.layoutService.show();
                this.service.calculatePrice(this.selectedRegion)
                    .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            console.log(response.resultContent);
                            this.selectedRegion.price = response.resultContent[0].tradeAmount;
                            console.log(this.selectedRegion.price, "this.selectedRegion.price!");
                        } else {
                            this.showMsg("COMMON.GETTING_DATA_FAILED");
                            return;
                        }
                    })
                    .catch((e) => {
                        this.onRejected(e);
                    });

            }, 300);

        } else {
            this.selectedRegion.price = "  ";
        }
    }

    buyNow() {
        this.diskorder.clientToken = "";
        this.diskorder.description = "";
        this.diskorder.diskCategory = this.selectedRegion.selectedDisk;
        this.diskorder.diskName = "";
        this.diskorder.size = this.selectedRegion.diskCount;
        this.diskorder.snapshotId = "";
        if (this.selectedRegion.selectedDisk != "" && this.selectedRegion.diskCount != "") {
            if (this.selectedRegion.selectedDisk == "cloud" && (parseInt(this.selectedRegion.diskCount) > 2000 || parseInt(this.selectedRegion.diskCount) < 5)) {
                this.showMsg("请选择正确的配置！");
                return;
            }
            if ((this.selectedRegion.selectedDisk == "cloud_efficiency" || this.selectedRegion.selectedDisk == "cloud_ssd") && (parseInt(this.selectedRegion.diskCount) > 32768 || parseInt(this.selectedRegion.diskCount) < 20)) {
                this.showMsg("请选择正确的配置！");
                return;
            }

            this.layoutService.show();
            this.service.createDiskOrder(this.selectedRegion.RegionId, this.selectedRegion.selectedArea.ZoneId, this.diskorder)
                .then(
                response => {
                    this.layoutService.hide();
                    console.log(response, "response!");
                    if (response && 100 == response["resultCode"]) {
                        let result;
                        try {
                            result = JSON.parse(response.resultContent);
                        } catch (ex) {
                            console.log(ex);
                        }
                        console.log(result.DiskId, "result.DiskId was ordered!");
                        this.showAlert("云硬盘订购成功！", () => {
                            this.router.navigate([`ali-cloud-service/cloud-disk/cloud-disk-list`]);
                        });
                    } else {
                        //this.showMsg("COMMON.OPERATION_ERROR");
                        let result;
                        try {
                            result = JSON.parse(response.resultContent);
                            console.log(result, "result!");
                        } catch (ex) {
                            console.log(ex);
                        };
                        this.showMsg(result.Message);
                        return;
                    }
                })
                .catch((e) => {
                    this.onRejected(e);
                });

        } else {
            this.showMsg("请选择正确的配置！");
        }

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason, "onRejected");
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

    showAlert(msg: string, of?: any): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
        this.notice.nof = of;
    }


    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("COMMON.SYSTEM_PROMPT", msg);
    }

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            numberRange_cloud: [this.selectedRegion.diskCount, [this.v.range(5, 2000)], "数字范围不对，必须5~2000"],
            numberRange_cloud_efficiency: [this.selectedRegion.diskCount, [this.v.range(20, 32768)], "数字范围不对，必须20~32768"],
            numberRange_cloud_ssd: [this.selectedRegion.diskCount, [this.v.range(20, 32768)], "数字范围不对，必须20~32768"],
            mustnull: [this.selectedRegion.diskCount, [this.v.equalTo("")], "请选择云硬盘类型"]
        }
        return this.v.check(key, regs);
    }

    submitForm() {
        var errorMessage = this.checkForm();
        if (errorMessage) return alert(errorMessage);
        console.log("通过！");
    }

}