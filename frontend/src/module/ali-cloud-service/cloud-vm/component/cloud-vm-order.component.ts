import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import { LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent, SystemDictionary } from "../../../../architecture";

import { Validation, ValidationRegs } from '../../../../architecture';

//import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { RegionModel, keysecretModel, AreaModel } from "../../cloud-disk/model/cloud-disk.model";
import { orderVmPageModel, imageModel, imageItemModel, VSwitchModel, VPCModel, QuantityModel, 
    InstanceTypeModel, InstanceTypeFamilyModel, 
    instanceFamilyTreeGenerationModel, instanceFamilyTreeIdModel, instanceFamilyTreeTypeIdModel } from "../model/cloud-vm.model";

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

    confirmTitle = "";
    confirmMsg = "";

    confirmOKTitle = "确认";
    confirmCancelTitle = "取消";

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;

    calculatetimer: any = null;

    regions: Array<RegionModel> = [];

    defaultOrderVmPage: orderVmPageModel = new orderVmPageModel();
    selectedOrderVmPage: orderVmPageModel = this.defaultOrderVmPage;

    //镜像
    images: Array<imageModel> = [];
    defaultImageFlatform: imageModel = new imageModel();
    selectedImageFlatform: imageModel = this.defaultImageFlatform;
    defaultImageItem: imageItemModel = new imageItemModel();
    selectedImageItem: imageItemModel = this.defaultImageItem

    //实例族
    instancetypelist: Array<InstanceTypeModel> = [];
    instancetypefamilylist: Array<InstanceTypeFamilyModel> = [];

    //实例tree
    instancegenerations: Array<instanceFamilyTreeGenerationModel> = [];
    instancetypefamilies: Array<instanceFamilyTreeIdModel> = [];
    instancetypes: Array<instanceFamilyTreeTypeIdModel> = [];

    //网络
    vpclist: Array<VPCModel> = [];
    vswitchlist: Array<VSwitchModel> = [];
    defaultVPC: VPCModel = new VPCModel();
    selectedVPC: VPCModel = this.defaultVPC;
    defaultVSwitch: VSwitchModel = new VSwitchModel();
    selectedVSwitch: VSwitchModel = this.defaultVSwitch;

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
            //this.getArea(region);
            Promise.all([this.getArea(region), this.getImages(region), this.getVPCs(region), this.getInstanceFamilyTree(region)]).then( () => {
            console.log(this.selectedOrderVmPage, "========================");
            //this.calculatePrice();
            });
        } else {
            console.log(region, "Region, areas, selected_area and don't do getArea()!");

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

            this.selectedOrderVmPage.selectedDisk = this.selectedOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories[0];
            console.log(this.selectedOrderVmPage.selectedDisk, "selected selectedDisk!");

            Promise.all([this.getImages(region), this.getVPCs(region), this.getInstanceFamilyTree(region)]).then( () => {
            console.log(this.selectedOrderVmPage, "========================");
            //this.calculatePrice();
            });
        }
        //this.getImages(region);
        //this.getInstanceTypeFamily(region);
        //this.getInstanceType(region);
        //this.getVPCs(region);
        //this.getInstanceFamilyTree(region);
        /*
        Promise.all([this.getImages(region), this.getVPCs(region), this.getInstanceFamilyTree(region)]).then( () => {
            console.log(this.selectedOrderVmPage, "========================");
            //this.calculatePrice();
        });
        */

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
                    console.log(region, "Region, areas, default_area after running getArea()!");
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

                    this.selectedOrderVmPage.selectedDisk = this.selectedOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories[0];
                    console.log(this.selectedOrderVmPage.selectedDisk, "selected selectedDisk!");
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
            console.log(this.selectedOrderVmPage.selectedDisk, "selected selectedDisk!");
            if( this.selectedOrderVmPage.selectedDisk != "") {
                //this.calculatePrice();
            }
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
                    this.images = response.resultContent;
                    console.log(this.images, "this.images!");
                    this.selectedImageFlatform = this.images[0];
                    this.selectedImageItem = this.selectedImageFlatform.images[0];
                    this.selectedOrderVmPage.selectedImage = this.selectedImageItem.ImageId;
                    console.log(this.selectedOrderVmPage.selectedImage, "selected imageId!");
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

    FormChanged() {
        window.setTimeout(() => {
            if ( this.selectedImageFlatform == this.defaultImageFlatform ) {
                this.selectedImageItem = this.defaultImageItem;
                this.selectedOrderVmPage.selectedImage = "";
            } else {
                this.selectedImageItem = this.selectedImageFlatform.images[0];
                this.selectedOrderVmPage.selectedImage = this.selectedImageItem.ImageId;
            }
            
            console.log( this.selectedImageItem, this.selectedOrderVmPage.selectedImage, " this.selectedImageItem and selected imageId!");
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

    getInstanceFamilyTree(region: RegionModel) {
        this.layoutService.show();
        this.service.getInstanceFamilyTree(region.RegionId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.instancegenerations = response.resultContent;
                    console.log(this.instancegenerations, "this.instancegenerations!");
                    {
                    this.selectedOrderVmPage.selectedGeneration = this.instancegenerations[0].generation;
                    this.instancetypefamilies = this.instancegenerations[0].instancefamilyid;
                    this.instancetypes = this.instancetypefamilies[0].instanceTypeIDModelList;
                    this.selectedOrderVmPage.selectedInstanceFamily = this.instancetypefamilies[0].instancefamilyid;
                    this.selectedOrderVmPage.selectedInstanceType = this.instancetypes[0].InstanceTypeId;
                    }
                    this.setAndShowIO();
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            }); 
    }

    getVPCs(region: RegionModel) {
        this.layoutService.show();
        this.service.getVPCs(region.RegionId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                        console.log(result, "vpc!");
                    } catch (ex) {
                        console.log(ex);
                    }                    
                    this.vpclist = result.Vpcs.Vpc;
                    console.log(this.vpclist, "this.vpclist!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });

    }

    getVSwitches() {
        window.setTimeout(() => {        
        let vpc: VPCModel = this.selectedVPC;
        if (vpc != this.defaultVPC) {
            this.layoutService.show();
            console.log(vpc.VpcName, "=============");
            this.service.getVSwitches(vpc.VpcId)
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
                    this.vswitchlist = result.VSwitches.VSwitch;
                    console.log(this.vswitchlist, "this.vswitchlist!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
        } else {
            this.selectedVSwitch = this.defaultVSwitch;
            this.vswitchlist = [];
        }
        
    }, 50); //window内的代码要延后50ms执行        

    }

    VSwitchChanged() {
        window.setTimeout(() => {
            this.selectedOrderVmPage.selectedNetworkId = this.selectedVSwitch.VSwitchId;
            console.log(this.selectedOrderVmPage.selectedNetworkId, this.selectedOrderVmPage.selectedNetworkType, "selected NetworkType and VSwitchId!");
        }, 50); //window内的代码要延后50ms执行 
    }

    reNew() {
        this.selectedOrderVmPage.renew = !this.selectedOrderVmPage.renew;
        console.log(this.selectedOrderVmPage.renew, "renew!");
    }

    validatePriceParam(): boolean {
        if (this.selectedOrderVmPage.selectedChargeType != "" &&
            this.selectedOrderVmPage.selectedImage != "" &&
            this.selectedOrderVmPage.selectedQuantity != 0 &&
            this.selectedOrderVmPage.selectedNetworkType != "" &&
            this.selectedOrderVmPage.selectedNetworkId != "" &&
            this.selectedOrderVmPage.selectedInternetChargeType != "" &&
            this.selectedOrderVmPage.selectedDisk != "" &&
            this.selectedOrderVmPage.selectedGeneration != "" &&
            this.selectedOrderVmPage.selectedInstanceFamily != "" &&
            this.selectedOrderVmPage.selectedInstanceType != "" &&

            this.selectedOrderVmPage.selectedInternetMaxBandwidthIn != 0 &&
            this.selectedOrderVmPage.selectedInternetMaxBandwidthOut != 0
             ) {
            return false;
        } else {
            return true;
        }

    }


    calculatePrice() {
        if ( this.validatePriceParam() ) {
            this.selectedOrderVmPage.price = "计算中...";
            this.calculatetimer  && window.clearTimeout(this.calculatetimer);
            this.calculatetimer = window.setTimeout(() => {
                this.layoutService.show();
                this.service.calculatePrice(this.selectedOrderVmPage)
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
                            if (this.selectedOrderVmPage.selectedChargeType == "PostPaid") { //按量计费，多传一个traffic-bandwidth
                                let price_ins = result.filter((n)=>{n.orderType=="instance-buy"});
                                this.selectedOrderVmPage.price_instance = "￥ " + price_ins.tradeAmount + " /时";
                                
                                let price_traf = result.filter((n)=>{n.orderType=="traffic-bandwidth"});
                                this.selectedOrderVmPage.price_traffic = "￥ " + price_traf.tradeAmount + " /时";
                            } else if (this.selectedOrderVmPage.selectedChargeType == "PrePaid") { //包年包月，只传一个instance-buy
                                let price_ins = result.filter((n)=>{n.orderType=="instance-buy"});
                                this.selectedOrderVmPage.price_instance = "￥ " + price_ins.tradeAmount + " /时";
                            }
                            console.log(this.selectedOrderVmPage.price, "this.selectedOrderVmPage.price!");
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
            this.selectedOrderVmPage.price = "  ";
        }
    }

    buyNow() {
        console.log(this.selectedOrderVmPage, "selectedOrderVmPage Finally!!!");
        this.calculatePrice();
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
                    this.confirmAlert("云主机订购成功！", () => {
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

    confirmAlert(msg: string, of?:any): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.confirmTitle = "COMMON.PROMPT";
        this.confirmMsg = msg;
        this.confirm.open();
        this.confirm.ccf = of;
        this.confirm.cof = () => {
            this.confirmOKTitle = "确认";
            this.confirmCancelTitle = "取消";
         };
        this.confirmOKTitle = "返回到主机列表页";
        this.confirmCancelTitle = "留在主机定购页";
    }
    
    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("COMMON.SYSTEM_PROMPT", msg);
    }	

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

    outputValue(e:number) {
        this.selectedOrderVmPage.selectedInternetMaxBandwidthOut = e;
        console.log(this.selectedOrderVmPage.selectedInternetMaxBandwidthOut);
    }

    slide(e:number) {
        console.log(e.target.value);
    }

    show(mnum:QuantityModel) {
        console.log(mnum, "month button");
    }

    showInstanceChargeType() {
        console.log(this.selectedOrderVmPage.selectedChargeType, "selected instance charge type!");
    }

    showInstanceType() {
        console.log(this.selectedOrderVmPage.selectedInstanceType, "selected instance family type!");
    }

    setAndShowIO() {
        if(this.selectedOrderVmPage.selectedGeneration == "ecs-1") {
            this.selectedOrderVmPage.ioOptimized = true;
        } else {
            this.selectedOrderVmPage.ioOptimized = false;
        }
        console.log(this.selectedOrderVmPage.ioOptimized, "selected ioOptimized!");
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
            alicloud_instance: [this.selectedOrderVmPage.InstanceName, [this.v.isAliCloudInstanceName], "阿里云实例名称不对"],
            /*
			username: [this.username, [this.v.isInstanceName, this.v.isBase], "用户名输入格式不正确"],
  			//云主机名称验证
			numberRange: [this.numberRange, [this.v.range(10, 80)], "数字范围不对"],
  			//数字范围10-80
              */
            numberRange: [this.selectedOrderVmPage.diskCount, [this.v.range(40, 500)], "数字范围不对，必须40~500G"],
            
		}

		return this.v.check(key, regs);
	}
    
    submitForm() {
		var errorMessage = this.checkForm();
		if(errorMessage) return alert(errorMessage);
		console.log("通过！");
	}

}