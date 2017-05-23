import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { NgForm } from "@angular/forms";

import {
    LayoutService, NoticeComponent, ConfirmComponent, CountBarComponent,
    PaginationComponent, PopupComponent, SystemDictionary
} from "../../../../architecture";

import { StaticTooltipComponent } from "../../../../architecture/components/staticTooltip/staticTooltip.component";

//Model
import { RegionModel, keysecretModel, AreaModel } from "../../cloud-disk/model/cloud-disk.model";
import { instanceListModel, VmQueryObject, FloatingIPAddressModel, 
    TagsModel, KeyPairsModel, GraphItem, LineChart, chartColors } from "../model/cloud-vm.model";

//Service
import { AliCloudDiskService } from "../../cloud-disk/service/cloud-disk.service";
//import { AliCloudDiskDictService } from "../../cloud-disk/service/cloud-disk-dict.service";
import { AliCloudVMDictService } from "../service/cloud-vm-dict.service";
import { AliCloudVmService } from "../service/cloud-vm.service";


@Component({
    selector: "alics_vmdetail",
    templateUrl: "../template/cloud-vm-detail.html",
    styleUrls: ["../../cloud-disk/style/cloud-disk.less"],
    providers: []
})
export class AliCloudVmDetailComponent implements OnInit {
    constructor(
        private layoutService: LayoutService,
        private router: Router,
        private service: AliCloudVmService,
        private dictService: AliCloudVMDictService,
        private commonService: AliCloudDiskService,
        private activatedRouter: ActivatedRoute,

    ) {
    }

    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("restartvm")
    restartvm: PopupComponent;

    @ViewChild("allocateip")
    allocateip: PopupComponent;

    @ViewChild("unallocateip")
    unallocateip: PopupComponent;

    @ViewChild("remotecontrolvm")
    remotecontrolvm: PopupComponent;


    noticeTitle = "";
    noticeMsg = "";

    confirmTitle = "";
    confirmMsg = "";

    remoteUrl: string = "";

    pageIndex:number = 1;
    pageSize:number = 10;
    totalPage:number = 1;

    hours: Array<string> = ['00','01','02','03','04','05','06','07','08','09','10',
                           '11','12','13','14','15','16','17','18','19','20','21','22','23'];

    mins: Array<string> = ['00','01','02','03','04','05','06','07','08','09','10',
                           '11','12','13','14','15','16','17','18','19','20',
                           '21','22','23','24','25','26','27','28','29','30',
                           '31','32','33','34','35','36','37','38','39','40',
                           '41','42','43','44','45','46','47','48','49','50',
                           '51','52','53','54','55','56','57','58','59'];    

    startTime:string = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    endTime:string = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();

    startHour: string = "00";
    startMin: string = "00";
    endHour: string = "01";
    endMin: string = "00";

    xchart:string = "cpu";

    menu1open:boolean = true;
    menu2open:boolean = false;
    menu3open:boolean = false;

    regionId: string = "";
    instanceId: string = "";
    queryObject: VmQueryObject = new VmQueryObject();
    instance: instanceListModel = new instanceListModel();

    tags: TagsModel = new TagsModel();
    keypairs: KeyPairsModel = new KeyPairsModel();

    cpuList: Array<GraphItem> = [];
    netList: Array<GraphItem> = [];
    cpuChart = new LineChart();
    netChart = new LineChart();

    regions: Array<RegionModel> = [];
    defaultRegion: RegionModel = new RegionModel();
    choosenRegion: RegionModel = this.defaultRegion;

    allinstances: Array<instanceListModel> = [];
    instances: Array<instanceListModel> = [];
    selectedInstance: instanceListModel = new instanceListModel();
    changedInstance: instanceListModel = new instanceListModel();

    freeips: Array<FloatingIPAddressModel> = [];
    defaultfreeip: FloatingIPAddressModel = new FloatingIPAddressModel();
    selectedfreeip: FloatingIPAddressModel = this.defaultfreeip;

