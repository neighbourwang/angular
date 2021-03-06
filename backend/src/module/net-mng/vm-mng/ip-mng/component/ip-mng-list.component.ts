import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from 'ng2-translate';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, ValidationService } from '../../../../../architecture';

//model 
import { IpMngModel } from '../model/ip-mng.model';
import { subnetModel, subnetInfoModel } from '../model/subnet.model';
import { subnetIpModel } from '../model/subnet-ip.model';
import { DCModel, ClusterModel } from '../model/dccluster.model';

//service
import { IpMngListService } from '../service/ip-mng-list.service';
import { IPValidationService } from '../../../vm-mng-index/service/validation.service';
import { selectedPlatform } from "../../../vm-mng-index/service/platform.service";

@Component({
    selector: 'ip-mng-list',
    templateUrl: '../template/ip_addr_mng.html',
    styleUrls: [],
    providers: [
        IpMngListService,
        IPValidationService
    ]
})

export class IpMngListComponent implements OnInit{

    constructor(
        private router : Router,
        private service : IpMngListService,
        private layoutService : LayoutService,
        private validationService: ValidationService,
        private ipService: IPValidationService,
        private activatedRouter: ActivatedRoute,
        private translateService: TranslateService
    ){
/*
        if (activatedRouter.snapshot.params["pg_id"]) {
            this.dc = activatedRouter.snapshot.params["pg_id"] || "";
        } else {
            this.dc = "pg_all";
        }
*/
    }

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("subnetbox")
    subnetbox: PopupComponent;

    @ViewChild("ipsbox")
    ipsbox: PopupComponent;
	
	noticeTitle = "";
    noticeMsg = "";

    selectedPlatform = selectedPlatform;

    platformId: string = "";

    defaultDC: DCModel = new DCModel();
    selectedDC: DCModel = this.defaultDC; //当前选中的DC
    defaultVDS: ClusterModel = new ClusterModel();
    selectedVDS: ClusterModel = this.defaultVDS;//当前选中的可用区
    dcList: Array<DCModel>;

    rawipmngs: Array<IpMngModel>;
    ipmngs: Array<IpMngModel>;
    selectedipmng: IpMngModel = new IpMngModel();
    pg: IpMngModel = new IpMngModel();

    subn: subnetModel = new subnetModel();
    ippool: subnetIpModel = new subnetIpModel();
    subnetInfo: subnetInfoModel = new subnetInfoModel();

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



