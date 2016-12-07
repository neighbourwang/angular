import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { RestApi, RestApiCfg, LayoutService,PopupComponent, NoticeComponent, ValidationService, PaginationComponent, ConfirmComponent, SystemDictionaryService, SystemDictionary } from '../../../../architecture';


import { Network } from '../model/network.model';
import { Network_mock } from '../model/network.mock.model';
import { OpenstackService } from '../service/openstack.service';
import { CriteriaQuery } from '../model/criteria-query.model';
import { Region } from '../model/region.model';
import { DataCenter } from '../model/dataCenter.model';
import { PlatformInfo } from '../model/platformInfo.model';
import { Tenant } from'../model/tenant.model';
import { SelectedTenantListService } from '../service/selected-tenant-list.service';
@Component({
    selector: "openstack-net-mng",
    templateUrl: "../template/OpenStack-net-mng.html",
    styleUrls: [],
    providers: [SelectedTenantListService]
}
)
export class OpenstackNetMngComponent implements OnInit {

    constructor(
        private router: Router,
        private dicService: SystemDictionaryService,
        private service: OpenstackService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private tenantService: SelectedTenantListService
    ) {
    }
    @ViewChild("pager")
    pager: PaginationComponent;

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("synEnts")
    synEnts: PopupComponent;

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

