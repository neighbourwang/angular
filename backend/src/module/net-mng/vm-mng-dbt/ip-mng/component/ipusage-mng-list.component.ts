import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, ValidationService, SystemDictionary, PopupComponent, SystemDictionaryService, PaginationComponent  } from '../../../../../architecture';

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

	statusDic: Array<SystemDictionary>;//状态
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
            return "未设置";
        } else {
            return value;
        }
    }

    ngOnInit (){
        this.dicService.getItems("IP", "STATUS")
        .then((dic) => {
            this.statusDic = dic;
            console.log(this.statusDic, "=== this.statusDic ===");
        }).catch((e) => this.onRejected(e));

        this.activatedRouter.params.forEach((params: Params) => {
            this.pg_id = params["pg_id"];
            this.pg_name = params["pg_name"];
            console.log(this.pg_id);
            console.log(this.pg_name);
        });

        this.getIpUsageMngList(this.pg_id);

    }

	onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }

	showAlert(msg: string): void {
        //this.layoutService.hide();
        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    ipMngPage() {
        this.router.navigate([`net-mng/vm-mng-dbt/ip-mng-list`]);
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
            this.showAlert("请选择相应的dataCenter");
            return;
        }
        this.layoutService.show();
        this.service.getIpUsageMngList( pg_id )
        .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.rawipusagemngs = response.resultContent;
                    console.log(this.rawipusagemngs, "rawipusagemngs!!!");
                    this.filter();                    
                } else {
                    alert("Res sync error");
                    this.layoutService.hide();                   
                }
        }).catch((e) => this.onRejected(e));

    }

    //选择行
    selectItem(index:number): void {
        this.ipusagemngs.map(n=> {n.checked = false;});
        this.ipusagemngs[index].checked = true;
        console.log(this.ipusagemngs, "this.ipusagemngs");
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
            this.showMsg("请选择相应的行");
            return null;
        }
    }

    showMsg(msg: string) {
        this.notice.open("系统提示", msg);
    }

    enable(): void{
        this.selectedip = this.getSelected();
        if(this.selectedip){
            this.changedip.id = this.selectedip.id;
            this.changedip.addr = this.selectedip.addr;
            this.changedip.description = this.selectedip.description;
            console.log(this.selectedip.id);
            //if(this.selectedip.status == this.statusDic.find(n => n.code == "OCCUPIED").value){
            if(this.selectedip.status == "1"){
                this.showMsg("IP已被占用");
                return; 
            }
            this.enableipbox.open();
        }
    }

    disable(): void {
        this.selectedip = this.getSelected();
        if(this.selectedip){
            this.changedip.id = this.selectedip.id;
            this.changedip.addr = this.selectedip.addr;
            this.changedip.description = this.selectedip.description;
            console.log(this.selectedip.id);
            //if (this.selectedip.status == this.statusDic.find(n => n.code == "FREE").value) {
            if(this.selectedip.status == "2"){
                this.showMsg("IP未被占用，无法释放");
                return;
            }
            this.disableipbox.open();
        }

    }

    acceptEnableIPModify(): void {
        console.log('clicked acceptEnableIPModify');
        this.layoutService.show();
        //console.log(this.changedip.description, "this.changedip.description");
        if (this.validationService.isBlank(this.changedip.description)) {
            this.layoutService.hide();
            this.enableipbox.close();
            this.showMsg("请填写说明");            
            this.okCallback = () => {
                this.enableipbox.open(); 
            }
        } else {
            //console.log('clicked acceptEnableIPModify 2');
            this.service.enableIP(this.changedip)
                .then(res => {
                    if (res && res.resultCode == "100") {
                        this.layoutService.hide();
                        //this.changedip.status = <string>this.statusDic.find(n => n.code == "OCCUPIED").value;
                        this.changedip.status = '1';
                        console.log(res, "IP占用成功")
                    } else {
                        this.layoutService.hide();
                        this.enableipbox.close();
                        this.showMsg("IP占用失败");
                        return;
                    }
                })
                .then(() => {
                    console.log('clicked acceptEnableIPModify OK');
                    //this.getIpUsageMngList(this.pg_id);
                    this.selectedip.description = this.changedip.description;
                    this.selectedip.status = this.changedip.status;
                    this.enableipbox.close();
                })
                .catch(err => {
                    console.log('clicked acceptEnableIPModify 6');
                    this.layoutService.hide();
                    console.log('IP占用失败', err);
                    this.enableipbox.close();
                    this.showMsg("IP占用失败");
                    this.okCallback = () => { this.enableipbox.open(); };
                })
        }
    }

    cancelEnableIPModify(): void {
        console.log('clicked cancelEnableIPModify');
        this.changedip.description = this.selectedip.description;
    }



    acceptDisableIPModify(): void {
        console.log('clicked acceptDisableIPModify');
        this.layoutService.show();
        //console.log(this.changedip.description, "this.selectedip.description");
        if (this.validationService.isBlank(this.changedip.description)) {
            this.layoutService.hide();
            this.disableipbox.close();
            this.showMsg("请填写说明");          
            this.okCallback = () => {
                this.disableipbox.open(); 
            }
        } else {
            //console.log('clicked acceptDisableIPModify 2');
            this.service.disableIP(this.changedip)
                .then(res => {
                    if (res && res.resultCode == "100") {
                        this.layoutService.hide();
                        //this.changedip.status = <string>this.statusDic.find(n => n.code == "FREE").value;
                        this.changedip.status = '2';
                        console.log(res, "IP释放成功")
                    } else {
                        this.layoutService.hide();
                        this.disableipbox.close();
                        this.showMsg("IP释放失败");
                        return;
                    }
                })
                .then(() => {
                    console.log('clicked acceptDisableIPModify OK');
                    //this.getIpUsageMngList(this.pg_id);
                    this.selectedip.description = this.changedip.description;
                    this.selectedip.status = this.changedip.status;
                    this.disableipbox.close();
                })
                .catch(err => {
                    console.log('clicked acceptDisableIPModify 6');
                    this.layoutService.hide();
                    console.log('IP释放失败', err);
                    this.disableipbox.close();
                    this.showMsg("IP释放失败");
                    this.okCallback = () => { this.disableipbox.open(); };
                })
        }
    }

    cancelDisableIPModify(): void {
        console.log('clicked cancelDisableIPModify');
        this.changedip.description = this.selectedip.description;
    }
}
