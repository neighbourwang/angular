import { Component, ViewChild, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

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
        if (activatedRouter.snapshot.params["dc_id"]) {
            this.dc = activatedRouter.snapshot.params["dc_id"] || "";
        } else {
            this.dc = "dc_all";
        }
    }

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;
	
	noticeTitle = "";
    noticeMsg = "";

	statusDic: Array<SystemDictionary>;//状态
    ipusagemngs: Array<IpUsageMngModel>;
    dc: string;

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

    ngOnInit (){
        this.dicService.getItems("IP", "STATUS")
        .then((dic) => {
            this.statusDic = dic;
            //this.getIpUsageMngList();
        }).catch((e) => this.onRejected(e));
        this.getIpUsageMngList();

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
        this.router.navigate([`net-mng/ip-mng-list/${this.dc}`]);
    }

    getIpUsageMngList(): void {
        if (this.validationService.isBlank(this.dc)){
            this.showAlert("请选择相应的dataCenter");
            return;
        }
        this.layoutService.show();
        //this.service.getIpMngList(this.query, this.pageIndex, this.pageSize)
        this.service.getIpUsageMngList()
        .then(
            response => {
                this.layoutService.hide();
                console.log(response, "IPUsagemngS!!!");
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.ipusagemngs = response.resultContent;
                    console.log(this.ipusagemngs, "IPUsagemngS!!!");
                    //this.totalPage = response.pageInfo.totalPage;
                } else {
                    alert("Res sync error");
                    this.layoutService.hide();                   
                }
        }).catch((e) => this.onRejected(e));

    }

}
