import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, ValidationService, SystemDictionary, 
    PopupComponent, SystemDictionaryService, PaginationComponent  } from '../../../../architecture';

//model 
import { IpUsageMngModel } from '../model/phy-net.model';

//service
import { PhyNetMngIpAddrService } from '../service/ipusage-mng-list.service';
import { PhyNetDictService } from '../service/phy-net-dict.service';

@Component({
    selector: 'ipusage-mng-list',
    templateUrl: '../template/phy_net_mng_ip_addr.html',
    styleUrls: [],
    providers: []
})

export class PhyNetMngIpAddrComponent implements OnInit{

    constructor(
        private router : Router,
        private activatedRouter : ActivatedRoute,
        private service : PhyNetMngIpAddrService,
        private layoutService : LayoutService,
        private dictService: PhyNetDictService,
        private validationService: ValidationService,
    ) {
    }

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("enableipbox")
    enableipbox: PopupComponent;

    @ViewChild("disableipbox")
    disableipbox: PopupComponent;
	
	noticeTitle = "";
    noticeMsg = "";

    platformId: string;

    status: string = "";
    ipstatusDictArray: Array<SystemDictionary> = [];

    ipusagemngs: Array<IpUsageMngModel>;
    rawipusagemngs: Array<IpUsageMngModel>;
    selectedip: IpUsageMngModel = new IpUsageMngModel(); //被选中的ipusage
    changedip: IpUsageMngModel = new IpUsageMngModel(); //前台绑定的ipusage
    pn_id: string;
    pn_name: string;
    ipusagequery: string = "all";

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
        this.activatedRouter.params.forEach((params: Params) => {
            if (params["pn_id"] != null) {
                this.pn_id = params["pn_id"];
                console.log(this.pn_id);
            }
            if (params["pn_name"] != null) {
                this.pn_name = params["pn_name"];
                console.log(this.pn_name);
            }
        });

        this.dictService.ipstatusDict
        .then((items) => {
            this.ipstatusDictArray = items;
            console.log(this.ipstatusDictArray, "this.ipstatusDictArray");
        });

