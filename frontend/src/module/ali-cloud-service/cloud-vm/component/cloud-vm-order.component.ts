import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent, SystemDictionary } from "../../../../architecture";

import { Validation, ValidationRegs } from '../../../../architecture';

//import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { RegionModel, keysecretModel, AreaModel } from "../../cloud-disk/model/cloud-disk.model";
import { orderVmPageModel, imageModel, imageItemModel, QuantityModel, InstanceTypeModel, InstanceTypeFamilyModel } from "../model/cloud-vm.model";

//Service
import { AliCloudDiskService } from "../../cloud-disk/service/cloud-disk.service";
import { AliCloudDiskDictService } from "../../cloud-disk/service/cloud-disk-dict.service";
import { AliCloudVmService } from "../service/cloud-vm.service";


@Component({
    selector: "alics_vmorder",
    templateUrl: "../template/cloud-vm-order.html",
    styleUrls: ["../../cloud-disk/style/cloud-disk.less"],
    providers: []
})
export class AliCloudVmOrderComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private commonService: AliCloudDiskService,
        private service: AliCloudVmService,
        private dictService: AliCloudDiskDictService,
        private activatedRouter : ActivatedRoute,
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

    regions: Array<RegionModel> = [];

    defaultOrderVmPage: orderVmPageModel = new orderVmPageModel();
    selectedOrderVmPage: orderVmPageModel = this.defaultOrderVmPage;

    images: Array<imageModel> = [];
    defaultImageFlatform: imageModel = new imageModel();
    selectedImageFlatform: imageModel = this.defaultImageFlatform;
    defaultImageItem: imageItemModel = new imageItemModel();
    selectedImageItem: imageItemModel = this.defaultImageItem

    instancetypelist: Array<InstanceTypeModel> = [];
    instancetypefamilylist: Array<InstanceTypeFamilyModel> = [];

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
        this.commonService.getKeySecret()
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.commonService.keysecret = response.resultContent;
                    this.service.keysecret = response.resultContent;
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
        this.commonService.getAllRegions()
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
            this.getImages(region);
            this.getInstanceTypeFamily(region);
            this.getInstanceType(region);
        } else {
            console.log(region, "the region which is selected and don't do getArea()!");

            this.resetSelectedRegion();
            this.selectedOrderVmPage.areas = region.areas;
            this.selectedOrderVmPage.selected = region.selected;
            this.selectedOrderVmPage.RegionId = region.RegionId;
            this.selectedOrderVmPage.LocalName = region.LocalName;
            this.selectedOrderVmPage.selectedArea = region.areas[0];
            this.selectedOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories = [].concat(region.areas[0].AvailableDiskCategories.DiskCategories);
            {
                region.selectedArea = new AreaModel();
                region.selectedArea.LocalName = this.selectedOrderVmPage.selectedArea.LocalName;
                region.selectedArea.ZoneId = this.selectedOrderVmPage.selectedArea.ZoneId;
                region.selectedArea.AvailableDiskCategories.DiskCategories = this.selectedOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories;
            }
            console.log(this.selectedOrderVmPage, "this.selectedOrderVmPage!");
        }
    }
    //根据regionId获取可用区列表
    getArea(region: RegionModel) {
        this.layoutService.show();
        this.commonService.getArea(region.RegionId)
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
                    console.log(region, "Areas in the region which is selected!");
                    this.resetSelectedRegion();

                    this.selectedOrderVmPage.areas = region.areas;
                    this.selectedOrderVmPage.selected = region.selected;
                    this.selectedOrderVmPage.RegionId = region.RegionId;
                    this.selectedOrderVmPage.LocalName = region.LocalName;
                    //this.selectedOrderVmPage.selectedArea = new AreaModel();
                    this.selectedOrderVmPage.selectedArea = region.areas[0];
                    this.selectedOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories = [].concat(region.areas[0].AvailableDiskCategories.DiskCategories);
                    {
                        region.selectedArea = new AreaModel();
                        region.selectedArea.LocalName = this.selectedOrderVmPage.selectedArea.LocalName;
                        region.selectedArea.ZoneId = this.selectedOrderVmPage.selectedArea.ZoneId;
                        region.selectedArea.AvailableDiskCategories.DiskCategories = this.selectedOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories;
                    }
                    console.log(this.selectedOrderVmPage, "this.selectedOrderVmPage!");
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
        //this.ViewChild = new RegionModel();
        this.defaultOrderVmPage.areas = [];
        //this.defaultOrderVmPage.count = 1;
        //this.defaultOrderVmPage.diskCount = "20";
        this.defaultOrderVmPage.LocalName = "";
        this.defaultOrderVmPage.RegionId = "";
        this.defaultOrderVmPage.selected = false;
        //this.defaultOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories = [];
        this.defaultOrderVmPage.price = "";
        this.selectedOrderVmPage = this.defaultOrderVmPage;
    }

    AreaChanged(region: RegionModel) {
        window.setTimeout(() => {
            region.selectedArea = new AreaModel();
            region.selectedArea.LocalName = this.selectedOrderVmPage.selectedArea.LocalName;
            region.selectedArea.ZoneId = this.selectedOrderVmPage.selectedArea.ZoneId;
            region.selectedArea.AvailableDiskCategories = this.selectedOrderVmPage.selectedArea.AvailableDiskCategories;
            console.log(region, this.selectedOrderVmPage, "After AreaChanged()!");
        }, 50); //window内的代码要延后50ms执行
    }

    DiskChanged() {
        window.setTimeout(() => {
            this.calculatePrice();
        }, 50); //window内的代码要延后50ms执行
    }

    displayDiskType(disktype: string):string {
        let diskDict:Array<SystemDictionary> = this.diskCategoryDictArray.filter((item) => {
            return item.value == disktype;
        });
        if (diskDict.length != 0) {
            return diskDict[0].displayValue;
        } else {
            return disktype;
        }
    }

    getImages(region: RegionModel) {
        this.layoutService.show();
        this.service.getImages(region.RegionId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    /*
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                    } catch (ex) {
                        console.log(ex);
                    }                 
                    this.images = result.Images.Image;
                    */
                    this.images = response.resultContent;
                    console.log(this.images, "this.images!");                    
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });

    }

    ImageChanged() {
        window.setTimeout(() => {
            this.selectedOrderVmPage.selectedImage = this.selectedImageItem.ImageId;
            console.log(this.selectedOrderVmPage.selectedImage, "selected imageId!");
        }, 50); //window内的代码要延后50ms执行        
    }

    getInstanceTypeFamily(region: RegionModel) {
        this.layoutService.show();
        this.service.getInstanceTypeFamily(region.RegionId)
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
                    this.instancetypefamilylist = result.InstanceTypeFamilies.InstanceTypeFamily;
                    console.log(this.instancetypefamilylist, "this.instancetypefamilylist!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });

    }

    getInstanceType(region: RegionModel) {
        this.layoutService.show();
        this.service.getInstanceType(region.RegionId)
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
                    this.instancetypelist = result.InstanceTypes.InstanceType;
                    console.log(this.instancetypelist, "this.instancetypelist!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });

    }


    calculatePrice() {
        /*
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
        */
    }

    buyNow() {
        this.layoutService.show();
        this.service.createInstanceOrder(this.selectedOrderVmPage)
            .then(
            response => {
                this.layoutService.hide();
                console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                        console.log(result, "result!");
                    } catch (ex) {
                        console.log(ex);
                    };
                    //console.log(result.DiskId, "result.DiskId was ordered!");
                    this.showAlert("云主机订购成功！", () => {
                        this.router.navigate([`ali-cloud-service/cloud-vm/cloud-vm-list`]);
                        }
                    );
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }


    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason, "onRejected");
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

    showAlert(msg: string, of?:any): void {
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

    show(mnum:QuantityModel) {
        console.log(mnum, "month button");
    }

    checkForm(key?:string) {
		let regs:ValidationRegs = {  //regs是定义规则的对象
            /*
			email: [this.email, [this.v.isEmail, this.v.isUnBlank], "Email输入不正确"], 
  			//验证email
			baseInput: [this.baseInput, [this.v.isBase, this.v.isUnBlank], "不能包含特殊字符"],
  			//两次验证[基础的验证不能包含特殊字符，不能为空]
			phone: [this.phone, [this.v.isMoblie, this.v.isUnBlank], "手机号码输入不正确"],
  			//手机号码验证
              */
			password: [this.selectedOrderVmPage.Password, [this.v.isPassword, this.v.lengthRange(8, 16)], "密码输入不正确"],
  			//两次验证[密码验证，8-16个字]
			passwordCheck: [this.selectedOrderVmPage.passwordCheck, [this.v.equalTo(this.selectedOrderVmPage.Password)], "两次密码输入不一致"],
  			//再次输入密码验证
            alicloud_instance: [this.selectedOrderVmPage.InstanceName, [this.v.isInstanceName], "阿里云实例名称不对"],
            /*
			username: [this.username, [this.v.isInstanceName, this.v.isBase], "用户名输入格式不正确"],
  			//云主机名称验证
			numberRange: [this.numberRange, [this.v.range(10, 80)], "数字范围不对"],
  			//数字范围10-80
              */
            
		}

		return this.v.check(key, regs);
	}
    
    submitForm() {
		var errorMessage = this.checkForm();
		if(errorMessage) return alert(errorMessage);
		console.log("通过！");
	}

}