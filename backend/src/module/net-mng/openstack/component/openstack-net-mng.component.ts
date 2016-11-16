import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService, NoticeComponent, PaginationComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';


import { Network } from '../model/network.model';
import { Network_mock } from '../model/network.mock.model';
import { OpenstackService } from '../service/openstack.service';
import { CriteriaQuery } from '../model/criteria-query.model';
import { Region } from '../model/region.model';
import { DataCenter } from '../model/dataCenter.model';
import { PlatformInfo } from '../model/platformInfo.model';

@Component({
    selector: "openstack-net-mng",
    templateUrl: "../template/OpenStack-net-mng.html",
    styleUrls: [],
    providers: []
}
)
export class OpenstackNetMngComponent implements OnInit {

    constructor(
        private router: Router,
        private dicService: SystemDictionaryService,
        private service: OpenstackService,
        private layoutService: LayoutService
    ) {
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

    typeDic: Array<SystemDictionary>;//网络类型
    sharedDic: Array<SystemDictionary>;//是否共享
    stateDic: Array<SystemDictionary>;//运行状态
    statusDic: Array<SystemDictionary>;//状态

    queryOpt: CriteriaQuery = new CriteriaQuery();
    networks: Array<Network>;

    //地域列表
    regionList: Array<Region>;
    //数据中心列表
    dcList: Array<DataCenter>;
    //平台信息列表
    pfList: Array<PlatformInfo>;
    //当前选中的
    defaultRegion = new Region();
    selectedRegion: Region = this.defaultRegion;
    defaultDc = new DataCenter();
    selectedDc: DataCenter = this.defaultDc;
    defaultPlatform = new PlatformInfo();
    selectedPfi: PlatformInfo = this.defaultPlatform;

    selectedNetwork:Network;
    ngOnInit() {
        this.dicService.getItems("NETWORK", "TYPE")
            .then(
            (dic) => {
                this.typeDic = dic;
                return this.dicService.getItems("NETWORK", "SHARED");
            })
            .then((dic) => {
                this.sharedDic = dic;
                return this.dicService.getItems("NETWORK", "STATE");
            })
            .then((dic) => {
                this.stateDic = dic;
                return this.dicService.getItems("NETWORK", "STATUS");
            })
            .then((dic) => {
                this.statusDic = dic;
                this.getNetworkList();
                this.getOptionInfo();
            });
    }

    getNetworkList(pageIndex?): void {
        this.pageIndex = pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getNetworks(this.queryOpt, this.pageIndex, this.pageSize)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.networks = response.resultContent;
                    this.totalPage = response.pageInfo.totalPage;
                } else {
                    alert("Res sync error");

                }
            }
            )
            .catch((e) => this.onRejected(e));
    }
    search() {
        this.queryOpt = new CriteriaQuery();
        this.queryOpt.region = this.selectedRegion.id;
        this.queryOpt.dataCenter = this.selectedDc.id;
        this.queryOpt.platformId = this.selectedPfi.id;
        this.getNetworkList();
        this.pager.render(1);
    }
    isSelected(flag:boolean):String{
        if(flag){
            return "是";
        }else{
            return "否";
        }

    }
    selectNetwork(network:Network){
        this.networks.forEach((e)=>{e.selected = false});
        network.selected = true;
        this.selectedNetwork = network;
    }
    //启用网络
    networkStart(){

        this.noticeTitle = "启用网络";
        this.noticeMsg = `您选择启用 '${this.selectedNetwork.subnetName}?'网络，其网段为${this.selectedNetwork.segmentCIDR}?' ， 
                        请确认；如果确认，用户将能够在订购中选择此网络。`
         
        //  if(!this.selectedNetwork.selected){
        //     this.showAlert("请先选中一个网络");
        //  }
         //如果运行状态不是运行中的，则不能启用此网络
         //检测是否是运行中
         //state 1-运行中;2-未知;3-停止
        if(this.selectedNetwork.state == '1'){
            this.confirm.ccf = () => {
            };
            this.confirm.cof = () => {
                this.service.networkStart(this.selectedNetwork.id)
                    .then(
                        response => {
                            this.layoutService.hide();
                            if (response && 100 == response["resultCode"]) {
                                this.showAlert("启用成功");
                            } else {
                                alert("Res sync error");
                            }
                        }
                    )
                .catch((e) => this.onRejected(e));
            }
            this.confirm.open();
         }else{
            this.showAlert("未处于运行状态不能启用");
        }
    }
    //禁用网络
    networkStop(){

        this.noticeTitle = "禁用网络";
        this.noticeMsg = `您选择禁用 '${this.selectedNetwork.subnetName}?'网络，其网段为${this.selectedNetwork.segmentCIDR}?' ， 
                        请确认；如果确认，用户将不能够在订购中选择此网络。`
        if(this.selectedNetwork.status!='3'){
            this.confirm.ccf = () => {
            };
            this.confirm.cof = () =>{
                this.service.networkStop(this.selectedNetwork.id)
                    .then(
                        response => {
                            this.layoutService.hide();
                            if (response && 100 == response["resultCode"]) {
                                this.showAlert("禁用成功");
                            } else {
                                alert("Res sync error");
                            }
                        }
                    )
                .catch((e) => this.onRejected(e));
            
            }
            this.confirm.open();
        }else{
            this.showAlert("该网络已处于禁用状态");
        }
    }

    //根据value获取字典的txt
    getDicText(value: string, dic: Array<SystemDictionary>): String {
        if (!$.isArray(dic)) {
            return value;
        }
        const d = dic.find((e) => {
            return e.value == value;
        });
        if (d) {
            return d.displayValue;
        } else {
            return value;
        }

    }


    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }
    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }


    getOptionInfo(): void {
        this.layoutService.show();
        this.service.getOptionInfo()
            .then(
            response => {
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.regionList = response.resultContent;
                } else {
                    alert("Res sync error");

                }
            }
            )
    }


    getSynNetworkPage(){
        let platform_id = this.selectedPfi.id;
        console.log("选中的platform_id：" + platform_id);
        if(platform_id==""&&!platform_id){
            this.showAlert("请先选则平台");
        }else{
            this.router.navigate(['net-mng/openstack/openstack-synchr-net', {"platform_id": platform_id}]);
        }
    }
}