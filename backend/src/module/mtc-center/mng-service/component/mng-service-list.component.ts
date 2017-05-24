import {Component, ViewChild, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent, PaginationComponent, SystemDictionary, ValidationService} from "../../../../architecture";

//model
import { Enterprise } from "../model/enterprise.model";
import { MngServiceList } from "../model/mng-service-list.model";
import { ServiceNameList } from "../model/servicename-list.model";

//service
import { MngService } from '../service/mng-service.service';

@Component({
    selector:"mng-service-list",
    templateUrl:"../template/service-list.html",
    styleUrls:[],
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

    pageIndex= 0;
    pageSize= 5;
    totalPage= 1;

    typeDic: Array<SystemDictionary>;
    searchDic: Array<SystemDictionary>;
    statusDic: Array<SystemDictionary>;
    serviceTypeDic: Array<SystemDictionary>;

    type: string;
    enterpriseList:Array<Enterprise>;
    enterpriseId= "";
    serviceId= ""; //管理服务Id
    serviceName= ""; //管理服务名称name
    serviceObjectCode= "";  //服务对象
    searchTypeCode: string;
    keyWords= "";
    serviceStatus= "";
    data: Array<MngServiceList>;
    Info: string;
    selectedServiceId: string;
    all: string;
    progress: string;
    complete: string;
    serviceNames: Array<ServiceNameList>= new Array<ServiceNameList>();
    instanceName= ""; //实例名称instanceName
    instanceNo= ""; //服务编号serviceNo

    ngOnInit() {
        this.service.searchDic.then(res =>{
            this.searchTypeCode= res[0].value
        });
        this.service.statusDic.then(res =>{
            this.serviceStatus= res[0].value;
            this.all= res[0].displayValue;
            this.progress= res[1].displayValue;
            this.complete= res[2].displayValue;
        });
        this.getEnterprises();
        this.getServiceNameList();
        this.getData();
    }

    getData(pageIndex?) {
        console.log("serviceStatus",this.serviceStatus);
        console.log("searchTypeCode",this.searchTypeCode);
        this.pageIndex= pageIndex || this.pageIndex;
        let s= this.serviceNames.find((p)=>{
            return p.serviceId == this.serviceId
        });
        this.serviceName =s &&s.serviceName || "";
        this.layoutService.show();
        this.service.getData(this.pageIndex, this.pageSize, this.serviceStatus, this.enterpriseId, this.serviceName, this.instanceName, this.instanceNo, this.serviceObjectCode )
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.data= response["resultContent"];
                        this.totalPage= response.pageInfo.totalPage;
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

    getServiceNameList(){
        this.layoutService.show();
        this.service.getServiceNameList()
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.serviceNames = response["resultContent"];
                        console.log("管理服务下拉框",this.serviceNames);
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    selectAll(){
        this.serviceStatus= "";
        this.getData();
    }

    selectProgress(){
        this.serviceStatus= "1";
        this.getData();
    }

    selectComplete(){
        this.serviceStatus= "2";
        this.getData();
    }

    searchServiceMng(){
        if(this.searchTypeCode == "0"){
            this.instanceName= this.keyWords;
            this.instanceNo= "";
        }else{
            this.instanceNo= this.keyWords;
            this.instanceName= "";
        }
        this.getData();
    }

    serviceUpdatePage(){
        const selectedService= this.data.find((p) =>{
            return p.selected;
        });
        if(!selectedService){
            this.showAlert("请选择需要跟进的服务");
        }else{
            this.type= "update";
            this.selectedServiceId= selectedService.serviceId;
            this.Info= "";
            this.popUnit.open("服务状态更新");
        }
    }

    servicefollowPage(){
        const selectedService= this.data.find((p) =>{
            return p.selected;
        });
        if(!selectedService){
            this.showAlert("请选择需要跟进的服务");
        }else{
            this.type= "follow";
            this.selectedServiceId= selectedService.serviceId;
            this.Info= "";
            this.popUnit.open("服务跟进");
        }
    }

    serviceFollow(){
        this.layoutService.show();
        this.service.serviceFollow(this.selectedServiceId, this.Info)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.getData();
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    serviceUpdate(){
        this.layoutService.show();
        this.service.serviceUpdate(this.selectedServiceId, this.Info)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.getData();
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    followOrupdate(){
        switch (this.type) {
            case "follow":
                this.serviceFollow();
                break;
            case "update":
                this.serviceUpdate();
                break;
        }
        this.popUnit.close();
    }

    gotoDetail(item){
        this.router.navigate([`mtc-center/mng-service/mng-service-detail`,{"serviceId":item.serviceId}]);
    }

    reset(){
        this.keyWords= "";
    }

    selected(item: MngServiceList){
        this.data.forEach((p) =>{
            p.selected= false;
        });
        item.selected= true;
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