        this.getIpUsageMngList(this.pn_id);

    }

    ipMngPage() {
        //this.router.navigate([`phy-mng/phy-net/phy-net-mng`, {"pid": this.platformId}]);
        this.router.navigate([`phy-mng/phy-net/phy-net-mng`]);
    }

    filter(query?): void {
        this.ipusagequery = query || this.ipusagequery;
        this.ipusagemngs = this.rawipusagemngs.filter((item)=>{
            return (this.ipusagequery == "all" || item.status == this.ipusagequery) 
        });
        console.log(this.ipusagemngs, "ipusagemngs!!!");
        this.UnselectItem();
    }

    getIpUsageMngList( pn_id: string ): void {
        if (this.validationService.isBlank(pn_id)){
            this.showAlert("PHY_NET_MNG.PLEASE_CHOOSE_IP");
            return;
        }
        this.layoutService.show();
        this.service.getIpUsageMngList( pn_id )
        .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.rawipusagemngs = response.resultContent;
                    console.log(this.rawipusagemngs.length, this.rawipusagemngs, "--- IP numbers");
                    if(this.rawipusagemngs.length > 1)
                    {
                        this.rawipusagemngs.sort(function(a,b){
                            let ipa = a.ipAddress.split(".");
                            let numa = Number(ipa[0]) * 256 * 256 * 256 + Number(ipa[1]) * 256 * 256 + Number(ipa[2]) * 256 + Number(ipa[3]);
                            let ipb = b.ipAddress.split(".");
                            let numb = Number(ipb[0]) * 256 * 256 * 256 + Number(ipb[1]) * 256 * 256 + Number(ipb[2]) * 256 + Number(ipb[3]);
                            return numa>numb?1:-1;
                        });
                    }
                    this.filter();                    
                } else {
                    alert("Res sync error");               
                }
        }).catch((e) => this.onRejected(e));

    }

    ocuppy(): void{
        this.selectedip = this.getSelected();
        if(this.selectedip){
            this.changedip.id = this.selectedip.id;
            this.changedip.ipAddress = this.selectedip.ipAddress;
            this.changedip.description = this.selectedip.description;
            this.changedip.status = this.selectedip.status;
            console.log(this.changedip, "ip_status need to be enabled!");
            if(this.changedip.status == this.ipstatusDictArray.find(n => n.code === "used").value){
                this.showMsg("PHY_NET_MNG.PHY_IP_ENABLED");
                return; 
            }
            this.enableipbox.open();
        } else {
            this.showMsg("PHY_NET_MNG.PLEASE_CHOOSE_IP");
            return; 
        }
    }

    release(): void {
        this.selectedip = this.getSelected();
        if(this.selectedip){
            this.changedip.id = this.selectedip.id;
            this.changedip.ipAddress = this.selectedip.ipAddress;
            this.changedip.description = this.selectedip.description;
            this.changedip.status = this.selectedip.status;
            console.log(this.changedip, "ip_status need to be disabled!");
            if(this.changedip.status == this.ipstatusDictArray.find(n => n.code === "free").value){
                this.showMsg("PHY_NET_MNG.PHY_IP_DISABLED");
                return; 
            }
            this.disableipbox.open();
        } else {
            this.showMsg("PHY_NET_MNG.PLEASE_CHOOSE_IP");
            return; 
        }

    }

    acceptEnableIPModify(): void {
        console.log('clicked acceptEnableIPModify');
        this.layoutService.show();
        if (this.validationService.isBlank(this.changedip.description)) {
            this.layoutService.hide();
            this.enableipbox.close();
            this.showMsg("PHY_NET_MNG.PLEASE_INPUT_DESCRIPTION");            
            this.okCallback = () => {
                this.enableipbox.open(); 
            }
        } else {
            this.service.updateIpStatus(this.changedip)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        this.changedip.status = <string>this.ipstatusDictArray.find(n => n.code === "used").value;
                        //this.changedip.status = '1';
                        console.log(res, "IP占用成功")
                    } else {
                        this.enableipbox.close();
                        this.showMsg("PHY_NET_MNG.IP_OCCUPIED_FAILED");
                        return;
                    }
                })
                .then(() => {
                    console.log('clicked acceptEnableIPModify OK');
                    this.selectedip.description = this.changedip.description;
                    this.selectedip.status = this.changedip.status;
                    this.enableipbox.close();
                })
                .catch(err => {
                    this.layoutService.hide();
                    console.log('IP占用异常', err);
                    this.enableipbox.close();
                    this.showMsg("PHY_NET_MNG.IP_OCCUPIED_EXCEPTION");
                    this.okCallback = () => { this.enableipbox.open(); };
                })
        }
    }

    cancelEnableIPModify(): void {
        console.log('clicked cancelEnableIPModify');
        this.status = "";
        this.changedip.description = this.selectedip.description;
    }

    acceptDisableIPModify(): void {
        console.log('clicked acceptDisableIPModify');
        this.layoutService.show();
        this.service.updateIpStatus(this.changedip)
            .then(res => {
                this.layoutService.hide();
                if (res && res.resultCode == "100") {
                    this.changedip.status = <string>this.ipstatusDictArray.find(n => n.code === "free").value;
                    //this.changedip.status = '2';
                    console.log(res, "IP释放成功")
                } else {
                    this.disableipbox.close();
                    this.showMsg("PHY_NET_MNG.IP_RELEASED_FAILED");
                    return;
                }
            })
            .then(() => {
                console.log('clicked acceptDisableIPModify OK');
                this.selectedip.description = "";
                this.selectedip.status = this.changedip.status;
                this.disableipbox.close();
            })
            .catch(err => {
                this.layoutService.hide();
                console.log('IP释放异常', err);
                this.disableipbox.close();
                this.showMsg("PHY_NET_MNG.IP_RELEASED_EXCEPTION");
                this.okCallback = () => { this.disableipbox.open(); };
            })
    }

    cancelDisableIPModify(): void {
        console.log('clicked cancelDisableIPModify');
        this.status = "";
        this.changedip.description = this.selectedip.description;
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }

	showAlert(msg: string): void {
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showMsg(msg: string) {
        this.notice.open("COMMON.SYSTEM_PROMPT", msg);
    }

    //选择行
    selectItem(index:number): void {
        this.ipusagemngs.map(n=> {n.checked = false;});
        this.ipusagemngs[index].checked = true;
        this.selectedip = this.ipusagemngs[index];
        console.log(this.selectedip, "this.selectedip");
    }

    UnselectItem(): void {
        this.ipusagemngs.map(n=> {n.checked = false;});
        if(this.selectedip) this.selectedip.checked = false;
    }

    getSelected() {
        let item = this.ipusagemngs.find((n) => n.checked) as IpUsageMngModel;
        if (item){
            return item;
        }            
        else {
            this.showMsg("COMMON.PLEASE_CHOOSE_ITEM");
            return null;
        }
    }

    //根据value获取字典的txt
    getDicText(value: string, dic: Array<SystemDictionary>): String {
        const d = dic.find((e) => {
            return e.value == value;
        });
        if (d) {
            return d.displayValue;
        } else {
            return value;
        }
    }

    //根据value显示
    displayIt(value: string): String {
        if(this.validationService.isBlank(value)){
            return "COMMON.UNSET";
        } else {
            return value;
        }
    }
}