    ngOnInit (){
        console.log('init');
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["dc_Id"] != null) {
                this.selectedDC.dcId = params["dc_Id"];                
                console.log(this.selectedDC.dcId, "this.selectedDC.dcId");
            }
            if (params["cls_Id"] != null) {
                this.selectedVDS.clusterId = params["cls_Id"];
                console.log(this.selectedVDS.clusterId, "this.selectedVDS.clusterId");
            }
            if (params["pid"] != null) {
                this.platformId = params["pid"];
                console.log(this.platformId, "this.platformId");
            }
        });
        this.getDcList();
        this.getIpMngList();
    }

    getDcList() {
        this.layoutService.show();
        this.service.getDCList(this.platformId)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.dcList = response["resultContent"];
                        console.log(this.dcList, "DCList");
                    } else {
                        //this.showAlert("COMMON.OPERATION_ERROR");
                        this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    filter(): void {
        this.ipmngs = this.rawipmngs.filter((item)=>{
            return ( this.selectedVDS.clusterId == "" || item.clusterId == this.selectedVDS.clusterId ) &&
            ( this.selectedDC.dcId == "" || item.dcId == this.selectedDC.dcId )
        });
        this.selectedDC=this.defaultDC;
        this.selectedDC.dcId='';
        this.selectedVDS=this.defaultVDS;
        this.selectedVDS.clusterId='';
        console.log(this.ipmngs, "IPmngS --- filter");
        this.UnselectItem();
    }

    getIpMngList(): void {
        this.layoutService.show();
        this.service.getIpMngList(this.platformId)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.rawipmngs = response.resultContent;
                    this.filter();
                    //console.log(this.ipmngs, "IPmngS --- getIpMngList");
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            })
            .catch((e) => this.onRejected(e));
    }

    //Menu: 设置IP子网
    setupSubnet(): void {
        console.log('conponent: net-mng/vm-mng/ip-mng-list/subnet');
        this.pg = this.getSelected();
         if (this.pg) {
            this.subn.portGroup = this.pg.id;
            console.log(this.subn.portGroup, "========== setupSubnet =============");
            this.layoutService.show();
            this.service.getSubnetInfoIps(this.subn.portGroup)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.subnetInfo = response.resultContent;
                    console.log(this.subnetInfo, "this.subnetInfo")
                    this.subn.subnetCIDR = this.subnetInfo.subnetCIDR;
                    this.subn.subnetMask = this.subnetInfo.subnetMask;
                    this.subn.gateway = this.subnetInfo.gateway;
                    this.subn.dnsPre = this.subnetInfo.dnsPre;
                    this.subn.dnsAlt = this.subnetInfo.dnsAlt;
                    console.log(this.subn, "subn-------");
                } else {
                    this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                    //this.showAlert("COMMON.OPERATION_ERROR");
                }
            })
            .catch((e) => this.onRejected(e));
            this.subnetbox.open();            
        } else {          
            this.showAlert("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PG");
            this.layoutService.hide();
            return;
        }
    }

    //Menu: 设置子网IP地址范围
    setupIPs(): void {
        console.log('conponent: net-mng/vm-mng/ip-mng-list/ips');
        this.pg = this.getSelected();
        if (this.pg) {
            this.ippool.portGroup = this.pg.id;
            console.log(this.ippool.portGroup, "========== setupIPs =============");
            this.layoutService.show();
            this.service.getSubnetInfoIps(this.ippool.portGroup)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) { 
                    this.subnetInfo = response.resultContent;
                    console.log(this.subnetInfo, "this.subnetInfo")
                    this.ippool.subnetCIDR = this.subnetInfo.subnetCIDR;
                    this.ippool.gateway = this.subnetInfo.gateway;
                    this.ippool.subnetMask = this.subnetInfo.subnetMask;
                    this.ippool.ips = this.subnetInfo.range;
                    if(!this.ippool.ips){
                        console.log("No ips from response!");
                        this.ippool.ipstr = "";
                    } else {
                        console.log("Ips from response!");
                        this.ippool.ipstr = this.ippool.ips.join('');
                    }
                    console.log(this.ippool.ips, this.ippool.ipstr, this.ippool, "ips, ipstr, and ippool object");
                } else {
                    console.log("========== setupIPs [if]else=============");
                    this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
                    //this.showAlert("COMMON.OPERATION_ERROR");
                }
            })
            .catch((e) => this.onRejected(e));
            this.ipsbox.open();

        } else {          
            this.showAlert("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PG");
            return;
        }

    }

    //Menu: 管理子网IP使用情况
    ipUsageMngPage() {
        let pg = this.getSelected();
        if(pg){
            this.router.navigate([`net-mng/vm-mng/ipusage-mng-list`,  
            {
                "pg_id": pg.id,
                "pg_name": pg.clusterName,
                "pid": this.platformId
            }]);
        }        
    }

    //Menu: 返回上一层, 可以在[返回上一层]调用
    vmwareNetworkPage() {
        this.router.navigate([`net-mng/vm-mng/${this.platformId}`]);     
    }

    acceptIPsModify(): void {
        console.log('clicked acceptIPsModify');
        this.layoutService.show();
        if (this.validateIPModify()) {
            //console.log('clicked acceptIPsModify 2');
            this.service.updateSubnetIPs(this.ippool.portGroup, this.ippool)
                .then(res => {
                    //console.log('clicked acceptIPsModify 3');
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        console.log(res, "设置IP地址范围成功")
                    } else {
                        console.log('clicked acceptIPsModify 4');
                        this.ipsbox.close();
                        this.showMsg("NET_MNG_VM_IP_MNG.SET_IP_POOL_FAILED");
                        return;
                    }
                })
                .then(()=>{
                    console.log('clicked acceptIPsModify 5');
                    this.getIpMngList(); // Need to get list since we need to get ipcount after setting up ipscope.
                    this.ipsbox.close();
                })
                .catch(err => {
                    console.log('clicked acceptIPsModify 6');
                    console.log('设置IP地址范围异常', err);
                    this.layoutService.hide();
                    this.ipsbox.close();
                    this.showMsg("NET_MNG_VM_IP_MNG.SET_IP_POOL_EXCEPTION");
                    this.okCallback = () => { 
                        this.ipsbox.open();  };
                })
        } else {
            this.layoutService.hide();
        }
    }

    cancelIPsModify(): void {
        console.log('clicked cancelIPsModify');
        this.ippool.ips = [];
        this.ippool.ipstr = "";
        this.ippool.subnetCIDR = "";
        this.ippool.subnetMask = "";
        this.ippool.gateway = "";
    }

    acceptSubnetModify(): void {
        console.log('clicked acceptSubnetModify');
        if (this.validateSubnetModify()) {
            this.layoutService.show();
            this.service.updateSubnet(this.subn.portGroup, this.subn)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        console.log(res, "设置IP子网成功");                        
                    } else {
                        console.log('clicked acceptSubnetModify 4');
                        this.subnetbox.close();
                        this.showMsg("NET_MNG_VM_IP_MNG.SET_SUBNET_FAILED");
                        return;
                    }
                })
                .then(()=>{
                    //this.getIpMngList();// don't need to get list.
                    console.log('clicked acceptSubnetModify 5');
                    this.pg.subnetCIDR = this.subn.subnetCIDR;
                    this.pg.gateway = this.subn.gateway;
                    this.subnetbox.close();
                })
                .catch(err => {                    
                    console.log('clicked acceptSubnetModify 6');
                    console.log('设置IP子网异常', err);
                    this.layoutService.hide();
                    this.subnetbox.close();
                    this.showMsg("NET_MNG_VM_IP_MNG.SET_SUBNET_EXCEPTION");
                    this.okCallback = () => { this.subnetbox.open(); };
                })
        }        
    }

    cancelSubnetModify(): void {
        console.log('clicked cancelSubnetModify');
        this.subn.dnsAlt = "";
        this.subn.dnsPre = "";
        this.subn.gateway = "";
        this.subn.subnetCIDR = "";
        this.subn.subnetMask = "";        
    }

	onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason, "onRejected");
        this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
    }

    showMsg(msg: string) {
        console.log(msg, "showMsg");
        this.notice.open("NET_MNG_VM_IP_MNG.SYSTEM_PROMPT", msg);
    }

	showAlert(msg: string): void {
        console.log(msg, "showAlert");
        this.layoutService.hide();
        this.noticeTitle = "NET_MNG_VM_IP_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

    //根据value显示
    displayIt(value: any): any {
        if(this.validationService.isBlank(value)){
            //console.log(value, "In dispalyIt()1")
            //return "未设置";
            return "NET_MNG_VM_IP_MNG.UNSET";
        } else {
            //console.log(value, "In dispalyIt()2")
            return value.toString();
            
        }
    }

    //选择行
    selectItem(index:number): void {
        this.ipmngs.map(n=> {n.checked = false;});
        this.ipmngs[index].checked = true;
        console.log(this.ipmngs, "=== Please see which one is selected ===");
    }

    UnselectItem(): void {
        this.ipmngs.map(n=> {n.checked = false;});
        //console.log(this.ipmngs, "=== Please see all items are Unselected ===");
    }

    getSelected() {
        let item = this.ipmngs.find((n) => n.checked) as IpMngModel;
        if (item){
            //console.log("==========getSelected 1=============");
            return item;
        }
        else {
            //console.log("==========getSelected 2=============");
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PG");
            return null;
        }
    }


    //验证设置IP地址范围内容
    validateIPModify(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "NET_MNG_VM_IP_MNG.IP_SCOPE"
                , 'value': this.ippool.ipstr
                , "op": "*"
            },
            /*
            {
                "name": "IP地址范围"
                , 'value': [this.ippool.ipstr, this.ippool.subnetCIDR]
                , "op": "ipscope"
            },
            */
            {
                "name": "NET_MNG_VM_IP_MNG.IP_SCOPE"
                , 'value': [this.ippool.ipstr, this.ippool.subnetCIDR, this.ippool.subnetMask]  //need subnetMask
                , "op": "ipscopepermask"
            }
            ].find(n => this.ipService.validate(n.name, n.value, n.op) !== undefined)        
        //console.log(notValid, "notValid!!!")
        if (notValid !== void 0) {
            console.log("validateIPModify Failed!!!");
            this.ipsbox.close();
            let name = this.ipService.validate(notValid.name, notValid.value, notValid.op)[0];
            let msg = this.ipService.validate(notValid.name, notValid.value, notValid.op)[1];
            this.translateService.get([name,msg], null).subscribe((res) => {
                this.showMsg(res[name] + res[msg]);
            });
            this.okCallback = () => {
                this.ipsbox.open();                
            };            
            return false;
        } else {
            console.log("validateIPModify OK!!!");
            return true;
        }
    }

    //验证设置子网内容
    validateSubnetModify(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "NET_MNG_VM_IP_MNG.SUBNET_INFORMATION"
                , 'value': this.subn.subnetCIDR
                , "op": "*"
            },
            {
                "name": "NET_MNG_VM_IP_MNG.SUBNET_MASK"
                , 'value': this.subn.subnetMask
                , "op": "*"
            },
            {
                "name": "NET_MNG_VM_IP_MNG.GATEWAY_ADDRESS"
                , 'value': this.subn.gateway
                , "op": "*"
            },
            {
                "name": "NET_MNG_VM_IP_MNG.SUBNET_MASK"
                , 'value': this.subn.subnetMask
                , "op": "ipmask"
            },            
            {
                "name": "NET_MNG_VM_IP_MNG.GATEWAY_ADDRESS"
                , 'value': this.subn.gateway
                , "op": "ip"
            },
            {
                "name": "DNS1"
                , 'value': this.subn.dnsPre
                , "op": "iporempty"
            },
            {
                "name": "DNS2"
                , 'value': this.subn.dnsAlt
                , "op": "iporempty"
            },
            //1: 子网信息正确，2：netmask和gateway在子网信息中
            //*
            {
                "name": "NET_MNG_VM_IP_MNG.SUBNET_INFORMATION"
                , 'value': this.subn.subnetCIDR
                , "op": "ip"
                //, "op": "cidr"
            },
            /*
            {
                "name": "网关地址"
                , 'value': [this.subn.gateway, this.subn.subnetCIDR]
                , "op": "gatewayinsubnet"
            },
            {
                "name": "子网掩码"
                , 'value': [this.subn.subnetMask, this.subn.subnetCIDR]
                , "op": "maskinsubnet"
            },
            */
            {
                "name": "NET_MNG_VM_IP_MNG.GATEWAY_ADDRESS"
                , 'value': [this.subn.gateway, this.subn.subnetCIDR, this.subn.subnetMask]
                , "op": "gatewayinsubnetandmask"
            },
            //*/
            ].find(n => this.ipService.validate(n.name, n.value, n.op) !== undefined)        
        //console.log(notValid, "notValid!!!")
        if (notValid !== void 0) {
            console.log("validateSubnetModify Failed!!!");
            this.subnetbox.close();
            let name = this.ipService.validate(notValid.name, notValid.value, notValid.op)[0];
            let msg = this.ipService.validate(notValid.name, notValid.value, notValid.op)[1];
            this.translateService.get([name,msg], null).subscribe((res) => {
                this.showMsg(res[name] + res[msg]);
            });
            this.okCallback = () => {
                this.subnetbox.open();                
            };            
            return false;
        } else {
            console.log("validateSubnetModify OK!!!");
            return true;
        }
    }

}
