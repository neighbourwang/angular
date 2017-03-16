import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, ValidationService } from '../../../../../architecture';

import { TranslateService } from 'ng2-translate';

//model 
import { IpMngModel, DLRModel, subnetInfoModel, subnetIpModel, IpUsageMngModel } from '../model/ip-mng.model';

//service
import { IpMngListService } from '../service/ip-mng-list.service';
import { IPValidationService } from '../../../vm-mng-index/service/validation.service';
import { selectedPlatform } from "../../../vm-mng-index/service/platform.service";

@Component({
    selector: 'ip-mng-list',
    templateUrl: '../template/vmware-nsx-ip-addr-mng.html',
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

    defaultDLR: DLRModel = new DLRModel();
    selectedDLR: DLRModel = this.defaultDLR;
    DLRList: Array<DLRModel>;


    rawipmngs: Array<IpMngModel>;
    ipmngs: Array<IpMngModel>;
    selectedipmng: IpMngModel = new IpMngModel();
    pg: IpMngModel = new IpMngModel();
    
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
            if (params["dlr_Id"] != null) {
                this.selectedDLR.dlrId = params["dlr_Id"];                
                console.log(this.selectedDLR.dlrId, "this.selectedDLR.dlrId");
            }
            if (params["pid"] != null) {
                this.platformId = params["pid"];
                console.log(this.platformId, "this.platformId");
            }
        });

        this.getDLRList();
        this.getIpMngList();
    }

    getDLRList() {
        this.layoutService.show();
        this.service.getDLRList(this.platformId)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.DLRList = response["resultContent"];
                        console.log(this.DLRList, "this.DLRList--------------------");
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    filter(): void {
        this.ipmngs = this.rawipmngs.filter((item)=>{
            return ( this.selectedDLR.dlrId == "" || item.dlrId == this.selectedDLR.dlrId )
        });
        this.selectedDLR = this.defaultDLR;
        this.selectedDLR.dlrId = '';
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
                    console.log(this.rawipmngs, "IPmngS --- getIpMngList");
                    this.filter();
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            })
            .catch((e) => this.onRejected(e));
    }

    //Menu: 管理子网IP使用情况
    ipUsageMngPage() {
        let pg = this.getSelected();
        if(pg){
            this.router.navigate([`net-mng/vm-mng-nsx/ipusage-mng-list`, 
            {
                "pg_id": pg.dlrPortId,
                "pg_name": pg.drlSubnetDisplayName,
                "pid": this.platformId
            }]);
        }        
    }

    //Menu: 返回上一层, 可以在[返回上一层]调用
    vmwareNetworkPage() {
        this.router.navigate([`net-mng/vm-mng-nsx/index/${this.platformId}`]);     
    }

    //Menu: 设置子网IP地址范围
    setupIPs(): void {
        console.log('conponent: net-mng/vm-mng-nsx/ip-mng-list/ips');
        this.pg = this.getSelected();        
        if (this.pg) {
            this.ippool.portGroup = this.pg.dlrPortId;
            console.log(this.ippool.portGroup, "this.ippool.portGroup");
            this.layoutService.show();
            this.service.getSubnetInfoIps(this.ippool.portGroup)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {                    
                    this.subnetInfo = response.resultContent;
                    console.log(this.subnetInfo, "this.subnetInfo");
                    this.ippool.subnetCIDR = this.subnetInfo.subnetCIDR;
                    this.ippool.gateway = this.subnetInfo.gateway;
                    this.ippool.dnsPre = this.subnetInfo.dnsPre;
                    this.ippool.dnsAlt = this.subnetInfo.dnsAlt;
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
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            })
            .catch((e) => this.onRejected(e));
            this.ipsbox.open();
        } else {          
            this.showAlert("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PG");
            return;
        }

    }

    acceptIPsModify(): void {
        console.log('clicked acceptIPsModify');        
        console.log(this.ippool.ipstr, "this.ippool.ipstr");
        if (this.validateIPModify()) {
            //console.log('clicked acceptIPsModify 2');
            this.layoutService.show();
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
                    this.getIpMngList();
                    this.ipsbox.close();
                })
                .catch(err => {
                    console.log('clicked acceptIPsModify 6');
                    this.layoutService.hide();
                    console.log('设置IP地址范围异常', err);
                    this.ipsbox.close();
                    this.showMsg("NET_MNG_VM_IP_MNG.SET_IP_POOL_EXCEPTION");
                    this.okCallback = () => { this.ipsbox.open(); };
                })
        }
    }

    cancelIPsModify(): void {
        console.log('clicked cancelIPsModify');
        this.ippool.ips = [];
        this.ippool.ipstr = "";
        this.ippool.dlrInterfaceIPaddress = "";
        this.ippool.dlrSubnet = "";
        this.ippool.subnetCIDR = "";
        this.ippool.gateway = "";
        this.ippool.dnsPre = "";
        this.ippool.dnsAlt = "";

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
    }

    showMsg(msg: string) {
        this.notice.open("NET_MNG_VM_IP_MNG.SYSTEM_PROMPT", msg);
    }

	showAlert(msg: string): void {
        this.noticeTitle = "NET_MNG_VM_IP_MNG.PROMPT";
        this.noticeMsg = msg;
        console.log(this.noticeTitle, this.noticeMsg);
        this.notice.open();
    }

    showError(msg: any) {
        this.notice.open(msg.title, msg.desc);
    }

    //根据value显示
    displayIt(value: string): String {
        if(this.validationService.isBlank(value)){
            return "NET_MNG_VM_IP_MNG.UNSET";
        } else {
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
    }

    getSelected() {
        let item = this.ipmngs.find((n) => n.checked) as IpMngModel;
        if (item){
            return item;
        }
        else {
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PG");
            return null;
        }
    }


    //验证设置IP地址范围内容
    /*
    validateIPModify(): boolean {
        return true;
    }
    */
    
    validateIPModify(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "NET_MNG_VM_IP_MNG.SUBNET_INFORMATION"
                , 'value': this.ippool.subnetCIDR
                , "op": "cidr"
            },
            {
                "name": "NET_MNG_VM_IP_MNG.IP_SCOPE"
                , 'value': this.ippool.ipstr
                , "op": "*"
            },
            {
                "name": "NET_MNG_VM_IP_MNG.IP_SCOPE"
                , 'value': [this.ippool.ipstr, this.ippool.subnetCIDR]
                , "op": "ipscope"
            },
            {
                "name": "DNS1"
                , 'value': this.ippool.dnsPre
                , "op": "iporempty"
            },
            {
                "name": "DNS2"
                , 'value': this.ippool.dnsAlt
                , "op": "iporempty"
            },
            ].find(n => this.ipService.validate(n.name, n.value, n.op) !== undefined);

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
            console.log("validateIPModify OK!!!")
            return true;
        }
    }
   

}
