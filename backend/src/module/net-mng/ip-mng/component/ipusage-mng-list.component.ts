import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, ValidationService, SystemDictionary, SystemDictionaryService, PaginationComponent  } from '../../../../architecture';

//model 
import { IpUsageMngModel } from '../model/ipusage-mng.model';


//service
import { IpUsageMngListService } from '../service/ipusage-mng-list.service';

@Component({
    selector: 'ipusage-mng-list',
    templateUrl: '../template/mng_ip_addr.html',
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
	
	noticeTitle = "";
    noticeMsg = "";

	statusDic: Array<SystemDictionary>;//状态
    ipusagemngs: Array<IpUsageMngModel>;
    rawipusagemngs: Array<IpUsageMngModel>;
    selectedip: IpUsageMngModel = new IpUsageMngModel();
    pg_id: string;
    pg_name: string;
    ipusagequery: string = "all";

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
            //this.getIpUsageMngList();
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
        this.layoutService.hide();
        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    ipMngPage() {
        //attest = attest || new Attest();
        this.router.navigate([`net-mng/ip-mng-list`]);
    }

    filter(query?): void {
        this.ipusagequery = query || this.ipusagequery;
        this.ipusagemngs = this.rawipusagemngs.filter((item)=>{
            return (this.ipusagequery == "all" || item.status == this.ipusagequery) 
        })
    }

    getIpUsageMngList( id: string, ipusagequery? ): void {
        if (this.validationService.isBlank(id)){
            this.showAlert("请选择相应的dataCenter");
            return;
        }
        this.layoutService.show();
        //this.service.getIpMngList(this.query, this.pageIndex, this.pageSize)
        this.service.getIpUsageMngList( id )
        .then(
            response => {
                this.layoutService.hide();
                console.log(response, "IPUsagemngS!!!");
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.rawipusagemngs = response.resultContent;
                    this.filter();
                    console.log(this.rawipusagemngs, "IPUsagemngS!!!");
                    //this.totalPage = response.pageInfo.totalPage;
                } else {
                    alert("Res sync error");
                    this.layoutService.hide();                   
                }
        }).catch((e) => this.onRejected(e));

    }

    //选择行
    selectItem(index:number):void
    {
        this.ipusagemngs.map(n=> {n.checked = false;});
        this.ipusagemngs[index].checked = true;
        console.log(this.ipusagemngs, "===============");
    }

    getSelected() {
        let item = this.ipusagemngs.find((n) => n.checked) as IpUsageMngModel;
        if (item)
            return item;
        else {
            this.showAlert("请选择相应的PortGroup");
            return null;
        }
    }

    showMsg(msg: string) {
        this.notice.open("系统提示", msg);
    }

    enable(): void{
        this.selectedip = this.getSelected();
        if(this.selectedip){
            console.log(this.selectedip.id);
            console.log(this.pg_id);
            this.service.enableIP(this.selectedip.id)
            .then(res => {
                    if (res && res.resultCode == "100") {
                        console.log(res, "设置IP地址范围成功")
                    } else {
                        this.showMsg("设置IP地址范围失败");
                        return;
                    }
                })
                .then(()=>{
                    this.getIpUsageMngList(this.pg_id);
                })
                .catch((e) => this.onRejected(e))
        }

    }

    disable(): void {
        this.selectedip = this.getSelected();
        if(this.selectedip){
            console.log(this.selectedip.id);
            this.service.disableIP(this.selectedip.id)
            .then(res => {
                    if (res && res.resultCode == "100") {
                        console.log(res, "设置IP地址范围成功")
                    } else {
                        this.showMsg("设置IP地址范围失败");
                        return;
                    }
                })
                .then(()=>{
                    this.getIpUsageMngList(this.pg_id);
                })
                .catch((e) => this.onRejected(e))
        }

    }

}