    vmips: Array<FloatingIPAddressModel> = [];
    defaultvmip: FloatingIPAddressModel = new FloatingIPAddressModel();
    selectedvmip: FloatingIPAddressModel = this.defaultvmip;

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
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["regionId"] != null) {
                this.regionId = params["regionId"];
                console.log(this.regionId);
            } else {
                console.log("No regionId!");
                return;
            }
            if (params["instanceId"] != null) {
                this.instanceId = params["instanceId"];
                console.log(this.instanceId);
            } else {
                console.log("No instanceId!");
                return;
            }
        });

        this.getKeySecret();
        
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
                    
                    this.getInstance();
                    this.getInstanceKeypairTags();
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    getInstance() {
        this.queryObject.keyword = this.instanceId;
        this.queryObject.criteria = "instance_ids";
        this.layoutService.show();
        this.service.getInstanceList(1, 100, this.regionId, this.queryObject)  //这个不应该给出pageIndex和pageSize
            .then(
            response => {
                this.layoutService.hide();
                //console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);
                        console.log(result, "result!");
                    } catch (ex) {
                        console.log(ex);
                    }
                    this.instance = result.Instances.Instance[0];
                    console.log(this.instance, "instance!");

                    if(this.instance.Status=="Running") {
                        this.getInstanceMonitorData();
                    } else {
                        console.log("该云主机未运行,所以无监控数据");
                        return;

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

    getInstanceKeypairTags() {
        this.layoutService.show();
        this.service.getInstanceKeypairTags(this.regionId, this.instanceId)  //这个不应该给出pageIndex和pageSize
            .then(
            response => {
                this.layoutService.hide();
                console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    
                    this.tags = response.resultContent.Tags;
                    this.keypairs = response.resultContent.KeyPairs;
                    console.log(this.tags, this.keypairs, "tags, keypairs!");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });

    }

    
    getInstanceMonitorData() {
        //let startTime:string = "2017-05-21T10:17:00Z";
        //let endTime:string = "2017-05-21T11:17:00Z";
        let start = "";
        let end = "";
        let utcstart = "";
        let utcend = "";
        start =this.startTime + " " + this.startHour + ":" + this.startMin;
        end = this.endTime + " " + this.endHour + ":" + this.endMin;
        console.log(start, end, "start and end!");
        utcstart = (new Date(start)).toUTCString();
        utcend = (new Date(end)).toUTCString();
        console.log(utcstart, utcend, "start2 and end2!");
        let period:string = "60";

        if(start >= end) {
            console.log("startTime>endTime!");
            this.showMsg("请选择正确的时间段");
            return;
        }


        this.layoutService.show();
        this.service.getInstanceMonitorData(this.instanceId, utcstart, utcend, period)
            .then(
            response => {
                this.layoutService.hide();
                console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    let result;
                    try {
                        result = JSON.parse(response.resultContent);//////////////////////////////////
                        console.log(result, "result!");
                    } catch (ex) {
                        console.log(ex);
                    }

                    this.cpuList = result.MonitorData.InstanceMonitorData;
                    this.netList = result.MonitorData.InstanceMonitorData;

                    this.cpuChart.SourceData = this.cpuList;
                    this.netChart.SourceData = this.netList;

                    this.getGraphData(this.cpuChart);
                    this.getGraphData(this.netChart);

                } else if(400 == response["resultCode"]) {
                    this.showMsg("目前没有监控数据");
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
            

    }

    //将源数据转化成折线图数据格式
    getGraphData(chart: LineChart) {
        //获取_data
        let temp_value1 = new Array<number>();
        let temp_value2 = new Array<number>();
        let temp_time = new Array<any>();
        let max_value = 0;
        chart.SourceData.forEach((s)=>{
            

            if (chart == this.cpuChart) {
                if(max_value < s.CPU) {
                    max_value = s.CPU;
                }
                temp_value1.push(s.CPU);
                temp_time.push((new Date(s.TimeStamp)).toLocaleString().slice(-11, -6));
            } else if(chart == this.netChart){
                if(max_value < s.IntranetRX) {
                    max_value = s.IntranetRX;
                }
                if(max_value < s.IntranetTX) {
                    max_value = s.IntranetTX;
                }
                temp_value1.push(s.IntranetRX);
                temp_value2.push(s.IntranetTX);
                temp_time.push((new Date(s.TimeStamp)).toLocaleString().slice(-11, -6));
            }
            
        })
        chart._data = temp_value1;
        chart.Labels = temp_time;
        
        let _label = "";
        if (chart == this.cpuChart) {
            _label = "CPU使用率";
            chart.DataSets = [
                {
                    data: chart._data,
                    label: _label,
                    borderWidth: 2,
                    pointBorderWidth: 0,
                    pointRadius: 1,
                    pointHoverRadius: 3,
                    fill: false
                }];
            chart.Colors = [
            { 
                backgroundColor: chartColors.lineBg,
                borderColor: chartColors.lineBorder,
                pointBackgroundColor: chartColors.linePointBg,
                pointBorderColor: chartColors.linePointBorder,
                pointHoverBackgroundColor: chartColors.linePointHoverBg,
                pointHoverBorderColor: chartColors.linePointHoverBorder
            }
        ];

        chart.options={                    
                        scales: {
                            xAxes: [{
                                display: true,
                                ticks: {
                                    //maxRotation:0,
                                    maxTicksLimit: 10
                                    /* 
                                    userCallback: function(dataLabel, index) {
                                        return index % Math.ceil(chart.SourceData.length/10) === 0 ? dataLabel : '';
                                    }*/
                                }
                            }],
                            yAxes: [{
                                display: true,
                                 ticks: {
                                    min: 0,
                                    suggestedMax: max_value?Math.ceil(max_value/10)*10 : 10
                                    //suggestedMax: 50
                                },
                                beginAtZero: true
                            }]
                        }
                    }
        } else {
            //_label = "网络使用率";
            chart.DataSets = [
                {
                    data: temp_value1,
                    label: "入网kbps",
                    borderWidth: 2,
                    pointBorderWidth: 0,
                    pointRadius: 1,
                    pointHoverRadius: 3,
                    fill: false
                },
                {
                    data: temp_value2,
                    label: "出网kbps",
                    borderWidth: 2,
                    pointBorderWidth: 0,
                    pointRadius: 1,
                    pointHoverRadius: 3,
                    fill: false
                },

            ];
            chart.Colors = [
            { 
                backgroundColor: chartColors.lineBg,
                borderColor: chartColors.lineBorder1,
                pointBackgroundColor: chartColors.linePointBg,
                pointBorderColor: chartColors.linePointBorder,
                pointHoverBackgroundColor: chartColors.linePointHoverBg,
                pointHoverBorderColor: chartColors.linePointHoverBorder
            },
            { 
                backgroundColor: chartColors.lineBg,
                borderColor: chartColors.lineBorder2,
                pointBackgroundColor: chartColors.linePointBg,
                pointBorderColor: chartColors.linePointBorder,
                pointHoverBackgroundColor: chartColors.linePointHoverBg,
                pointHoverBorderColor: chartColors.linePointHoverBorder
            },

        ];

        chart.options={                    
                        scales: {
                            xAxes: [{
                                display: true,
                                ticks: {
                                    //maxRotation:0, 
                                    maxTicksLimit: 10
                                    /*userCallback: function(dataLabel, index) {
                                        return index % Math.ceil(chart.SourceData.length/10) === 0 ? dataLabel : '';
                                    }*/
                                }
                            }],
                            yAxes: [{
                                display: true,
                                 ticks: {
                                    min: 0,
                                    suggestedMax: max_value?Math.ceil(max_value/50)*50 : 50
                                    //suggestedMax: 50
                                },
                                beginAtZero: true
                            }]
                        }
                    } 
        }

        chart.ChartType= "line";
        

     
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

    goVMListPage() {
        this.router.navigate([`ali-cloud-service/cloud-vm/cloud-vm-list`]);
    }


    openMenu(menu: number){
        switch (menu) {
            case 1:
                this.menu1open=true;
                break;
            case 2:
                this.menu2open=true;
                break;
            default:
                this.menu3open=true;
                break;
        }

    }

    closeMenu(menu: number){
        switch (menu) {
            case 1:
                this.menu1open=false;
                break;
            case 2:
                this.menu2open=false;
                break;
            default:
                this.menu3open=false;
                break;
        }

    }

    displayKeyPairs(keypairs: KeyPairsModel):string {
        let displayString = " ";
        if(keypairs.KeyPair.length!=0) {
            keypairs.KeyPair.map((item)=> {
                displayString += (item.KeyPairName + " : " + item.KeyPairFingerPrint) + " </br>";
            });
        }
        return displayString;

    }

    displayTags(tags: TagsModel):string {
        let displayString = " ";
        if(tags.Tag.length!=0) {
            tags.Tag.map((item)=> {
                displayString += (item.TagKey + " : " + item.TagValue) + " </br>";
            });
        }
        return displayString;

    }

    StartDateChange($event) {
        this.startTime=$event.formatted;
        console.log(this.startTime, "startTime!");
    }

    EndDateChange($event) {
        this.endTime=$event.formatted;
        console.log(this.endTime, "endTime!");
    }

    freshPage() {
        console.log(this.startTime, this.startHour, this.startMin, this.endTime, this.endHour, this.endMin);

        if(this.instance.Status!="Running") {
            this.showMsg("该云主机未运行");
            return;
        }
        
        if((this.startTime!=null && this.startTime!="")
        && this.startHour != "" && this.startMin != ""
        && (this.startHour!=null || this.startHour=="00")
        && (this.startMin!=null || this.startMin=="00")
        && (this.endTime!=null && this.endTime!="")
        && this.endHour != "" && this.endMin != ""
        && (this.endHour!=null || this.endHour=="00") 
        && (this.endMin!=null || this.endMin=="00")) {
            this.getInstanceMonitorData();
        } else {
            this.showMsg("请选择正确的时间段");
            return;
        }

        
    }

    remoteToInstance() {
        this.layoutService.show();
        this.service.remoteControlInstance(this.regionId, this.instance)
            .then(
            response => {
                this.layoutService.hide();
                this.showMsg("远程控制台Url, 有效时间为15秒，请尽快输入密码登陆！");
                console.log(response, "response!");
                if (response && 100 == response["resultCode"]) {
                    console.log(this.remoteUrl, "remoteUrl!");
                    this.remoteUrl = response.resultContent;
                    window.open(this.remoteUrl);
                } else {
                    this.showMsg("COMMON.GETTING_DATA_FAILED");
                    return;
                }
            })
            .catch((e) => {
                this.onRejected(e);
            });
    }

    deleteInstance() {
        if (this.instance) {
            if(this.instance.Status != "Stopped") {
                console.log("can't remoteToInstance");
                return;
            }    
            this.confirmTitle = "释放实例";
            this.confirmMsg = "释放实例：" + this.instance.InstanceId;
            this.confirm.cof = () => { };
            this.confirm.ccf = () => {
                this.layoutService.show();
                this.service.deleteInstance(this.instance)
                    .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            //this.showAlert("释放实例成功！");
                            this.goVMListPage();
                        } else {
                            if (403 == response["resultCode"]) {
                                let result;
                                try {
                                    result = JSON.parse(response.resultContent);
                                    console.log(result, "result!");
                                } catch (ex) {
                                    console.log(ex);
                                }
                                this.showAlert(response["resultCode"] + ": " + result.Message);
                            } else {
                                this.showAlert("COMMON.OPERATION_ERROR");
                            }
                        }
                    })
                    .catch((e) => this.onRejected(e));
            };
            this.confirm.open();
        } else {
            this.showAlert("请选择实例");
            return;
        }
    }
    
}