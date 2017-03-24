import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import {
    LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent
} from "../../../../architecture";

//import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { RegionModel, keysecretModel, AreaModel } from "../model/cloud-disk.model";

//Service
import { AliCloudDiskService } from "../service/cloud-disk.service";


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
        private activatedRouter: ActivatedRoute,
    ) {
    }

    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("deletemsgbox")
    deletemsgbox: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    keysecret: keysecretModel = new keysecretModel();

    regions: Array<RegionModel> = [];

    defaultRegion: RegionModel = new RegionModel();

    selectedRegion: RegionModel = this.defaultRegion;

    calculatetimer: any = null;

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
                    console.log(this.service.keysecret, "this.keysecret!");
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
                console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.regions = result.Regions.Region;
                    console.log(this.regions, "this.regions!");
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
        }, 50); //window内的代码要延后50ms执行
    }

    outputValue(e:number) {
        this.selectedRegion.count = e;
        console.log(this.selectedRegion.count);
        this.calculatePrice();
    }

    DiskChanged() {
        window.setTimeout(() => {
            this.calculatePrice();
        }, 50); //window内的代码要延后50ms执行
    }

    calculatePrice() {
        if (this.selectedRegion.selectedDisk != "" && this.selectedRegion.diskCount != "") {
            this.selectedRegion.price = "计算中...";
            this.calculatetimer  && window.clearTimeout(this.calculatetimer);
            this.calculatetimer = window.setTimeout(() => {

                this.layoutService.show();
                this.service.calculatePrice(this.selectedRegion)
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
                            this.selectedRegion.price = "￥ " + result + " /时";
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

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason, "onRejected");
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

    showAlert(msg: string): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    
    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("COMMON.SYSTEM_PROMPT", msg);
    }	

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

/*
    //选择行
    selectItem(index:number): void {
        this.msgAlert.list[index].checked = !this.msgAlert.list[index].checked;
        console.log(this.msgAlert.list, "=== Please see which ones are selected ===");
        let selectedml = this.msgAlert.list.filter(n=> { return (n.checked == true);});
        if(selectedml.length == this.pageSize) {
            console.log("The latest one was selected, so all selected!");
            this.allSelected = true;
        } else {
            this.allSelected = false;
        }
    }

    selectOrUnSAllItems(): void {
        if (this.allSelected) {
            console.log("All checked before, so set them all unselected");
            this.allSelected = false;
            this.msgAlert.list.map(n=> { n.checked = false;});
        } else {
            console.log("All unchecked before, so set them all selected");
            this.allSelected = true;
            this.msgAlert.list.map(n=> { n.checked = true;});
        }
    }

    getSelectedItems() {
        this.selectedmsglist = this.msgAlert.list.filter(n=> { return (n.checked == true);});
        if (this.selectedmsglist.length != 0){
            return this.selectedmsglist;
        } else {
            return [];
        }
    }
    */

}