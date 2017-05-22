import {Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, PaginationComponent, SystemDictionary, ValidationService} from "../../../../architecture";

import { MngServiceDetail } from "../model/mng-service-detail.model";
import { MngServiceList } from "../model/mng-service-list.model";

import { MngDetailService } from '../service/mng-detail.service';
import { MngService } from '../service/mng-service.service';

@Component({
    selector:"mng-service-detail",
    templateUrl:"../template/service-detail.html",
    styleUrls:[],
    providers:[]
})

export class MngServiceDetailComponent implements OnInit{
    constructor(
        private router : Router,
        private service : MngDetailService,
        private mngservice : MngService,
        private layoutService : LayoutService,
        private activatedRouter : ActivatedRoute,
        private validationService: ValidationService
    ){

    }

    @ViewChild("pager")
    pager: PaginationComponent;
    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild('confirm')
    confirm: ConfirmComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex= 1;
    pageSize= 10;
    totalPage= 1;

    type: string;
    serviceId: string;
    serviceInfo: MngServiceDetail= new MngServiceDetail();

    ngOnInit() {
        this.activatedRouter.params.forEach((params: Params) =>{
            this.serviceId= params["serviceId"];
        });
        console.log(this.serviceId,"this.serviceId");
        this.getInfo();
    }

    goBack(){
        this.router.navigate([`mtc-center/mng-service/mng-service-list`]);
    }

    getInfo(){
        this.layoutService.show();
        this.service.getInfo(this.serviceId)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.serviceInfo= response["resultContent"];
                        console.log("serviceInfo",this.serviceInfo);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }


    showAlert(msg: string): void {
        this.layoutService.hide();
        this.noticeTitle = "COMMON.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("COMMON.GETTING_DATA_FAILED");
    }
}
