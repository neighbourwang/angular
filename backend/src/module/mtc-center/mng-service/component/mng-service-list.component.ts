import {Component, ViewChild, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, PaginationComponent, SystemDictionary, ValidationService} from "../../../../architecture";

//model
import { Enterprise } from "../model/enterprise.model";
import { MngServiceList } from "../model/mng-service-list.model";

//service
import { MngService } from '../service/mng-service.service';

@Component({
    selector:"mng-service-list",
    templateUrl:"../template/service-list.html",
    styleUrls:['../style/mng-service-list.less'],
    providers:[]
})

export class MngServiceListComponent implements OnInit{
    constructor(
        private router : Router,
        private service : MngService,
        private layoutService : LayoutService,
        private validationService: ValidationService
    ){

    }

    @ViewChild("pager")
    pager: PaginationComponent;
    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild('confirm')
    confirm: ConfirmComponent;
    @ViewChild("popUnit")
    popUnit: PopupComponent;
    @ViewChild("setUnit")
    setUnit: PopupComponent;

    noticeTitle = "";
    noticeMsg = "";

    pageIndex= 1;
    pageSize= 10;
    totalPage= 1;

    typeDic: Array<SystemDictionary>;
    searchDic: Array<SystemDictionary>;

    type: string;
    ingSelected= false;
    overSelected= false;
    enterpriseList:Array<Enterprise>;
    enterpriseId= "";
    serviceName= "";
    serviceObjectCode= "";
    searchTypeCode: string;
    keyWords: string;
    serviceStatus: string;
    data: Array<MngServiceList>;
    followInfo: string;
    serviceId: string;

    ngOnInit() {
        this.getData();
        this.getEnterprises();
        this.service.searchDic.then(res =>{
            this.searchTypeCode= res[0].value
        });
    }

    getData(pageIndex?) {
        this.pageIndex= pageIndex || this.pageIndex;
        this.layoutService.show();
        this.service.getData(this.pageIndex, this.pageSize, this.serviceStatus, this.enterpriseId, this.serviceName, this.serviceObjectCode,
            this.searchTypeCode, this.keyWords)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.data= response["resultContent"];
                        //this.totalPage= response.pageInfo.totalPage;
                        console.log("data",response["resultContent"]);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    getEnterprises(){
        this.layoutService.show();
        this.service.getEnterprises()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.enterpriseList = response["resultContent"];
                        console.log("企业列表",this.enterpriseList);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    serviceUpdatePage(){
        this.type= "update";
        this.popUnit.open("服务状态更新");
    }

    servicefollowPage(){
        const selectedService= this.data.find((p) =>{
            return p.selected;
        });
        if(!selectedService){
            this.showAlert("请选择需要跟进的服务");
        }
        this.type= "follow";
        this.popUnit.open("服务跟进");
    }

/*    serviceFollow(){
        this.layoutService.show();
        this.service.serviceFollow()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.enterpriseList = response["resultContent"];
                        console.log("企业列表",this.enterpriseList);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }*/

    oneSet(){
        this.setUnit.open("一次性管理服务系统设置");
    }

    gotoDetail(){
        this.router.navigate([`mtc-center/mng-service/mng-service-detail`]);
    }

    selecteding(){
        this.overSelected= false;
        this.ingSelected= !this.ingSelected;
    }
    selectedover(){
        this.ingSelected= false;
        this.overSelected= !this.overSelected;
    }

    reset(){
        this.keyWords= "";
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
