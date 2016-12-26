import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, ValidationService, SystemDictionary, 
    PopupComponent, SystemDictionaryService, PaginationComponent  } from '../../../../../architecture';

//model 
import { IpUsageMngModel } from '../model/ip-mng.model';

//service
import { IpUsageMngListService } from '../service/ipusage-mng-list.service';

@Component({
    selector: 'ipusage-mng-list',
    templateUrl: '../template/vmware-dis-ipAddr-mng.html',
    styleUrls: [],
    providers: []
})

export class IpUsageMngListComponent implements OnInit{

    constructor(
        private router : Router,
        private activatedRouter : ActivatedRoute,
        private service : IpUsageMngListService,
        private layoutService : LayoutService,
        private dicService: SystemDictionaryService,
        private validationService: ValidationService,
    ) {
/*
        if (activatedRouter.snapshot.params["dc_id"]) {
            this.dc = activatedRouter.snapshot.params["dc_id"] || "";
        } else {
            this.dc = "dc_all";
        }
*/
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

	statusDic: Array<SystemDictionary>;//状态
    status: string = "";
    ipusagemngs: Array<IpUsageMngModel>;
    rawipusagemngs: Array<IpUsageMngModel>;
    selectedip: IpUsageMngModel = new IpUsageMngModel(); //被选中的ipusage
    changedip: IpUsageMngModel = new IpUsageMngModel(); //前台绑定的ipusage
    pg_id: string;
    pg_name: string;
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
            return "NET_MNG_VM_IP_MNG.UNSET";
        } else {
            return value;
        }
    }

    ngOnInit (){
        /*
        this.dicService.getItems("IP", "STATUS")
        .then((dic) => {
            this.statusDic = dic;
            console.log(this.statusDic, "=== this.statusDic ===");
        }).catch((e) => this.onRejected(e));
        */

        this.activatedRouter.params.forEach((params: Params) => {
            if (params["pg_id"] != null) {
                this.pg_id = params["pg_id"];
                console.log(this.pg_id);
            }
            if (params["pg_id"] != null) {
                this.pg_name = params["pg_name"];
                console.log(this.pg_name);
            }
            if (params["pid"] != null) {
                this.platformId = params["pid"];
                console.log(this.platformId, "this.platformId");
            }
        });

        this.getIpUsageMngList(this.pg_id);

    }

	onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_IP_MNG.GETTING_DATA_FAILED");
    }

	showAlert(msg: string): void {
        //this.layoutService.hide();
        this.noticeTitle = "NET_MNG_VM_IP_MNG.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    ipMngPage() {
        this.router.navigate([`net-mng/vm-mng-dbt/ip-mng-list`, {"pid": this.platformId}]);
    }

    filter(query?): void {
        //console.log("=== filter ===");
        this.ipusagequery = query || this.ipusagequery;
        this.ipusagemngs = this.rawipusagemngs.filter((item)=>{
            return (this.ipusagequery == "all" || item.status == this.ipusagequery) 
        });
        console.log(this.ipusagemngs, "ipusagemngs!!!");
        this.UnselectItem();
    }

    getIpUsageMngList( pg_id: string ): void {
        if (this.validationService.isBlank(pg_id)){
            this.showAlert("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_PG");
            return;
        }
        this.layoutService.show();
        this.service.getIpUsageMngList( pg_id )
        .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.rawipusagemngs = response.resultContent;
                    console.log(this.rawipusagemngs.length, "--- IP数量");
                    if(this.rawipusagemngs.length > 1)
                    {
                        this.rawipusagemngs.sort(function(a,b){
                            let ipa = a.addr.split(".");
                            let numa = Number(ipa[0]) * 256 * 256 * 256 + Number(ipa[1]) * 256 * 256 + Number(ipa[2]) * 256 + Number(ipa[3]);
                            let ipb = b.addr.split(".");
                            let numb = Number(ipb[0]) * 256 * 256 * 256 + Number(ipb[1]) * 256 * 256 + Number(ipb[2]) * 256 + Number(ipb[3]);
                            return numa>numb?1:-1;
                        });
                    }
                    //console.log(this.rawipusagemngs, "rawipusagemngs!!!");
                    this.filter();                    
                } else {
                    alert("Res sync error");               
                }
        }).catch((e) => this.onRejected(e));

    }

    //选择行
    selectItem(index:number): void {
        this.ipusagemngs.map(n=> {n.checked = false;});
        this.ipusagemngs[index].checked = true;
        //console.log(this.ipusagemngs, "this.ipusagemngs");
        this.selectedip = this.ipusagemngs[index];
        console.log(this.selectedip, "this.selectedip");
    }

    UnselectItem(): void {
        this.ipusagemngs.map(n=> {n.checked = false;});
        if(this.selectedip) this.selectedip.checked = false;
        //console.log(this.ipusagemngs, "=== Please see all items are Unselected ===");
    }

    getSelected() {
        let item = this.ipusagemngs.find((n) => n.checked) as IpUsageMngModel;
        if (item){
            //console.log(item, "this.getSelected 1");
            return item;
        }            
        else {
            //console.log(item, "this.getSelected 2");
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_CHOOSE_ITEM");
            return null;
        }
    }

    showMsg(msg: string) {
        this.notice.open("NET_MNG_VM_IP_MNG.SYSTEM_PROMPT", msg);
    }

    enable(): void{
        this.selectedip = this.getSelected();
        if(this.selectedip){
            this.changedip.id = this.selectedip.id;
            this.changedip.addr = this.selectedip.addr;
            this.changedip.description = this.selectedip.description;
            console.log(this.selectedip.id);
            this.service.statusDic
                .then((items) => {
                    return items.find(n => n.code == "OCCUPIED");
                })
                .then((item) => {
                    if (item) {
                        console.log(item, "dict!!!");
                        this.status = <string>item.value;
                        if (this.selectedip.status == this.status) {
                            this.showMsg("NET_MNG_VM_IP_MNG.IP_OCCUPIED");
                            return;
                        }
                        this.enableipbox.open();
                    } else {
                        this.showMsg("NET_MNG_VM_IP_MNG.DICTIONARY_FAILED");
                        return;
                    }
                }).catch((e) => this.onRejected(e));
        }
    }

    disable(): void {
        this.selectedip = this.getSelected();
        if(this.selectedip){
            this.changedip.id = this.selectedip.id;
            this.changedip.addr = this.selectedip.addr;
            this.changedip.description = this.selectedip.description;
            console.log(this.selectedip.id);
            this.service.statusDic
                .then((items) => {
                    return items.find(n => n.code == "FREE");
                })
                .then((item) => {
                    if (item) {
                        console.log(item, "dict!!!");
                        this.status = <string>item.value;
                        if (this.selectedip.status == this.status) {
                            this.showMsg("NET_MNG_VM_IP_MNG.IP_RELEASED");
                            return;
                        }
                        this.disableipbox.open();
                    } else {
                        this.showMsg("NET_MNG_VM_IP_MNG.DICTIONARY_FAILED");
                        return;
                    }
                }).catch((e) => this.onRejected(e));
        }

    }

    acceptEnableIPModify(): void {
        console.log('clicked acceptEnableIPModify');
        this.layoutService.show();
        if (this.validationService.isBlank(this.changedip.description)) {
            this.layoutService.hide();
            this.enableipbox.close();
            this.showMsg("NET_MNG_VM_IP_MNG.PLEASE_INPUT_DESCRIPTION");            
            this.okCallback = () => {
                this.enableipbox.open(); 
            }
        } else {
            this.service.enableIP(this.changedip)
                .then(res => {
                    this.layoutService.hide();
                    if (res && res.resultCode == "100") {                        
                        this.changedip.status = this.status;
                        //this.changedip.status = '1';
                        console.log(res, "IP占用成功")
                    } else {
                        this.enableipbox.close();
                        this.showMsg("NET_MNG_VM_IP_MNG.IP_OCCUPIED_FAILED");
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
                    console.log('clicked acceptEnableIPModify 6');
                    this.layoutService.hide();
                    console.log('IP占用异常', err);
                    this.enableipbox.close();
                    this.showMsg("NET_MNG_VM_IP_MNG.IP_OCCUPIED_EXCEPTION");
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
        this.service.disableIP(this.changedip)
            .then(res => {
                this.layoutService.hide();
                if (res && res.resultCode == "100") {
                    this.changedip.status = this.status;
                    //this.changedip.status = '2';
                    console.log(res, "IP释放成功")
                } else {
                    this.disableipbox.close();
                    this.showMsg("NET_MNG_VM_IP_MNG.IP_RELEASED_FAILED");
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
                console.log('clicked acceptDisableIPModify 6');
                this.layoutService.hide();
                console.log('IP释放异常', err);
                this.disableipbox.close();
                this.showMsg("NET_MNG_VM_IP_MNG.IP_RELEASED_EXCEPTION");
                this.okCallback = () => { this.disableipbox.open(); };
            })
    }

    cancelDisableIPModify(): void {
        console.log('clicked cancelDisableIPModify');
        this.status = "";
        this.changedip.description = this.selectedip.description;
    }
}
