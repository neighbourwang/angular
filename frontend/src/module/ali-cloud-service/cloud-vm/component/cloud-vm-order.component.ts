import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import {
    LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent, SystemDictionary
} from "../../../../architecture";

import { Validation, ValidationRegs } from '../../../../architecture';

import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { RegionModel, keysecretModel, AreaModel } from "../../cloud-disk/model/cloud-disk.model";
import {
    orderVmPageModel, imageModel, imageItemModel, VSwitchModel, VPCModel, QuantityModel,
    InstanceTypeModel, InstanceTypeFamilyModel,
    instanceFamilyTreeGenerationModel, instanceFamilyTreeIdModel,
    instanceFamilyTreeTypeIdModel, securityGroupModel, priceReturnModel
} from "../model/cloud-vm.model";

//Service
import { AliCloudDiskService } from "../../cloud-disk/service/cloud-disk.service";
import { AliCloudDiskDictService } from "../../cloud-disk/service/cloud-disk-dict.service";
import { AliCloudVMDictService } from "../service/cloud-vm-dict.service";
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
        private dictDiskService: AliCloudDiskDictService,
        private dictService: AliCloudVMDictService,
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

    confirmTitle = "";
    confirmMsg = "";

    confirmOKTitle = "确认";
    confirmCancelTitle = "取消";

    pageIndex = 1;
    pageSize = 10;
    totalPage = 1;
