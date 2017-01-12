import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent,dictPipe,ConfirmComponent,PaginationComponent } from "../../../../architecture";

import { PhysicalListService } from "../service/physical-list.service";

import { PhysicalListModel } from "../model/physicalList.model";
import { PhysicalModel } from "../model/physical.model";
import { PmQuery } from "../model/pmQuery.model";




@Component({
    selector: "physical-list",
    templateUrl: "../template/physical-list.html",
    styleUrls: [],
    providers: []
})
export class PhysicalListComponent implements OnInit {
    constructor(
        private activeRoute: ActivatedRoute,
        private route: Router,
        private service: PhysicalListService,
        private layoutService: LayoutService,
        private validationService: ValidationService,
        private dictPipe : dictPipe
    ) {
    }

    noticeTitle = "";
    noticeMsg = "";
   
    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("page")
    page: PaginationComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    totalPage = 1;
    pageIndex =1;
    pageSize = 20;


    physicalList:Array< PhysicalListModel>;
    pmQuery:PmQuery;
    physical:PhysicalModel;
    type: string;
    poolId:string;
    poolName:string;
    region:string;
    dataCenter:string;
    //gotopage:string;
    selectedQuery:string;
    queryParam:string;
    //title: string;

    ngOnInit() {
        this.activeRoute.params.forEach((params: Params) => {
            const id = params["id"];
            this.poolId=id;    
            this.poolName = params['name'];  
            this.region = params['region'];  
            this.dataCenter = params['dataCenter'];   
            this.getPhysicalList();

        });
    }

   //获取物理机列表
     getPhysicalList(index?: number) {
        this.pageIndex = index || this.pageIndex;
        this.layoutService.show();
         console.log("物理机",this.pmQuery);
        this.service.getPhysicals(this.pageIndex, this.pageSize,this.pmQuery)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.physicalList = response["resultContent"];
                        console.log("物理机list",this.physicalList);
                        this.totalPage = response.pageInfo.totalPage;
                    } else {
                        alert("Res sync error");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }
    
    //删除、修改物理机的状态 0禁用 1启用 2删除
    changePhysicalStatusAndDelete(status:string){
        const physical=this.getSelectPhysical();
        console.log("选择的物理机",physical.pmName);
        if(!physical){
            this.showAlert("请选择需要编辑的物理机");
            return;
        }
        if(physical.pmMainStatus==status){
            this.showAlert(`该物理机已经是${this.dictPipe.transform("physical.pmMainStatus",this.service.dictProductType)}状态！`);
            return;
        }
         switch (status) {
                case "0":
                   this.noticeMsg = `确认禁用'${physical.pmName}' ?`;
                   this.noticeTitle=`禁用物理机`;
                    break;
                case "1":
                   this.noticeMsg = `确认启用'${physical.pmName}' ?`;
                   this.noticeTitle=`启用物理机`;
                    break;
                case "2":
                    this.noticeMsg = `确认删除'${physical.pmName}' ?`;
                    this.noticeTitle=`删除物理机`;
                    break;
            }
        this.confirm.ccf = () => {
        };
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.updateStatusAndDelete(physical.pmId, status)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getPhysicalList();
                        } else {
                            alert("Res sync error");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        };
        this.confirm.open();
    }
    
    //返回资源池列表
    gotoPool(){
        this.route.navigate(['phy-mng/phy-pool/phy-pool-mng'])
    }

    //添加物理机
    createPhysical(){
        this.type="create";
        this.route.navigate(['physical-mng/physical-mng/physical-edit',{type:this.type}])

    }

    //跳转查看物理机
    gotoPhysicalView(){
        this.type="view";
        const physical=this.getSelectPhysical();
        if(!physical){
            this.showAlert("请选择需要查看的物理机");
            return;
        }
        this.route.navigate(['physical-mng/physical-mng/physical-edit',{type:this.type,id:physical.pmId}])
    }

    //跳转编辑物理机
    editPhysical(){
        this.type="edit";
        const physical=this.getSelectPhysical();
        if(!physical){
            this.showAlert("请选择需要编辑的物理机");
            return;
        }
        this.route.navigate(['physical-mng/physical-mng/physical-edit',{type:this.type,id:physical.pmId,poolId:this.poolId}])
    }

    //跳转编辑ipmi信息
    changeIpmiInfo(){
        const physical=this.getSelectPhysical();
        if(!physical){
            this.showAlert("请选择需要编辑的物理机");
            return;
        }
        this.route.navigate(['physical-mng/physical-mng/physical-ipmiInfoChange',{id:physical.pmId}])

    }


    //选择物理机
    getSelectPhysical(): PhysicalListModel{
        const physical = this.physicalList.find((o) => { return o.isSelect });
        return physical;
    }

    //搜索
    search(){      
        this.pmQuery= new PmQuery();
       
        if(this.selectedQuery == "物理机名称"){
            this.pmQuery.pmName= this.queryParam;
        }
        else if(this.selectedQuery == "品牌"){
            this.pmQuery.brand= this.queryParam;
        }
       else if(this.selectedQuery == "型号"){
            this.pmQuery.model= this.queryParam;
        }
        else if(this.selectedQuery == "私网IP地址"){
            this.pmQuery.privateIpAddr= this.queryParam;
        }
        else if(this.selectedQuery == "公网IP地址"){
            this.pmQuery.publicIpAddr= this.queryParam;
        } 
         else if(this.selectedQuery == "IPMI地址"){
            this.pmQuery.iloAddr= this.queryParam;
        }    
        this.getPhysicalList();
        this.page.render(1);
    }
    

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "提示";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("获取数据失败！");
    }
}