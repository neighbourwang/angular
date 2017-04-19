import { Component, ViewChild, OnInit } from '@angular/core';

import { Router ,ActivatedRoute,Params} from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent  } from '../../../../architecture';

//model
import{AccountListModel,EnterpriseModel} from '../model/account-list.model';

//service
import { AliCloudSubAccountEditService} from '../service/ali-cloud-subAccount-edit.service'
@Component({
    selector: 'ali-cloud-subAccount-enterprise',
    templateUrl: '../template/ali-cloud-subAccount-enterprise.html',
    styleUrls: [],
    providers: []
})

export class AliCloudSubAccountEnterpriseComponent implements OnInit{

    constructor(
        private route : Router,
        private activeRoute:ActivatedRoute,
        private service : AliCloudSubAccountEditService,
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
       // this.getAccount(this.account.id);
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
                    this.account = response["resultContent"].find((e)=>{return e.id ==this.account.id});
                    this.changeEntName=this.account.tenantName;
                    console.log("子账号信息",this.account);
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
        if(this.account.tenantName != selectEnt.tenantName){
            this.noticeTitle="设置企业";
            this.noticeMsg="企业已从'"+this.account.tenantName+ "'变更为'"+selectEnt.tenantName+"'。 确认是否保存";
        }
        this.confirm.ccf = () => {};
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.saveSetEnt()
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
        const selectEnt=this.enterpriseList.find((e)=> {return e.isSelect});
        this.changeEntName= selectEnt.tenantName;
    }
    
    //选取企业
     getSelectEnt(selectedEnt: EnterpriseModel) {
        this.enterpriseList.forEach((selectedEnt) => {
            selectedEnt.isSelect = false;
        });
        selectedEnt.isSelect= true;
    }
    //跳转到账号列表
     gotoAccountList(){
           this.route.navigate([`ali-cloud/ali-cloud-subAccount/ali-cloud-subAccount-list`])
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