/*
    tip_instanceChargeType="<div class='bk-asktip-title'>包年包月：</div>按月购买及续费，为预付费模式。<br />ECS若用于网站Web访问，请及时备案；<br/>若 ECS 用于 SLB，请前往 SLB 新购页面购买带宽，ECS 仅需保留少量带宽以便您管理。<div class='bk-asktip-title bk-pt2'>按量付费：</div>按实际使用时间以小时为单位进行收费，后付费模式<br />ECS不支持备案服务<br /><a href='https://help.aliyun.com/knowledge_detail/40653.html' class='bk-lnk' target='_blank'>按量付费计费说明>></a>";
    tip_region = "<div class='bk-asktip-title'>地域：</div>地域指的是 ECS 实例所在的物理位置。<div class='bk-asktip-title'>可用区：</div>可用区是指在同一地域内，电力和网络互相独立的物理区域。在同一地域内可用区与可用区之间内网互通，可用区之间能做到故障隔离。<div class=&quot;bk-hr&quot;></div>如果您的应用需要较高的容灾能力，建议您将云服务器 ECS 实例部署在同一地域的不同可用区内。<br/>如果您的应用在实例之间需要较低的网络时延，则建议您将 ECS 实例创建在相同的可用区内";
    tip_networkType = "<div class='bk-asktip-title'>网络类型：</div>指ECS实例的网络管理及使用模式，与运营商公网接入网络质量无关，任何网络类型的运营商接入均为 BGP 线路，请您放心使用，并根据自己需要进行选择。"
    tip_instanceType = "系列 II 较系列 I 进行了硬件升级，采用 Haswell CPU、DDR4 内存，并默认为 I/O 优化实例，同时增加了一些新的指令集，使整数和浮点运算的性能翻倍，整体计算能力更强。<div class='bk-hr'></div>系列 III 相对系列 I 和系列 II 进行了硬件升级，采用 Intel Broadwell CPU、DDR4 内存，并默认为 I/O 优化实例，高主频和中主频两种 CPU 配合多种内存配比，可以提供给用户更好的性能以及更多的选择。<div class=&quot;bk-hr&quot;></div>系列之间不能互相升降配。"
    tip_ioOptimized = "<div class='bk-asktip-title'>选择支持 I/O 优化的实例：</div>挂载 SSD云盘或高效云盘时能够获得云盘的全部存储性能，因为 I/O 优化为实例与云盘之间提供更好的网络能力，可保证云盘存储性能的发挥。 <div class='bk-hr'></div> <div class='bk-asktip-title'>对于不支持 I/O 优化的实例：</div>挂载 SSD云盘时，通常最高可获得 1000 左右的 IOPS 性能；挂载高效云盘时，通常最高可获得数百的 IOPS 性能";
    tip_internetChargeType = "<div class='bk-asktip-title'>按固定带宽的方式：</div>需指定公网出方向的带宽的大小，如 10Mbps，适用于业务场景对于网络带宽要求比较稳定的客户，费用较低 <div class='bk-asktip-title bk-pt2'>按使用流量的方式：</div>是按公网出方向的实际发生的网络流量进行收费，适用于业务场景对网络带宽需求变化较大的场景，如平时带宽使用较低但间歇性的出现网络访问高峰的场景；为了防止突然爆发的流量产生较高的费用，可以指定容许的最大网络带宽进行限制。";
    tip_image = "<div class='bk-asktip-title'>公共镜像：</div>是由阿里云官方提供公共基础镜像，仅包括初始系统环境。请根据您的实际情况自助配置应用环境或相关软件配置。</div><div ng-show='true'><div class=&quot;bk-hr&quot;></div><div class='bk-asktip-title'>自定义镜像：</div>基于用户系统快照生成，包括初始系统环境、 应用环境和相关软件配置 。选择自定义镜像创建云服务器，节省您的重复配置时间。</div><div ng-show='true'><div class=&quot;bk-hr&quot;></div><div class='bk-asktip-title'>共享镜像：</div>是其他账号的自定义镜像主动共享给您使用的镜像。阿里云不保证其他账号共享给您的镜像的完整性和安全性，使用共享镜像需要自行承担风险。<a href=&quot;http://help.aliyun.com/knowledge_detail.htm?knowledgeId=6527514&quot; target='_blank'>了解共享镜像详情&amp;gt;&amp;gt;</a></div><div ng-show='true'><div class=&quot;bk-hr&quot;></div><div class='bk-asktip-title'>镜像市场：</div>提供经严格审核的百款优质第三方镜像，预装操作系统、应用环境和各类软件，无需配置，可一键部署云服务器。满足建站/应用开发/可视化管理等个性化需求。<a href=&quot;http://market.aliyun.com/imagehelp&quot; target='_blank'>了解镜像市场服务&amp;gt;&amp;gt;</a></div>";
    tip_renew = "<div class='bk-asktip-title'>按月购买：</div>则自动续费周期为 1 个月<div class='bk-asktip-title bk-pt2'>按年购买：</div>则自动续费周期为 1 年。";
*/

    calculatetimer: any = null;
    displayInstanceType = true;
    showClassicNetwork = false;
    showVpcNetwork = true;
    show_price_traffic = false;

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

    selectedinstancetypefamily: instanceFamilyTreeIdModel = new instanceFamilyTreeIdModel();


    //网络
    vpclist: Array<VPCModel> = [];
    vswitchlist: Array<VSwitchModel> = [];
    defaultVPC: VPCModel = new VPCModel();
    selectedVPC: VPCModel = this.defaultVPC;
    defaultVSwitch: VSwitchModel = new VSwitchModel();
    selectedVSwitch: VSwitchModel = this.defaultVSwitch;

    securitygrouplist: Array<securityGroupModel> = [];
    defaultsecgroup: securityGroupModel = new securityGroupModel();
    selectedsecgroup: securityGroupModel = this.defaultsecgroup;
    classicSecGrouplist: Array<securityGroupModel> = [];
    vpcSecGrouplist: Array<securityGroupModel> = [];

    diskCategoryDictArray: Array<SystemDictionary> = [];
    instanceStatusDictArray: Array<SystemDictionary> = [];
    instanceChargeTypeDictArray: Array<SystemDictionary> = [];
    ioOptimizedDictArray: Array<SystemDictionary> = [];
    networkTypeDictArray: Array<SystemDictionary> = [];

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

        this.dictDiskService.diskCategoryDict
            .then((items) => {
                this.diskCategoryDictArray = items;
                console.log(this.diskCategoryDictArray, "this.diskCategoryDictArray");
            });

        this.dictService.instanceStatusDict
            .then((items) => {
                this.instanceStatusDictArray = items;
                console.log(this.instanceStatusDictArray, "this.instanceStatusDictArray");
            });
        this.dictService.instanceChargeTypeDict
            .then((items) => {
                this.instanceChargeTypeDictArray = items;
                console.log(this.instanceChargeTypeDictArray, "this.instanceChargeTypeDictArray");
            });
        this.dictService.ioOptimizedDict
            .then((items) => {
                this.ioOptimizedDictArray = items;
                console.log(this.ioOptimizedDictArray, "this.ioOptimizedDictArray");
            });
        this.dictService.networkTypeDict
            .then((items) => {
                this.networkTypeDictArray = items;
                console.log(this.networkTypeDictArray, "this.networkTypeDictArray");
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
            this.layoutService.show();
            Promise.all([this.service.getArea(region.RegionId), this.service.getInstanceFamilyTree(region.RegionId), this.service.getImages(region.RegionId), this.service.getVPCs(region.RegionId),])
                .then((arr) => {
                    this.layoutService.hide();
                    //console.log(arr[0], arr[1], arr[2], arr[3], arr[4], "-----------------");
                    //Area
                    let result = null;
                    try {
                        result = JSON.parse(arr[0]);
                    } catch (ex) {
                        console.log(ex);
                    }
                    region.areas = result.Zones.Zone;
                    this.resetSelectedRegion();
                    this.selectedOrderVmPage.areas = region.areas;
                    this.selectedOrderVmPage.selected = region.selected;
                    this.selectedOrderVmPage.RegionId = region.RegionId;
                    this.selectedOrderVmPage.LocalName = region.LocalName;
                    this.selectedOrderVmPage.selectedArea = region.areas[0];
                    console.log(this.selectedOrderVmPage.selectedArea.ZoneId, "selected ZoneId!");
                    this.selectedOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories = [].concat(region.areas[0].AvailableDiskCategories.DiskCategories);
                    {
                        region.selectedArea = new AreaModel();
                        region.selectedArea.LocalName = this.selectedOrderVmPage.selectedArea.LocalName;
                        region.selectedArea.ZoneId = this.selectedOrderVmPage.selectedArea.ZoneId;
                        region.selectedArea.AvailableDiskCategories.DiskCategories = this.selectedOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories;
                    }
                    this.selectedOrderVmPage.selectedDisk = this.selectedOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories[0];
                    console.log(this.selectedOrderVmPage.selectedDisk, "selected selectedDisk!");

                    //getInstanceFamilyTree
                    this.instancegenerations = arr[1];   //1
                    console.log(this.instancegenerations, "this.instancegenerations!");
                    if (this.instancegenerations.length != 0) {
                        this.displayInstanceType = true;
                        this.selectedOrderVmPage.selectedGeneration = this.instancegenerations[0].generation;
                        this.instancetypefamilies = this.instancegenerations[0].instancefamilyid;
                        this.instancetypes = this.instancetypefamilies[0].instanceTypeIDModelList;
                        this.selectedOrderVmPage.selectedInstanceFamily = this.instancetypefamilies[0].instancefamilyid;
                        this.selectedOrderVmPage.selectedInstanceType = this.instancetypes[0].InstanceTypeId;
                        this.selectedOrderVmPage.instanceShowName = this.instancetypes[0].instanceShowName;
                        console.log(this.selectedOrderVmPage.selectedInstanceType, "selected InstanceType!");
                    } else {
                        console.log("this.instancegenerations.length = 0");
                        this.displayInstanceType = false;
                    }
                    this.setAndShowIO();

                    //Images
                    this.images = arr[2];
                    console.log(this.images, "this.images!");
                    if (this.images.length != 0) {
                        this.selectedImageFlatform = this.images[0];
                        this.selectedImageItem = this.selectedImageFlatform.images[0];
                        this.selectedOrderVmPage.selectedImage = this.selectedImageItem.ImageId;
                        console.log(this.selectedOrderVmPage.selectedImage, "selected imageId!");
                    } else {
                        console.log("this.images.length = 0");
                        this.selectedImageFlatform = this.defaultImageFlatform;
                        this.selectedImageItem = this.defaultImageItem;
                        this.selectedOrderVmPage.selectedImage = null;
                    }

                    console.log("start config Network!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    this.selectedOrderVmPage.selectedNetworkType = "vpc";
                    console.log(this.selectedOrderVmPage.selectedNetworkType, "selected NetworkType!");
                    //this.selectedOrderVmPage.AllocatePublicIP = false;
                    this.selectedOrderVmPage.selectedInternetChargeType = "PayByBandwidth";
                    this.selectedOrderVmPage.selectedInternetMaxBandwidthOut = 1;

                    //getVPCs
                    result = null;
                    try {
                        result = JSON.parse(arr[3]);
                        //console.log(result, "vpc!");
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.vpclist = result.Vpcs.Vpc;
                    console.log(this.vpclist, "this.vpclist!");
                    if (this.vpclist.length != 0) {
                        this.selectedVPC = this.vpclist[0];
                        this.selectedOrderVmPage.selectedVpcId = this.selectedVPC.VpcId;
                        //this.selectedOrderVmPage.AllocatePublicIP = false;
                        console.log(this.selectedOrderVmPage.selectedVpcId, "selected VpcId!");
                        //this.getVSwitches();
                        this.vpc_vswitch_secgroup();
                    } else {
                        console.log("this.vpclist.length = 0");
                        this.selectedVPC = this.defaultVPC;
                        this.vswitchlist = [];
                        this.selectedVSwitch = this.defaultVSwitch;
                        this.selectedOrderVmPage.selectedVpcId = null;
                        this.selectedOrderVmPage.selectedVpcId = "random";
                        this.selectedOrderVmPage.selectedVswitchId = null;
                        this.classicSecGrouplist = [];
                        this.vpcSecGrouplist = [];
                        this.selectedsecgroup = this.defaultsecgroup;
                        this.showMsg("无虚拟VPC");
                        this.calculatePrice();
                    }

                    //this.getSecurityGroups(region);//网络类型一确定，就得去拿securitygroup数据

                }).catch((e) => this.onRejected(e));

        } else {
            //console.log(region, "Region, areas, selected_area and don't do getArea()!");

            this.resetSelectedRegion();
            this.selectedOrderVmPage.areas = region.areas;
            this.selectedOrderVmPage.selected = region.selected;
            this.selectedOrderVmPage.RegionId = region.RegionId;
            this.selectedOrderVmPage.LocalName = region.LocalName;
            this.selectedOrderVmPage.selectedArea = region.areas[0];
            console.log(this.selectedOrderVmPage.selectedArea.ZoneId, "selected ZoneId!");
            this.selectedOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories = [].concat(region.areas[0].AvailableDiskCategories.DiskCategories);
            {
                region.selectedArea = new AreaModel();
                region.selectedArea.LocalName = this.selectedOrderVmPage.selectedArea.LocalName;
                region.selectedArea.ZoneId = this.selectedOrderVmPage.selectedArea.ZoneId;
                region.selectedArea.AvailableDiskCategories.DiskCategories = this.selectedOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories;
            }
            this.selectedOrderVmPage.selectedDisk = this.selectedOrderVmPage.selectedArea.AvailableDiskCategories.DiskCategories[0];
            console.log(this.selectedOrderVmPage.selectedDisk, "selected selectedDisk!");

            this.layoutService.show();
            Promise.all([this.service.getInstanceFamilyTree(region.RegionId), this.service.getImages(region.RegionId), this.service.getVPCs(region.RegionId)])
                .then((arr) => {
                    this.layoutService.hide();
                    //console.log(arr[0], arr[1], arr[2], arr[3], "--------------------");
                    let result = null;

                    //getInstanceFamilyTree
                    this.instancegenerations = arr[0];
                    console.log(this.instancegenerations, "this.instancegenerations!");
                    if (this.instancegenerations.length != 0) {
                        this.displayInstanceType = true;
                        this.selectedOrderVmPage.selectedGeneration = this.instancegenerations[0].generation;
                        this.instancetypefamilies = this.instancegenerations[0].instancefamilyid;
                        this.instancetypes = this.instancetypefamilies[0].instanceTypeIDModelList;
                        this.selectedOrderVmPage.selectedInstanceFamily = this.instancetypefamilies[0].instancefamilyid;
                        this.selectedOrderVmPage.selectedInstanceType = this.instancetypes[0].InstanceTypeId;
                        this.selectedOrderVmPage.instanceShowName = this.instancetypes[0].instanceShowName;
                        console.log(this.selectedOrderVmPage.selectedInstanceType, "selected InstanceType!");
                    } else {
                        console.log("this.instancegenerations.length = 0");
                        this.displayInstanceType = false;
                    }
                    this.setAndShowIO();

                    //Images
                    this.images = arr[1];
                    console.log(this.images, "this.images!");
                    if (this.images.length != 0) {
                        this.selectedImageFlatform = this.images[0];
                        this.selectedImageItem = this.selectedImageFlatform.images[0];
                        this.selectedOrderVmPage.selectedImage = this.selectedImageItem.ImageId;
                        console.log(this.selectedOrderVmPage.selectedImage, "selected imageId!");
                    } else {
                        console.log("this.images.length = 0");
                        this.selectedImageFlatform = this.defaultImageFlatform;
                        this.selectedImageItem = this.defaultImageItem;
                        this.selectedOrderVmPage.selectedImage = null;
                    }

                    console.log("start config Network!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                    this.selectedOrderVmPage.selectedNetworkType = "vpc";
                    console.log(this.selectedOrderVmPage.selectedNetworkType, "selected NetworkType!");
                    //this.selectedOrderVmPage.AllocatePublicIP = false;
                    this.selectedOrderVmPage.selectedInternetChargeType = "PayByBandwidth";
                    this.selectedOrderVmPage.selectedInternetMaxBandwidthOut = 1;

                    //getVPCs
                    result = null;
                    try {
                        result = JSON.parse(arr[2]);
                        //console.log(result, "vpc!");
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.vpclist = result.Vpcs.Vpc;
                    console.log(this.vpclist, "this.vpclist!");
                    if (this.vpclist.length != 0) {
                        this.selectedVPC = this.vpclist[0];
                        this.selectedOrderVmPage.selectedVpcId = this.selectedVPC.VpcId;
                        //this.selectedOrderVmPage.AllocatePublicIP = false;
                        console.log(this.selectedOrderVmPage.selectedVpcId, "selected VpcId!");

                        this.vpc_vswitch_secgroup();
                        //this.getVSwitches();
                    } else {
                        console.log("this.vpclist.length = 0");
                        this.selectedVPC = this.defaultVPC;
                        this.vswitchlist = [];
                        this.selectedVSwitch = this.defaultVSwitch;
                        //this.selectedOrderVmPage.selectedVpcId = null;
                        this.selectedOrderVmPage.selectedVpcId = "random";
                        this.selectedOrderVmPage.selectedVswitchId = null;
                        this.classicSecGrouplist = [];
                        this.vpcSecGrouplist = [];
                        this.selectedsecgroup = this.defaultsecgroup;
                        this.showMsg("无虚拟VPC");
                        this.calculatePrice();
                    }

                    //this.getSecurityGroups(region);//网络类型一确定，就得去拿securitygroup数据                    

                }).catch((e) => this.onRejected(e));

        }



    }

    getSecurityGroups(region: RegionModel) {
        this.layoutService.show();
        this.service.getSecurityGroups(region.RegionId, this.selectedOrderVmPage)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                        //console.log(result, "SecurityGroups!");
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.securitygrouplist = result.SecurityGroups.SecurityGroup;
                    console.log(this.securitygrouplist, "this.securitygrouplist!");
                    if (this.securitygrouplist.length != 0) {
                        this.checkClassicNetworkSecGroups();
                        this.checkVpcNetworkSecGroups(this.selectedOrderVmPage.selectedVpcId);

                        //this.calculatePrice();
                    } else {
                        console.log("this.securitygrouplist.length = 0");
                        this.selectedsecgroup = this.defaultsecgroup;
                        this.selectedOrderVmPage.SecurityGroupId = null;
                        this.selectedOrderVmPage.SecurityGroupName = null;
                        this.showMsg("无安全组");
                    }
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
                console.log(vpc.VpcName, "---------------");
                this.service.getVSwitches(this.selectedOrderVmPage)
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
                            if (this.vswitchlist.length != 0) {
                                this.selectedVSwitch = this.vswitchlist[0];
                                this.selectedOrderVmPage.selectedVswitchId = this.selectedVSwitch.VSwitchId;
                                console.log(this.selectedOrderVmPage.selectedVswitchId, "selected VswitchId!");

                                this.calculatePrice();
                            } else {
                                console.log("this.vswitchlist.length = 0");
                                this.vswitchlist = [];
                                this.selectedVSwitch = this.defaultVSwitch;
                                this.selectedOrderVmPage.selectedVswitchId = null;
                                this.selectedOrderVmPage.selectedVpcId = "random";
                                this.showMsg("无虚拟交换机");
                            }
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
                this.selectedOrderVmPage.selectedVswitchId = null;
                this.vswitchlist = [];
                this.showMsg("无虚拟交换机");
            }

        }, 50); //window内的代码要延后50ms执行        

    }

    SecurityGroupChanged() {
        window.setTimeout(() => {
            this.selectedOrderVmPage.SecurityGroupId = this.selectedsecgroup.SecurityGroupId;
            if (this.selectedOrderVmPage.SecurityGroupId != "") {
                console.log(this.selectedOrderVmPage.SecurityGroupId, "selected SecurityGroupId!");
            } else {
                this.selectedOrderVmPage.SecurityGroupId = null;
            }
            console.log(this.selectedOrderVmPage.SecurityGroupId, "selected SecurityGroup!");
        }, 50); //window内的代码要延后50ms执行 

        this.calculatePrice();
    }

    checkClassicNetworkSecGroups() {
        this.classicSecGrouplist = [];
        this.vpcSecGrouplist = [];
        this.selectedsecgroup = this.defaultsecgroup;

        this.classicSecGrouplist = this.securitygrouplist.filter((item) => {
            return (item.VpcId == "");
        });
        console.log(this.classicSecGrouplist, "=== classic network secgroups");

        if (this.classicSecGrouplist.length != 0) {
            this.showClassicNetwork = true;

            this.selectedsecgroup = this.classicSecGrouplist[0];
            this.selectedOrderVmPage.SecurityGroupId = this.selectedsecgroup.SecurityGroupId;
            this.selectedOrderVmPage.SecurityGroupName = this.selectedsecgroup.SecurityGroupName;

            console.log(this.selectedOrderVmPage.SecurityGroupId, "selected SecurityGroupId!");
        } else {
            this.showClassicNetwork = false;

            console.log("this.class/vpc-securitygrouplist.length = 0 or don't fit to NetworkType!");
            this.selectedsecgroup = this.defaultsecgroup;
            this.selectedOrderVmPage.SecurityGroupId = null;
            this.selectedOrderVmPage.SecurityGroupName = null;
            //this.showMsg("无安全组");
            console.log("checkClassicNetworkSecGroups: no classic network secury group!");
        }
    }

    checkVpcNetworkSecGroups(vpcId: string) {
        this.classicSecGrouplist = [];
        this.vpcSecGrouplist = [];
        this.selectedsecgroup = this.defaultsecgroup;
        if (vpcId != null || vpcId != "") {
            this.vpcSecGrouplist = this.securitygrouplist.filter((item) => {
                return (item.VpcId == vpcId);
            });
            console.log(this.vpcSecGrouplist, "=== vpc network secgroups");
        } else {
            console.log("Can't filter security group by vpcId!");
        }

        if (this.vpcSecGrouplist.length != 0) {
            this.showVpcNetwork = true;

            this.selectedsecgroup = this.vpcSecGrouplist[0];

            this.selectedOrderVmPage.SecurityGroupId = this.selectedsecgroup.SecurityGroupId;
            this.selectedOrderVmPage.SecurityGroupName = this.selectedsecgroup.SecurityGroupName;
            console.log(this.selectedOrderVmPage.SecurityGroupId, "selected SecurityGroupId!");
        } else {
            this.showVpcNetwork = false;

            console.log("this.class/vpc-securitygrouplist.length = 0 or don't fit to NetworkType!");
            this.selectedsecgroup = this.defaultsecgroup;
            this.selectedOrderVmPage.SecurityGroupId = null;
            this.selectedOrderVmPage.SecurityGroupName = null;
            //this.showMsg("无安全组");
            console.log("checkVpcNetworkSecGroups: no vpc network secury group!");
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
        this.defaultOrderVmPage.selectedNetworkType = "vpc";
        //this.defaultOrderVmPage.AllocatePublicIP = false;
        this.defaultOrderVmPage.selectedVpcId = null;
        this.defaultOrderVmPage.selectedVswitchId = null;

        this.defaultOrderVmPage.SecurityGroupId = null;
        this.defaultOrderVmPage.SecurityGroupName = null;

        this.defaultOrderVmPage.selectedGeneration = null; //实例族
        this.defaultOrderVmPage.selectedInstanceFamily = null;
        this.defaultOrderVmPage.selectedInstanceType = null;
        this.defaultOrderVmPage.ioOptimized_price = null;
        this.defaultOrderVmPage.ioOptimized_vm = null;

        this.defaultOrderVmPage.selectedImage = null;　//启动ｖｍ时用的imageId,可能还需要镜像类型

        this.defaultOrderVmPage.selectedDisk = null;//云硬盘类型
        this.defaultOrderVmPage.diskCount = "40";//===云硬盘G数


        //this.defaultOrderVmPage.selectedQuantity = null; //购买量月份
        this.defaultOrderVmPage.vm_period = null;
        this.defaultOrderVmPage.price_period = null;
        this.defaultOrderVmPage.periodType = null;
        this.defaultOrderVmPage.priceUnit = null;
        this.defaultOrderVmPage.renew = null;  //"0"表示不自动续费，"1"表示自动续费


        this.defaultOrderVmPage.selectedInternetChargeType = "PayByTraffic"; //===带宽收费方式    
        this.defaultOrderVmPage.selectedInternetMaxBandwidthIn = null;
        this.defaultOrderVmPage.selectedInternetMaxBandwidthOut = 1;//===


        this.defaultOrderVmPage.areas = [];
        this.defaultOrderVmPage.LocalName = "";
        this.defaultOrderVmPage.RegionId = "";
        this.defaultOrderVmPage.selected = false;
        this.defaultOrderVmPage.price = "";
        this.defaultOrderVmPage.price_instance = "";
        this.defaultOrderVmPage.price_traffic = "";
        this.selectedOrderVmPage = this.defaultOrderVmPage;
    }

    AreaChanged(region: RegionModel) {
        window.setTimeout(() => {
            region.selectedArea = new AreaModel();
            region.selectedArea.LocalName = this.selectedOrderVmPage.selectedArea.LocalName;
            region.selectedArea.ZoneId = this.selectedOrderVmPage.selectedArea.ZoneId;
            region.selectedArea.AvailableDiskCategories = this.selectedOrderVmPage.selectedArea.AvailableDiskCategories;
            //console.log(region, this.selectedOrderVmPage, "After AreaChanged()!");
        }, 50); //window内的代码要延后50ms执行
        this.selectedOrderVmPage.selectedVpcId = this.selectedVPC.VpcId;
        this.VPCChanged();
    }

    DiskChanged() {
        window.setTimeout(() => {
            console.log(this.selectedOrderVmPage.selectedDisk, "selected selectedDisk!");
            if (this.selectedOrderVmPage.selectedDisk != "") {
                this.calculatePrice();
            } else {
                this.selectedOrderVmPage.selectedDisk = null;
            }
        }, 50); //window内的代码要延后50ms执行
    }

    DiskCountChanged() {
        if (this.selectedOrderVmPage.diskCount != "") {
            this.calculatePrice();
        } else {
            this.selectedOrderVmPage.diskCount = null;
        }
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
            if (this.selectedOrderVmPage.selectedImage != "") {
                this.calculatePrice();
            } else {
                this.selectedOrderVmPage.selectedImage = null;
            }
        }, 50); //window内的代码要延后50ms执行        
    }

    FormChanged() {
        window.setTimeout(() => {
            if (this.selectedImageFlatform == this.defaultImageFlatform) {
                this.selectedImageItem = this.defaultImageItem;
                this.selectedOrderVmPage.selectedImage = "";
            } else {
                this.selectedImageItem = this.selectedImageFlatform.images[0];
                this.selectedOrderVmPage.selectedImage = this.selectedImageItem.ImageId;
            }
            console.log(this.selectedImageItem, this.selectedOrderVmPage.selectedImage, " this.selectedImageItem and selected imageId!");
            if (this.selectedOrderVmPage.selectedImage != "") {
                //this.calculatePrice();
            } else {
                this.selectedOrderVmPage.selectedImage = null;
            }
        }, 50); //window内的代码要延后50ms执行   
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
                        this.selectedOrderVmPage.instanceShowName = this.instancetypes[0].instanceShowName;
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

    VPCChanged() {
        window.setTimeout(() => {
            this.selectedOrderVmPage.selectedVpcId = this.selectedVPC.VpcId;
            if (this.selectedOrderVmPage.selectedVpcId != "" || this.selectedVPC != this.defaultVPC) {
                this.layoutService.show();
                Promise.all([this.service.serviceGetVSwitches(this.selectedOrderVmPage), this.service.serviceGetSecurityGroups(this.selectedOrderVmPage.RegionId, this.selectedOrderVmPage)])
                    .then((arr) => {
                        this.layoutService.hide();

                        //VSwitches
                        let result;
                        try {
                            result = JSON.parse(arr[0]);
                        } catch (ex) {
                            console.log(ex);
                        }
                        this.vswitchlist = result.VSwitches.VSwitch;
                        console.log(this.vswitchlist, "this.vswitchlist!");
                        if (this.vswitchlist.length != 0) {
                            this.selectedVSwitch = this.vswitchlist[0];
                            this.selectedOrderVmPage.selectedVswitchId = this.selectedVSwitch.VSwitchId;
                            console.log(this.selectedOrderVmPage.selectedVswitchId, "selected VswitchId!");
                        } else {
                            console.log("this.vswitchlist.length = 0");
                            this.vswitchlist = [];
                            this.selectedVSwitch = this.defaultVSwitch;
                            this.selectedOrderVmPage.selectedVswitchId = null;
                            this.selectedOrderVmPage.selectedVpcId = "random";
                            this.showMsg("无虚拟交换机");
                        }


                        //SecurityGroups
                        result = null;
                        try {
                            result = JSON.parse(arr[1]);
                            //console.log(result, "SecurityGroups!");
                        } catch (ex) {
                            console.log(ex);
                        }
                        this.securitygrouplist = result.SecurityGroups.SecurityGroup;
                        console.log(this.securitygrouplist, "this.securitygrouplist!");
                        if (this.securitygrouplist.length != 0) {
                            /*
                            this.selectedsecgroup = this.securitygrouplist[0];
                            this.selectedOrderVmPage.SecurityGroupId = this.selectedsecgroup.SecurityGroupId;
                            this.selectedOrderVmPage.SecurityGroupName = this.selectedsecgroup.SecurityGroupName;
                            console.log(this.selectedOrderVmPage.SecurityGroupId, "selected SecurityGroupId!");
                            */
                            this.checkVpcNetworkSecGroups(this.selectedOrderVmPage.selectedVpcId);
                        } else {
                            console.log("this.securitygrouplist.length = 0");
                            this.selectedsecgroup = this.defaultsecgroup;
                            this.selectedOrderVmPage.SecurityGroupId = null;
                            this.selectedOrderVmPage.SecurityGroupName = null;
                            this.showMsg("无安全组");
                        }

                        this.calculatePrice();

                    }).catch((e) => this.onRejected(e));

            } else {
                //this.selectedOrderVmPage.selectedVpcId = null;
                this.selectedOrderVmPage.selectedVpcId = "random";
                this.vswitchlist = [];
                this.selectedVSwitch = this.defaultVSwitch;
                this.selectedOrderVmPage.selectedVswitchId = null;
            }
            console.log(this.selectedOrderVmPage.selectedNetworkType, this.selectedOrderVmPage.selectedVpcId, "selected NetworkType and VSwitchId!");
        }, 50); //window内的代码要延后50ms执行

    }

    VSwitchChanged() {
        window.setTimeout(() => {
            this.selectedOrderVmPage.selectedVswitchId = this.selectedVSwitch.VSwitchId;
            if (this.selectedOrderVmPage.selectedVswitchId != "") {
                console.log(this.selectedOrderVmPage.selectedVswitchId, "selected vswitch!");
                this.calculatePrice();
            } else {
                this.selectedOrderVmPage.selectedVswitchId = null;
                this.selectedOrderVmPage.selectedVpcId = "random";
            }
            console.log(this.selectedOrderVmPage.selectedNetworkType, this.selectedOrderVmPage.selectedVswitchId, "selected NetworkType and VSwitchId!");
        }, 50); //window内的代码要延后50ms执行
    }

    reNew() {
        this.selectedOrderVmPage.renew = !this.selectedOrderVmPage.renew;
        console.log(this.selectedOrderVmPage.renew, "selected renew!");

        this.calculatePrice();
    }

    SetClassicNetwork() {
        this.selectedOrderVmPage.selectedNetworkType = 'classic';
        console.log(this.selectedOrderVmPage.selectedNetworkType, "selected NetworkType!");

        //this.selectedOrderVmPage.AllocatePublicIP = true;
        this.selectedOrderVmPage.selectedInternetChargeType = "PayByBandwidth";
        this.selectedOrderVmPage.selectedInternetMaxBandwidthOut = 1;

        this.vswitchlist = [];
        this.selectedVSwitch = this.defaultVSwitch;
        this.selectedOrderVmPage.selectedVswitchId = null;

        this.securitygrouplist = [];
        this.classicSecGrouplist = [];
        this.vpcSecGrouplist = [];
        this.selectedsecgroup = this.defaultsecgroup;
        this.selectedOrderVmPage.SecurityGroupId = null;
        this.selectedOrderVmPage.SecurityGroupName = null;

        this.layoutService.show();
        this.service.getSecurityGroups(this.selectedOrderVmPage.RegionId, this.selectedOrderVmPage)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                        //console.log(result, "SecurityGroups!");
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.securitygrouplist = result.SecurityGroups.SecurityGroup;
                    console.log(this.securitygrouplist, "this.securitygrouplist!");
                    if (this.securitygrouplist.length != 0) {
                        /*
                        this.selectedsecgroup = this.securitygrouplist[0];
                        this.selectedOrderVmPage.SecurityGroupId = this.selectedsecgroup.SecurityGroupId;
                        this.selectedOrderVmPage.SecurityGroupName = this.selectedsecgroup.SecurityGroupName;

                        console.log(this.selectedOrderVmPage.SecurityGroupId, "selected SecurityGroupId!");
                        */

                        this.checkClassicNetworkSecGroups();
                        this.calculatePrice();
                    } else {
                        console.log("this.securitygrouplist.length = 0");
                        this.selectedsecgroup = this.defaultsecgroup;
                        this.selectedOrderVmPage.SecurityGroupId = null;
                        this.selectedOrderVmPage.SecurityGroupName = null;
                        this.showMsg("无安全组");
                    }
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    SetVpcNetwork() {
        this.selectedOrderVmPage.selectedNetworkType = 'vpc';
        console.log(this.selectedOrderVmPage.selectedNetworkType, "selected NetworkType!");

        this.vswitchlist = [];
        this.selectedVSwitch = this.defaultVSwitch;
        this.selectedOrderVmPage.selectedVswitchId = null;

        this.securitygrouplist = [];
        this.classicSecGrouplist = [];
        this.vpcSecGrouplist = [];
        this.selectedsecgroup = this.defaultsecgroup;
        this.selectedOrderVmPage.SecurityGroupId = null;
        this.selectedOrderVmPage.SecurityGroupName = null;

        //vpc网络时，默认无带宽配置
        //this.selectedOrderVmPage.AllocatePublicIP = false;
        this.selectedOrderVmPage.selectedInternetChargeType = "PayByBandwidth";
        this.selectedOrderVmPage.selectedInternetMaxBandwidthOut = 1;
        //console.log(this.selectedOrderVmPage.AllocatePublicIP, "selected AllocatePublicIP!");
        if (this.vpclist.length != 0) {
            this.selectedVPC = this.vpclist[0];
            this.selectedOrderVmPage.selectedVpcId = this.selectedVPC.VpcId;

            console.log(this.selectedOrderVmPage.selectedVpcId, "selected VpcId!");

            //first_check_classic_network = false;
            this.vpc_vswitch_secgroup();

        } else {
            console.log("this.vpclist.length = 0");
            this.selectedVPC = this.defaultVPC;
            //this.selectedOrderVmPage.selectedVpcId = null;
            this.selectedOrderVmPage.selectedVpcId = "random";

            this.vswitchlist = [];
            this.selectedVSwitch = this.defaultVSwitch;
            this.selectedOrderVmPage.selectedVswitchId = null;
            this.showMsg("无vpc网络，主机无法购买");
        }

    }

    vpc_vswitch_secgroup() {
        this.layoutService.show();
        Promise.all([this.service.serviceGetVSwitches(this.selectedOrderVmPage), this.service.serviceGetSecurityGroups(this.selectedOrderVmPage.RegionId, this.selectedOrderVmPage)])
            .then((arr) => {
                this.layoutService.hide();

                //VSwitches
                let result;
                try {
                    result = JSON.parse(arr[0]);
                } catch (ex) {
                    console.log(ex);
                }
                this.vswitchlist = result.VSwitches.VSwitch;
                console.log(this.vswitchlist, "this.vswitchlist!");
                if (this.vswitchlist.length != 0) {
                    this.selectedVSwitch = this.vswitchlist[0];
                    this.selectedOrderVmPage.selectedVswitchId = this.selectedVSwitch.VSwitchId;
                    console.log(this.selectedOrderVmPage.selectedVswitchId, "selected VswitchId!");
                } else {
                    console.log("this.vswitchlist.length = 0");
                    this.vswitchlist = [];
                    this.selectedVSwitch = this.defaultVSwitch;
                    this.selectedOrderVmPage.selectedVswitchId = null;
                    this.selectedOrderVmPage.selectedVpcId = "random";
                    this.showMsg("无虚拟交换机");
                }


                //SecurityGroups
                result = null;
                try {
                    result = JSON.parse(arr[1]);
                    //console.log(result, "SecurityGroups!");
                } catch (ex) {
                    console.log(ex);
                }
                this.securitygrouplist = result.SecurityGroups.SecurityGroup;
                console.log(this.securitygrouplist, "this.securitygrouplist!");
                if (this.securitygrouplist.length != 0) {
                    this.checkClassicNetworkSecGroups();
                    this.checkVpcNetworkSecGroups(this.selectedOrderVmPage.selectedVpcId);
                } else {
                    console.log("this.securitygrouplist.length = 0");
                    this.selectedsecgroup = this.defaultsecgroup;
                    this.selectedOrderVmPage.SecurityGroupId = null;
                    this.selectedOrderVmPage.SecurityGroupName = null;
                    this.showMsg("无安全组");
                }

                this.calculatePrice();

            }).catch((e) => this.onRejected(e));
    }

    showInternetChargeType() {
        console.log(this.selectedOrderVmPage.selectedInternetChargeType, "selected InternetChargeType!");
        this.calculatePrice();
    }

    validatePriceParam(): boolean {
        //console.log(JSON.stringify(this.selectedOrderVmPage));
        console.log(
                "selectedImage=", this.selectedOrderVmPage.selectedImage,
                "selectedQuantity=", this.selectedOrderVmPage.selectedQuantity,
                "selectedChargeType=", this.selectedOrderVmPage.selectedChargeType,
                "selectedNetworkType=", this.selectedOrderVmPage.selectedNetworkType,
                "selectedVpcId=", this.selectedOrderVmPage.selectedVpcId,
                "selectedVswitchId=", this.selectedOrderVmPage.selectedVswitchId,
                "selectedInternetChargeType=", this.selectedOrderVmPage.selectedInternetChargeType,
                "selectedDisk=", this.selectedOrderVmPage.selectedDisk,
                "diskCount=", this.selectedOrderVmPage.diskCount,
                "selectedGeneration=", this.selectedOrderVmPage.selectedGeneration,
                "selectedInstanceFamily=", this.selectedOrderVmPage.selectedInstanceFamily,
                "selectedInstanceType=", this.selectedOrderVmPage.selectedInstanceType,
            );

        if (this.selectedOrderVmPage.selectedImage != null)
        {
            console.log(this.selectedOrderVmPage.selectedImage);
        } else {
            console.log("never calculate price!");
            return false;
        }

        if (this.selectedOrderVmPage.selectedQuantity != null || this.selectedOrderVmPage.selectedChargeType == 'PostPaid')
        {
            console.log(this.selectedOrderVmPage.selectedQuantity, this.selectedOrderVmPage.selectedChargeType);
        } else {
            console.log("never calculate price!");
            return false;
        }

        if (this.selectedOrderVmPage.selectedNetworkType == "classic" || this.selectedOrderVmPage.selectedVpcId == 'random' || this.selectedOrderVmPage.selectedVswitchId != null)
        {
            console.log(this.selectedOrderVmPage.selectedNetworkType, this.selectedOrderVmPage.selectedVpcId, this.selectedOrderVmPage.selectedVswitchId);
        } else {
            console.log("never calculate price!");
            return false;
        }

        if (this.selectedOrderVmPage.selectedDisk != "null" && this.selectedOrderVmPage.selectedDisk != null && this.selectedOrderVmPage.diskCount != null)
        {
            console.log(this.selectedOrderVmPage.selectedDisk, this.selectedOrderVmPage.diskCount);
        } else {
            console.log("never calculate price!");
            return false;
        }

        if (this.selectedOrderVmPage.selectedGeneration != null &&
            this.selectedOrderVmPage.selectedInstanceFamily != null &&
            this.selectedOrderVmPage.selectedInstanceType != null)
        {
            console.log("start calculate price!");
            return true;
        } else {
            console.log("never calculate price!");
            return false;
        }

    }


    calculatePrice() {
        //*
        if (this.validatePriceParam()) {
            //this.selectedOrderVmPage.price = "计算中...";
            this.selectedOrderVmPage.price_instance = "计算中...";            
            if(this.selectedOrderVmPage.selectedInternetChargeType.toLowerCase() == "paybybandwidth" || 
            this.selectedOrderVmPage.selectedInternetMaxBandwidthOut == 0) {
                this.selectedOrderVmPage.price_traffic = null;
            } else {
                this.selectedOrderVmPage.price_traffic = "计算中...";
            }
            this.calculatetimer && window.clearTimeout(this.calculatetimer);
            this.calculatetimer = window.setTimeout(() => {
                this.layoutService.show();
                this.service.calculatePrice(this.selectedOrderVmPage)
                    .then(
                    response => {
                        this.layoutService.hide();
                        //console.log(response.resultContent);
                        if (response && 100 == response["resultCode"]) {
                            let result: Array<priceReturnModel> = response.resultContent;
                            //console.log(result);
                            if (this.selectedOrderVmPage.selectedInternetChargeType == null || this.selectedOrderVmPage.selectedInternetChargeType.toLowerCase() == "paybybandwidth") { //按固定带宽，只传一个instance-buy
                                let price_ins: Array<priceReturnModel> = result.filter((n) => { return (n.orderType == "instance-buy") });
                                //console.log(price_ins);
                                if (price_ins.length != 0) {
                                    console.log(price_ins);
                                    this.selectedOrderVmPage.price_instance = price_ins[0].tradeAmount;
                                    this.selectedOrderVmPage.price_traffic = null;
                                }
                            } else if (this.selectedOrderVmPage.selectedInternetChargeType.toLowerCase() == "paybytraffic") { //按量计费带宽，多传一个traffic-bandwidth
                                let price_ins: Array<priceReturnModel> = result.filter((n) => { return (n.orderType == "instance-buy") });
                                let price_traf: Array<priceReturnModel> = result.filter((n) => { return (n.orderType == "traffic-bandwidth") });
                                if (price_ins.length != 0 && price_traf.length != 0) {
                                    console.log(price_ins);
                                    console.log(price_traf);
                                    this.selectedOrderVmPage.price_instance = price_ins[0].tradeAmount;
                                    this.selectedOrderVmPage.price_traffic = price_traf[0].tradeAmount;
                                }
                            }
                            console.log(this.selectedOrderVmPage.price_traffic, this.selectedOrderVmPage.price_instance, "price!");
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
            //this.selectedOrderVmPage.price = "";
            this.selectedOrderVmPage.price_instance = "";
            if( this.selectedOrderVmPage.selectedInternetChargeType.toLowerCase() == "paybybandwidth" || 
            this.selectedOrderVmPage.selectedInternetMaxBandwidthOut == 0) {
                this.selectedOrderVmPage.price_traffic = null;
            } else {
                this.selectedOrderVmPage.price_traffic = "";
            }
            
        }
        //*/
    }

    validateBuyParam(): boolean {
        if (this.selectedOrderVmPage.selectedImage != null)
        {
            console.log(this.selectedOrderVmPage.selectedImage);
        } else {
            return false;
        }

        if (this.selectedOrderVmPage.selectedQuantity != null || this.selectedOrderVmPage.selectedChargeType == 'PostPaid')
        {
            console.log(this.selectedOrderVmPage.selectedQuantity, this.selectedOrderVmPage.selectedChargeType);
        } else {
            return false;
        }

        if (this.selectedOrderVmPage.selectedNetworkType == "classic" || this.selectedOrderVmPage.selectedVswitchId != null)
        {
            console.log(this.selectedOrderVmPage.selectedNetworkType, this.selectedOrderVmPage.selectedVpcId, this.selectedOrderVmPage.selectedVswitchId);
        } else {
            return false;
        }

        if (this.selectedOrderVmPage.selectedDisk != "null" && this.selectedOrderVmPage.selectedDisk != null && this.selectedOrderVmPage.diskCount != null)
        {
            console.log(this.selectedOrderVmPage.selectedDisk, this.selectedOrderVmPage.diskCount);
        } else {
            return false;
        }

        if (this.selectedOrderVmPage.selectedGeneration != null &&
            this.selectedOrderVmPage.selectedInstanceFamily != null &&
            this.selectedOrderVmPage.selectedInstanceType != null)
        {
            return true;
        } else {
            return false;
        }

    }

    buyNow() {
        console.log(this.selectedOrderVmPage, "selectedOrderVmPage Finally!!!");
        //this.calculatePrice();

        if(!this.validateBuyParam()) {
            this.showMsg("配置不正确！");
            return;
        }

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

    }


    outputValue(e: number) {
        this.selectedOrderVmPage.selectedInternetMaxBandwidthOut = e;
        console.log(this.selectedOrderVmPage.selectedInternetMaxBandwidthOut);
        if(this.selectedOrderVmPage.selectedInternetMaxBandwidthOut == 0) {
            this.selectedOrderVmPage.price_traffic = null;
        } else {
            this.selectedOrderVmPage.price_traffic = "";
        }
        this.calculatePrice();
    }

    slide(e) {
        console.log(e.target.value);
        this.calculatePrice();
    }

    goBack(e) {
        console.log(e);
    }

    show(mnum: QuantityModel) {
        console.log(mnum, "month button");
        this.calculatePrice();
    }

    showAndSetInstanceChargeType() {
        console.log(this.selectedOrderVmPage.selectedChargeType, "selected instance charge type!");
        if (this.selectedOrderVmPage.selectedChargeType == "PrePaid") {
            this.selectedOrderVmPage.selectedQuantity = 1;
            this.selectedOrderVmPage.priceUnit = 'Month';
            this.selectedOrderVmPage.periodType = 'Monthly';
            this.selectedOrderVmPage.renew = false;
        } else if (this.selectedOrderVmPage.selectedChargeType == "PostPaid") {
            this.selectedOrderVmPage.selectedQuantity = 1;
            this.selectedOrderVmPage.priceUnit = 'Hour';
            this.selectedOrderVmPage.periodType = 'Hourly';
            this.selectedOrderVmPage.renew = null;
        }
        this.calculatePrice();
    }

    showInstanceType() {
        console.log(this.selectedOrderVmPage.ioOptimized_price, this.selectedOrderVmPage.selectedInstanceType, "selected ioOptimized and instanceType!");
        this.calculatePrice();
    }

    setAndShowIO() {
        if (this.selectedOrderVmPage.selectedGeneration == "ecs-1") {
            this.selectedOrderVmPage.ioOptimized_price = false;
            this.selectedOrderVmPage.ioOptimized_vm = "none";
        } else {
            this.selectedOrderVmPage.ioOptimized_price = true;
            this.selectedOrderVmPage.ioOptimized_vm = "optimized";
        }
        console.log(this.selectedOrderVmPage.ioOptimized_price, this.selectedOrderVmPage.ioOptimized_vm, "selected ioOptimized!");
        console.log(this.selectedOrderVmPage.selectedInstanceType, "selected InstanceType!");
    }



    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            /*
			email: [this.email, [this.v.isEmail, this.v.isUnBlank], "Email输入不正确"], 
  			//验证email
			baseInput: [this.baseInput, [this.v.isBase, this.v.isUnBlank], "不能包含特殊字符"],
  			//两次验证[基础的验证不能包含特殊字符，不能为空]
			phone: [this.phone, [this.v.isMoblie, this.v.isUnBlank], "手机号码输入不正确"],
  			//手机号码验证
              */
            password: [this.selectedOrderVmPage.Password, [this.v.isAliCloudPassword, this.v.lengthRange(8, 16)], "密码输入不正确"],
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
        if (errorMessage) return alert(errorMessage);
        console.log("通过！");
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
        //this.notice.nof = of;
    }

    confirmAlert(msg: string, of?: any): void {
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
        this.confirmOKTitle = "返回主机列表页";
        this.confirmCancelTitle = "留在主机订购页";
    }

    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("COMMON.SYSTEM_PROMPT", msg);
    }

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

}