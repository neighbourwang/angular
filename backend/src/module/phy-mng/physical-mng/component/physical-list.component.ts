import { Component, ViewChild, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { LayoutService, ValidationService, NoticeComponent,dictPipe,ConfirmComponent,PaginationComponent,SystemDictionaryService} from "../../../../architecture";

import { PhysicalListService } from "../service/physical-list.service";

import { PhysicalListModel } from "../model/physicalList.model";
import { PhysicalModel } from "../model/physical.model";
import { PmQuery } from "../model/pmQuery.model";
import { Pool } from "../model/pool.model";



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
    pageSize = 10;


    physicalList:Array< PhysicalListModel>;
    phyList:Array<PhysicalListModel>;
    pmQuery:PmQuery=new PmQuery();
    pool:Pool;
   // physical:PhysicalModel;
    type: string;
    pmPoolId:string;
    poolName:string;
    region:string;
    dataCenter:string;
    //gotopage:string;
    selectedQuery:string=this.defaultQuery;
    defaultQuery:string;
    pmName:string="pmName";
    brand:string="brand";
    model:string="model";
    privateIp:string="privateIp";
    publicIp:string="publicIp";
    ipmi:string="Ipmi";
    queryParam:string;
    power:string;
    

    //title: string;

    ngOnInit() {
        this.activeRoute.params.forEach((params: Params) => {
            const id = params["pmpoolId"];
            console.log("获取的资源池id",id)
            this.pmPoolId=id;      
            this.getPoolInfo();
            this.getPhysicalList();
             });
            // this.getPhysicalList().then(()=>{
            //      for (var i = this.physicalList.length - 1; i >= 0; i--) {                
            //            //this.physicalList[i].pmPowerStatus= this.getPowerStatus(this.physicalList[i]);
            //            this.getPowerStatus(this.physicalList[i]);
            //               console.log("健康",this.physicalList[i].pmHealthExam)                       
            //         }                
            // });         
    }

   //获取物理机列表
    //  getPhysicalList(index?: number) :Promise<any>{
    //     this.pageIndex = index || this.pageIndex;
        
    //     this.layoutService.show();
        
    //    return  this.service.getPhysicals(this.pageIndex, this.pageSize,this.pmQuery,this.pmPoolId)
    //         .then(
    //             response => {
    //                 this.layoutService.hide();
    //                 if (response && 100 == response["resultCode"]) {
    //                     this.layoutService.hide();
    //                     this.physicalList = response["resultContent"];
    //                     this.physicalList.forEach((e)=>{e.pmHealthExam=""})
    //                     console.log("物理机list",this.physicalList);
    //                     console.log("物理机查询参数",this.pmQuery,this.queryParam);
    //                     this.totalPage = response.pageInfo.totalPage;
    //                     //this.checkListMiddleState();
    //                 } else {
    //                     this.showAlert("COMMON.OPERATION_ERROR");
    //                 }
    //             }
    //         )
    //         .catch((e) => this.onRejected(e));
    // }
     getPhysicalList(index?: number) :Promise<any>{
        this.pageIndex = index || this.pageIndex;
        
        this.layoutService.show();
        
       return  this.service.getPhysicals(this.pageIndex, this.pageSize,this.pmQuery,this.pmPoolId)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        
                        console.log("物理机list",this.physicalList);
                        console.log("物理机查询参数",this.pmQuery,this.queryParam);
                        this.totalPage = response.pageInfo.totalPage;
                        //this.checkListMiddleState();
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                    return response.resultContent;
                }
            )
            .then((res)=>{
                this.physicalList=res;
                this.physicalList.forEach((e)=>{e.pmHealthExam=""}) 
                this.checkListMiddleState();
            })
            .catch((e) => this.onRejected(e));
    }
    //检查物理机电源的状态
   isMiddleState(state) {
		return !!["0"].filter(v => v==state).length
	}

	checkListMiddleState() {

		let mkPromise = (pm) => this.isMiddleState(pm.pmPowerStatus) || !pm.pmPowerStatus ? this.service.getPhysicalPowerStatus(pm.pmId) : false
		let fecthMiddleStateList = this.physicalList.map(mkPromise)

		if(!fecthMiddleStateList.filter(l => l).length) return false;   //如果没有中间状态了 则不再循环
		Promise.all(fecthMiddleStateList).then(res => {
			res.forEach((pm, i) => {
				if(pm) {
                    this.physicalList[i].pmPowerStatus = pm.status;
                    if(this.physicalList[i].pmPowerStatus =="-1") this.physicalList[i].pmHealthExam ="0";
                    else this.physicalList[i].pmHealthExam ="1";  
                }
			})
			setTimeout(this.checkListMiddleState.bind(this) , 10 * 1000)
		})
	}