    selectedNetwork:Network = new Network();
    editNetwork:Network;
    //所有企业
    tenants:Array<Tenant>;
    //选择的要同步的企业
    selectedEntList:Array<string>;
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
                //this.getNetworkList();
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
                    this.selectedNetwork= new Network();
                } else {
                    alert("Res sync error");

                }
            }
            )
            .catch((e) => this.onRejected(e));
    }
    search1() {
        let tenantName = this.queryOpt.tenantName;
        this.queryOpt = new CriteriaQuery();
        this.queryOpt.region = this.selectedRegion.region;
        this.queryOpt.dataCenter = this.selectedDc.dcName;
        this.queryOpt.platformId = this.selectedPfi.platformId;
        this.getNetworkList();
        this.pager.render(1);
    }
    search2() {
        let tenantName = this.queryOpt.tenantName;
        this.queryOpt = new CriteriaQuery();
        this.queryOpt.region = this.selectedRegion.region;
        this.queryOpt.dataCenter = this.selectedDc.dcName;
        this.queryOpt.platformId = this.selectedPfi.platformId;
        this.queryOpt.tenantName = tenantName;
        this.getNetworkList();
        this.pager.render(1);
    }

    resetQueryOpt() {
        // this.selectedRegion = this.defaultRegion;
        // this.selectedDc = this.defaultDc;
        // this.selectedPfi = this.defaultPlatform;
        //this.queryOpt = new CriteriaQuery();
        this.queryOpt.tenantName = "";
        //this.getNetworkList();
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

       
        if(!this.selectedNetwork || !this.selectedNetwork.id){
            this.showAlert("请先选中一个网络");
        }else{
            this.noticeTitle = "启用网络";
            this.noticeMsg = `您选择启用 '${this.selectedNetwork.subnetName}?'网络，其网段为${this.selectedNetwork.segmentCIDR}?' ， 
                        请确认；如果确认，用户将能够在订购中选择此网络。`
         
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
                                //this.layoutService.hide();
                                if (response && 100 == response["resultCode"]) {
                                    this.showAlert("启用成功");
                                    this.getNetworkList();
                                    this.selectedNetwork= new Network();
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
    }
    //禁用网络
    networkStop(){
        //console.log("this.selectedNetwork.id="+this.selectedNetwork.id);
        if(!this.selectedNetwork || !this.selectedNetwork.id){
            this.showAlert("请先选中一个网络");
        }else{
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
                                //this.layoutService.hide();
                                if (response && 100 == response["resultCode"]) {
                                    this.showAlert("禁用成功");
                                    this.getNetworkList();
                                    this.selectedNetwork= new Network();
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

//选择企业
    getTenants(){
         let platform_id = this.selectedPfi.platformId;
        //let platformName = this.selectedNetwork.platformName;
        console.log("选中的platform_id：" + platform_id);
        
        if(this.selectedPfi==this.defaultPlatform || !platform_id || platform_id == ""){
            this.showAlert("请先选则平台");
        }else{
           
            this.service.getTenants( this.selectedPfi.platformId)
                .then(
                    response =>{
                        if(response && 100 == response["resultCode"]){
                            this.tenants = response.resultContent;
                            this.synEnts.open("请选择需要同步的企业");
                        } else{
                            alert("Res.sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        }
    }
   //同步企业选择弹出框
    createSynTeOption(){
        
        this.getTenants();
        
    }
    

    //进入同步页面
    commitSynTe(){
        let tlist:Array<Tenant> = new Array<Tenant>();
        this.tenants.forEach((t)=>
            {
                if(t.selected){
                    tlist.push(t);
                }
            });
        if(tlist && tlist.length>0){
            this.tenantService.setList(tlist);
            this.router.navigate(['net-mng/openstack/openstack-synchr-net', {"platform_id": this.selectedPfi.platformId,"platformName":this.selectedPfi.platformName}]);
        }else{

        }
    }
    cancelCommitSynTe(){
        
    }
//
    // getSynNetworkPage(){
    //     let platform_id = this.selectedNetwork.platformId;
    //     let platformName = this.selectedNetwork.platformName;
    //     console.log("选中的platform_id：" + platform_id);
    //     if(!platform_id || platform_id==""){
    //         this.showAlert("请先选则平台");
    //     }else{
    //         this.router.navigate(['net-mng/openstack/openstack-synchr-net', {"platform_id": platform_id,"platformName":platformName}]);
    //     }
    // }

    openEidtPanel(network:Network): void {
        this.closeEditPanel();
        let cNetwork = new Network();
        cNetwork.subnetDisplayName = network.subnetDisplayName;
        cNetwork.selected = true;//network.selected;
        cNetwork.id = network.id;
        cNetwork.tenantName = network.tenantName;
        cNetwork.networkName = network.networkName;
        cNetwork.subnetName = network.subnetName;
        cNetwork.segmentCIDR = network.segmentCIDR;
        cNetwork.gateway  = network.gateway;
        cNetwork.networkType = network.networkType;
        cNetwork.shared = network.shared;
        cNetwork.state = network.state;
        cNetwork.status = network.status
        cNetwork.region = network.region;
        cNetwork.dataCenter = network.dataCenter;
        cNetwork.platformId = network.platformId;
        cNetwork.platformName = network.platformName;
        this.editNetwork = cNetwork;
    }
    //关闭所有的弹出窗口
    closeEditPanel() {
        this.networks.map((net) => {
            net.nameEditing = false;
        });
    }
    updateSubnetDisplayName(network:Network){
        this.layoutService.show();
        if (this.validationService.isBlank(this.editNetwork.subnetDisplayName)) {
            this.showAlert("名称不能为空");
            return;
        }
        this.service.updateSubName(this.editNetwork)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    let cNetwork = this.editNetwork;
                    network.subnetDisplayName = cNetwork.subnetDisplayName;
                    network.selected = cNetwork.selected;
                    network.id = cNetwork.id;
                    network.tenantName = cNetwork.tenantName;
                    network.networkName = cNetwork.networkName;
                    network.subnetName = cNetwork.subnetName;
                    network.segmentCIDR = cNetwork.segmentCIDR;
                    network.gateway  = cNetwork.gateway;
                    network.networkType = cNetwork.networkType;
                    network.shared = cNetwork.shared;
                    network.state = cNetwork.state;
                    network.status = cNetwork.status
                    network.region = cNetwork.region;
                    network.dataCenter = cNetwork.dataCenter;
                    network.platformId = cNetwork.platformId;
                    network.platformName = cNetwork.platformName;
                    network.nameEditing = false;

                    this.selectedNetwork = this.editNetwork;
                }else{
                    alert("Res sync error");
                }
            }).catch((e) => this.onRejected(e));
    }
}