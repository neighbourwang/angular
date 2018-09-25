import { Component, ViewChild, OnInit } from '@angular/core';

import { Router ,ActivatedRoute,Params} from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent  } from '../../../../architecture';

//model
import{AccountListModel,EnterpriseModel} from '../model/account-list.model';

//service
import { AliCloudMainAccountEditService} from '../service/ali-cloud-mainAccount-edit.service'
@Component({
    selector: 'ali-cloud-mainAccount-enterprise',
    templateUrl: '../template/ali-cloud-mainAccount-enterprise.html',
    styleUrls: [],
    providers: []
})

export class AliCloudMainAccountEnterpriseComponent implements OnInit{

    constructor(
        private route : Router,
        private activeRoute:ActivatedRoute,
        private service : AliCloudMainAccountEditService,
        private layoutService : LayoutService
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    account:AccountListModel=new AccountListModel();
    enterpriseList:Array<EnterpriseModel>;
    changeEntName:string;

    @ViewChild("notice")
    notice: NoticeComponent;
    @ViewChild("confirm")
    confirm: ConfirmComponent;

    ngOnInit (){
        this.activeRoute.params.forEach((params: Params) => {
        this.account.id = params["id"];
        });
        this.getEnterprises();
        this.getAccount(this.account.id);
    }
     //获取账号信息
    getAccount(id:string){
        this.layoutService.hide();
        this.service.getAccount(id)
            .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.account = response["resultContent"];
                    this.changeEntName=this.account.tenantCross;
                    console.log("主账号信息",this.account);
                } else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
        )
        .catch((e) => this.onRejected(e));
    }

    //获取企业列表
    getEnterprises(){
        this.layoutService.show();
        this.service.getEnterpriseList()
        .then(
            response=>{
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.enterpriseList=response["resultContent"];
                } 
            }
        )
        .catch((e) => this.onRejected(e));
    }
    
    //保存企业设置
    setEnterprise(){
         const selectEnt=this.enterpriseList.find((e)=> {return e.isSelect});       
         let entId:string=" ";
         let entName:string=" ";
         if(!this.changeEntName){
            entId="";
            entName="";
         }
         else{
              entId=selectEnt.tenantId;
             entName=selectEnt.tenantName
        }
        console.log("传的企业",entId,entName)
        if( this.account.tenantCross==this.changeEntName){
            if(this.account.tenantCross==null){
                this.showAlert("ALI_CLOUD.PLEASE_SELECT_OTHER_NULL_ENTERPRISE");
                return;
            }
            else{
                this.showAlert("ALI_CLOUD.PLEASE_SELECT_OTHER_ENTERPRISE^^^"+this.account.tenantCross);
                return;
            }       
        }
        if(this.account.tenantCross != this.changeEntName){
             this.noticeTitle="ALI_CLOUD.ENTERPRISE_SET";
            if(!this.account.tenantCross){
                // this.noticeMsg="企业已变更为'"+entName+"'。 确认是否保存";
                 this.noticeMsg="ALI_CLOUD.ENTERPRISE_NAME_NULL_CHANGE^^^"+entName;
            }         
            else if(this.changeEntName){
               // this.noticeMsg="企业已从'"+this.account.tenantCross+ "'变更为'"+entName+"'。 确认是否保存";
               this.noticeMsg="ALI_CLOUD.ENTERPRISE_NAME_NOT_NULL_CHANGE^^^"+this.account.tenantCross +'^^^'+ entName;
            }
            else{
                this.noticeMsg="ALI_CLOUD.ENTERPRISE_NAME_CHANGE_NULL";//企业已重置, 确认是否保存
            }         
        }
        this.confirm.ccf = () => {};
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.saveSetEnt(this.account.id,entId)
            .then(
                response=>{
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.gotoAccountList();
                    } 
                }
            )
            .catch((e) => this.onRejected(e));
        }
         this.confirm.open(); 
    }

    //点击重置按钮
    changeEnt(){
        this.changeEntName="";
         const selectEnt=this.enterpriseList.find((e)=> {return e.isSelect});
         if(selectEnt){
            selectEnt.isSelect=false;
         }
        
    }
    
    //选取企业
     getSelectEnt(selectedEnt: EnterpriseModel) {
        this.enterpriseList.forEach((selectedEnt) => {
            selectedEnt.isSelect = false;
        });
        selectedEnt.isSelect= true;
        this.changeEntName=selectedEnt.tenantName;
    }
    //跳转到账号列表
     gotoAccountList(){
           this.route.navigate([`ali-cloud/ali-cloud-mainAccount/ali-cloud-mainAccount-list`])
     }

    showAlert(msg: string): void {
        this.layoutService.hide(); 
        this.noticeTitle = "NET_MNG_VM_DBT_PORT.PROMPT";
        this.noticeMsg = msg;
        this.notice.open();
    }

    showConfirm(msg: string): void {

    }

    onRejected(reason: any) {
        this.layoutService.hide();
        console.log(reason);
        this.showAlert("NET_MNG_VM_DBT_PORT.GETTING_DATA_FAILED");
    }

}
