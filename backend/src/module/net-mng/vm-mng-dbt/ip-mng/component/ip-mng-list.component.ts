import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, ValidationService } from '../../../../../architecture';

//model 
import { IpMngModel, DCModel, SwitchModel, subnetModel, subnetInfoModel, subnetIpModel, IpUsageMngModel } from '../model/ip-mng.model';


//service
import { IpMngListService } from '../service/ip-mng-list.service';
import { IPValidationService } from '../service/ip-mng.validation.service';

@Component({
    selector: 'ip-mng-list',
    templateUrl: '../template/vmware-dis-ip-mng.html',
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
        private activatedRouter: ActivatedRoute
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

    platformId: string = "";

    defaultDC: DCModel = new DCModel();
    selectedDC: DCModel = this.defaultDC; //当前选中的DC
    defaultVDS: SwitchModel = new SwitchModel();
    selectedVDS: SwitchModel = this.defaultVDS;//当前选中的可用区
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
                console.log(this.selectedDC.dcId, "this.selectedDC.dc_Id");
            }
            if (params["switch_Id"] != null) {
                this.selectedVDS.switchId = params["switch_Id"];
                console.log(this.selectedVDS.switchId, "this.selectedVDS.switchId");
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
                        console.log(this.dcList, "this.dcList--------------------");
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    filter(): void {
        this.ipmngs = this.rawipmngs.filter((item)=>{
            return ( this.selectedVDS.switchId == "" || item.switchId == this.selectedVDS.switchId ) &&
            ( this.selectedDC.dcId == "" || item.dcId == this.selectedDC.dcId )
        });
        this.selectedDC=this.defaultDC;
        this.selectedDC.dcId='';
        this.selectedVDS=this.defaultVDS;
        this.selectedVDS.switchId='';
        console.log(this.ipmngs, "IPmngS --- filter");
        this.UnselectItem();
    }

    getIpMngList(): void {
        this.layoutService.show();
        this.service.getIpMngList(this.platformId)
            .then(
            response => {
                this.layoutService.hide();
                console.log(response, "IPmngS!!!");
                if (response && 100 == response["resultCode"]) {
                    this.rawipmngs = response.resultContent;
                    this.filter();
                    console.log(this.ipmngs, "IPmngS --- getIpMngList");
                } else {
                    alert("Res sync error");
                }
            })
            .catch((e) => this.onRejected(e));
    }

    //Menu: 设置IP子网
    setupSubnet(): void {
        console.log('conponent: net-mng/vm-mng-dbt/ip-mng-list/subnet');        
        this.pg = this.getSelected();
         if (this.pg) {
            this.subn.portGroup = this.pg.id;
            console.log(this.subn.portGroup, "this.subn.portGroup");
            this.layoutService.show();
            this.service.getSubnetInfoIps(this.subn.portGroup)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.subnetInfo = response.resultContent;
                    console.log(this.subnetInfo, "this.subnetInfo");
                    this.subn.subnetCIDR = this.subnetInfo.subnetCIDR;
                    this.subn.subnetMask = this.subnetInfo.subnetMask;
                    this.subn.gateway = this.subnetInfo.gateway;
                    this.subn.dnsPre = this.subnetInfo.dnsPre;
                    this.subn.dnsAlt = this.subnetInfo.dnsAlt;
                    console.log(this.subn, "subn------");
                } else {
                    alert("Res sync error");
                }
            })
            .catch((e) => this.onRejected(e));
            this.subnetbox.open();            
        } else {          
            this.showAlert("请选择相应的PortGroup");
            return;
        }
    }

    //Menu: 设置子网IP地址范围
    setupIPs(): void {
        console.log('conponent: net-mng/vm-mng-dbt/ip-mng-list/ips');
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
                    console.log(this.subnetInfo, "this.subnetInfo");
                    this.ippool.subnetCIDR = this.subnetInfo.subnetCIDR;
                    this.ippool.subnetMask = this.subnetInfo.subnetMask;
                    this.ippool.gateway = this.subnetInfo.gateway;
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
                    alert("Res sync error");
                }
            })
            .catch((e) => this.onRejected(e));
            this.ipsbox.open();
        } else {          
            this.showAlert("请选择相应的PortGroup");
            return;
        }

    }

    //Menu: 管理子网IP使用情况
    ipUsageMngPage() {
        let pg = this.getSelected();
        if(pg){
            this.router.navigate([`net-mng/vm-mng-dbt/ipusage-mng-list`, 
            {
                "pg_id": pg.id,
                "pg_name": pg.switchName,
                "pid": this.platformId
            }]);
        }        
    }

    //Menu: 返回上一层, 可以在[返回上一层]调用
    vmwareNetworkPage() {
        this.router.navigate([`net-mng/vm-mng-dbt/index/${this.platformId}`]);     
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
                        this.showMsg("设置IP地址范围失败");
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
                    this.showMsg("设置IP地址范围异常");
                    this.okCallback = () => { this.ipsbox.open(); };
                })
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
                        this.showMsg("设置IP子网失败");
                        return;
                    }
                })
                .then(()=>{
                    //this.getIpMngList();
                    console.log('clicked acceptSubnetModify 5');
                    this.pg.subnetCIDR = this.subn.subnetCIDR;
                    this.pg.gateway = this.subn.gateway;
                    console.log(this.pg.subnetCIDR, this.pg.gateway);
                    this.subnetbox.close();
                })
                .catch(err => {                    
                    console.log('设置IP子网异常', err);
                    this.layoutService.hide();
                    this.subnetbox.close();
                    this.showMsg("设置IP子网异常");
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
        console.log(reason);
        this.showAlert("获取数据失败！");
    }

    showMsg(msg: string) {
        this.notice.open("系统提示", msg);
    }

	showAlert(msg: string): void {
        //this.layoutService.hide();
        this.noticeTitle = "提示";
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
            return "未设置";
        } else {
            return value;
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
            this.showMsg("请选择相应的PortGroup");
            return null;
        }
    }


    //验证设置IP地址范围内容
    validateIPModify(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "IP地址范围"
                , 'value': this.ippool.ipstr
                , "op": "*"
            },
            /*
            {
                "name": "IP地址范围"
                , 'value': [this.ippool.ipstr, this.ippool.subnetCIDR]
                , "op": "ipscope"
            },*/
            {
                "name": "IP地址范围"
                , 'value': [this.ippool.ipstr, this.ippool.subnetCIDR, this.ippool.subnetMask]
                , "op": "ipscopepermask"
            }
            ].find(n => this.ipService.validate(n.name, n.value, n.op) !== undefined)        
        //console.log(notValid, "notValid!!!")
        if (notValid !== void 0) {
            console.log("validateIPModify Failed!!!");
            this.ipsbox.close();
            this.showMsg(this.ipService.validate(notValid.name, notValid.value, notValid.op));            
            this.okCallback = () => {
                this.ipsbox.open();                
            };            
            return false;
        } else {
            console.log("validateIPModify OK!!!")
            return true;
        }
    }

    //验证设置子网内容
    validateSubnetModify(): boolean {
        let notValid = null;
        notValid = [
            {
                "name": "子网信息"
                , 'value': this.subn.subnetCIDR
                , "op": "*"
            },
            {
                "name": "子网掩码"
                , 'value': this.subn.subnetMask
                , "op": "*"
            },
            {
                "name": "网关地址"
                , 'value': this.subn.gateway
                , "op": "*"
            },
            {
                "name": "子网掩码"
                , 'value': this.subn.subnetMask
                , "op": "ipmask"
            },            
            {
                "name": "网关地址"
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
                "name": "子网信息"
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
                "name": "网关地址"
                , 'value': [this.subn.gateway, this.subn.subnetCIDR, this.subn.subnetMask]
                , "op": "gatewayinsubnetandmask"
            },
            //*/
            ].find(n => this.ipService.validate(n.name, n.value, n.op) !== undefined)        
        //console.log(notValid, "notValid!!!")
        if (notValid !== void 0) {
            console.log("validateSubnetModify Failed!!!");
            this.subnetbox.close();
            this.showMsg(this.ipService.validate(notValid.name, notValid.value, notValid.op));            
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