//获取物理机电源状态
getPowerStatus(pm:PhysicalListModel){
    this.layoutService.hide();    
      this.service.getPhysicalPowerStatus(pm.pmId)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.power = response["resultContent"].status;   
                        pm.pmPowerStatus=this.power; 
                        if(pm.pmPowerStatus =="2") pm.pmHealthExam ="1";
                          else pm.pmHealthExam ="0";
                         
                        console.log("pmpower",  this.physicalList,pm.pmHealthExam)   
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }              
            )
            .catch((e) => this.onRejected(e));
}

   
    //获取资源池信息
    getPoolInfo(){
        this.layoutService.show();    
        this.service.getPoolInfo(this.pmPoolId)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.pool = response["resultContent"];
                        console.log("物理机资源池信息",this.pool.poolName,this.pool.region,this.pool.dataCenter); 
                        this.poolName=this.pool.poolName;
                        this.region=this.pool.region;
                        this.dataCenter=this.pool.dataCenter;
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }

    
    //删除、修改物理机的运维状态 0禁用 1启用 2删除
    changePhysicalStatusAndDelete(status:string){
         const physical = this.physicalList.find((physical) => { return physical.isSelect });
        
        if(!physical){
            if(status=="0"){
               this.showAlert("PHYSICAL_MNG.SELECT_DISABLE_PHYSICAL");
                return;
            }
            if(status=="1"){
               this.showAlert("PHYSICAL_MNG.SELECT_ENABLE_PHYSICAL");
                return;
            }
            if(status=="2"){
               this.showAlert('PHYSICAL_MNG.SELECT_DELETE_PHYSICAL');
                return;
            }                   
        }
         console.log("选择的物理机",physical.pmName);
        if(physical.pmMainStatus==status){          
            this.dictPipe.transform(physical.pmMainStatus,this.service.dicMain)
            .then(
                res=> {
                    // console.log(res);
                    // this.i=res;
                    // console.log(this.i);
                    this.showAlert("PHYSICAL_MNG.PHYSICAL_STATUS^^^" + res);
                }
            ) ;          
           
            return;
        }
        if(status=="0"){
            if(physical.pmUseageStatus=="2" || physical.pmUseageStatus=="1"){
                this.showAlert("PHYSICAL_MNG.CAN_NOT_DISABLE_PHYSICAL");//已分配的物理机不能禁用,请选择未分配的物理机！
                return;
            }
             else{
                this.noticeMsg ="PHYSICAL_MNG.DISABLE_PHYSICAL_MSG^^^" + physical.pmName;
                this.noticeTitle="PHYSICAL_MNG.DISABLE_PHYSICAL_TITLE";
            }                   
        }
        else if(status=="1"){
            if(physical.partsNumber =="0"){
                this.showAlert("PHYSICAL_MNG.CAN_NOT_ENABLE_PHYSICAL");//该物理机没有进行物理机部件设置,无法启用,请先进行物理机部件设置！
                return;
            }          
           else{
                this.noticeMsg = "PHYSICAL_MNG.ENABLE_PHYSICAL_MSG^^^" + physical.pmName;
                this.noticeTitle="PHYSICAL_MNG.ENABLE_PHYSICAL_TITLE";
           }
        }
        else {
            if(physical.pmUseageStatus =="0" && physical.pmMainStatus =="0"){
                this.noticeMsg = "PHYSICAL_MNG.DELETE_PHYSICAL_MSG^^^" + physical.pmName;
                this.noticeTitle="PHYSICAL_MNG.DELETE_PHYSICAL_TITLE";
                  this.pageIndex=1;
        }
        else{
            this.showAlert("PHYSICAL_MNG.CAN_NOT_DELETE_PHYSICAL");//物理机使用状态为'未分配'且运维状态为'禁用'时才能删除物理机,该物理机不符合删除要求!
            return;
        }      
        // switch (status) {
        //         case "0":
        //             if(physical.pmUseageStatus=="已分配"){
        //                this.notice.open("提示","已分配的物理机不能禁用,请选择未分配的物理机！")
        //                return;
        //             }
        //            this.noticeMsg ="PHYSICAL_MNG.DISABLE_PHYSICAL_MSG^^^" + physical.pmName;
        //            this.noticeTitle="PHYSICAL_MNG.DISABLE_PHYSICAL_TITLE";
        //             break;
                   
        //         case "1":
        //            this.noticeMsg = "PHYSICAL_MNG.ENABLE_PHYSICAL_MSG^^^" + physical.pmName;
        //            this.noticeTitle="PHYSICAL_MNG.ENABLE_PHYSICAL_TITLE";
        //             break;
        //         case "2":
        //            if(physical.pmUseageStatus=="未分配"&&physical.pmMainStatus=="0"){
        //              this.noticeMsg = "PHYSICAL_MNG.DELETE_PHYSICAL_MSG^^^" + physical.pmName;
        //              this.noticeTitle="PHYSICAL_MNG.DELETE_PHYSICAL_TITLE";
        //              break;
        //            }                
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
                            this.showAlert("COMMON.OPERATION_ERROR");
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
        this.route.navigate(['phy-mng/physical-mng/physical-edit',{type:this.type,pmPoolId:this.pmPoolId}])
           //this.route.navigate(['phy-mng/physical-mng/physical-edit/${this.pmPoolId}',{type:this.type}])
    }

    //跳转查看物理机
    gotoPhysicalView(physical:PhysicalModel){
        this.type="view";
        
        this.route.navigate(['phy-mng/physical-mng/physical-edit',{type:this.type,id:physical.pmId,pmPoolId:this.pmPoolId}])
        //this.route.navigate(['phy-mng/physical-mng/physical-edit/${physical.pmId}',{type:this.type,poolId:this.pmPoolId}])
    }

    //跳转编辑物理机
    editPhysical(){
        this.type="edit";
          const physical = this.physicalList.find((physical) => { return physical.isSelect });
        if(!physical){
            this.showAlert("PHYSICAL_MNG.SELECT_PHYSICAL");
            return;
        }
        this.route.navigate(['phy-mng/physical-mng/physical-edit',{type:this.type,id:physical.pmId,pmPoolId:this.pmPoolId}])
        //this.route.navigate(['phy-mng/physical-mng/physical-edit/${physical.pmId}',{type:this.type,poolId:this.pmPoolId}])
    }

    //跳转编辑ipmi信息
    changeIpmiInfo(){
         const physical = this.physicalList.find((physical) => { return physical.isSelect });

        if(!physical){
            this.showAlert("PHYSICAL_MNG.SELECT_PHYSICAL");
            return;
        }
        this.route.navigate(['phy-mng/physical-mng/physical-ipmiInfoChange',{id:physical.pmId}])

    }
    
    //编辑物理机部件
    editPhysicalParts(){
         this.type="editParts";
         const physical = this.physicalList.find((physical) => { return physical.isSelect });
          if(!physical){
            this.showAlert("PHYSICAL_MNG.SELECT_PHYSICAL");
            return;
        }
        if(physical.pmMainStatus=="1"){
            this.showAlert("PHYSICAL_MNG.CAN_NOT_EDIT_PART");//物理机为启用状态，不能编辑物理机部件，请先禁用该物理机！
            return;
        }
         this.route.navigate(['phy-mng/physical-mng/physical-edit',{type:this.type,id:physical.pmId,pmPoolId:this.pmPoolId}])
        //this.route.navigate(['physical-mng/physical-mng/physical-edit/${physical.pmId}',{type:this.type,poolId:this.pmPoolId}])


    }


    //选择物理机
    getSelectPhysical(physical: PhysicalListModel) {
        this.physicalList.forEach((physical) => {
            physical.isSelect = false;
        });
        physical.isSelect= true;
    }

    //搜索
    search(){      
        this.pmQuery= new PmQuery();

         if(this.selectedQuery == "pmName"){
            this.pmQuery.pmName= this.queryParam;
        }
       
         else if(this.selectedQuery == "brand"){
            this.pmQuery.brand= this.queryParam;
        }
       else if(this.selectedQuery == "model"){
            this.pmQuery.model= this.queryParam;
        }
        else if(this.selectedQuery == "privateIp"){
            this.pmQuery.privateIpAddr= this.queryParam;
        }
        else if(this.selectedQuery == "publicIp"){
            this.pmQuery.publicIpAddr= this.queryParam;
        } 
         else if(this.selectedQuery == "Ipmi"){
            this.pmQuery.iloAddr= this.queryParam;
        }         
       this.pageIndex=1;   
        
        console.log(this.pmQuery.iloAddr);
        // this.page.render(1);
        this.getPhysicalList();
        this.page.render(1);
    }
    

    showAlert(msg: string): void {
        this.layoutService.hide();

        this.noticeTitle = "PHYSICAL_MNG.NOTICE";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {
    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("PHYSICAL_MNG.ERROR");
    }
}