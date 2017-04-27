import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,ActivatedRoute,Params } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent  } from '../../../../architecture';

//model
import{AccountListModel} from '../model/account-list.model';
//service
import { AliCloudSubAccountMngService} from '../service/ali-cloud-subAccount-mng.service'

@Component({
    selector: 'ali-cloud-subAccount-list',
    templateUrl: '../template/ali-cloud-subAccount-list.html',
    styleUrls: [],
    providers: []
})

export class AliCloudSubAccountListComponent implements OnInit{

    constructor(
        private route : Router,
        private activeRoute:ActivatedRoute,
        private service : AliCloudSubAccountMngService,
        private layoutService : LayoutService
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

     type: string;
     mainLoginName:string;
     mainAccountId:string;
     accountList:Array<AccountListModel>;

    ngOnInit (){
        console.log('init');
         this.activeRoute.params.forEach((params: Params) => {
             this.mainAccountId=params["id"];
        });
        this.getAccountList();
        this.getAccount();
    }

    //获取子账号列表
    getAccountList(){
        this.layoutService.hide();
        this.service.getSubAccounts( this.mainAccountId) 
        .then(
            response => {
                this.layoutService.hide();
                if (response && 100 == response["resultCode"]) {
                    this.layoutService.hide();
                    this.accountList=response["resultContent"];
                    console.log(this.accountList)
                }
                 else {
                    this.showAlert("COMMON.OPERATION_ERROR");
                }
            }
        )
        .catch((e) => this.onRejected(e));      
    }
     //获取主账号信息
    getAccount(){
        this.layoutService.hide();
        this.service.getMainAccount( this.mainAccountId)
             .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.mainLoginName= response["resultContent"].loginName;
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));
    }
     //启用子账号
    enableAccount(){
        const account=this.accountList.find((e)=>{return e.isSelect});
        if(!account){
            this.showAlert("请选择需要编辑的账号！");
            return;
        }
        if(account.status=="1"){          
            this.showAlert("该账号已经是启用状态!");                
            return;
        }
        console.log(account)
        this.noticeMsg="您选择启用账号'"+account.loginName +"',请确认；如果确认，用户将能够访问阿里云。";
        this.noticeTitle="启用阿里云主账号";
        this.confirm.ccf = () => {};
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.enableAccount(account.id)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getAccountList();
                        }
                        else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        };
        this.confirm.open();    
    }
    
    //禁用子账号
    disableAccount(){
        const account=this.accountList.find((e)=>{return e.isSelect});
        if(!account){
            this.showAlert("请选择需要编辑的账号！");
            return;
        }
        if(account.status=="2"){          
            this.showAlert("该账号已经是禁用状态!");                
            return;
        }
        this.noticeMsg="您选择禁用账号'"+account.loginName +"',请确认；如果确认，用户将不能够访问阿里云。";
        this.noticeTitle="禁用阿里云主账号";
        this.confirm.ccf = () => {};
        this.confirm.cof = () => {
            this.layoutService.show();
            this.service.disableAccount(account.id)
                .then(
                    response => {
                        this.layoutService.hide();
                        if (response && 100 == response["resultCode"]) {
                            this.getAccountList();
                        }
                        else {
                            this.showAlert("COMMON.OPERATION_ERROR");
                        }
                    }
                )
                .catch((e) => this.onRejected(e));
        };
        this.confirm.open();    
    }

     //删除账号
    deleteAccount(){
        const account=this.accountList.find((e)=>{return e.isSelect});
        if(!account){
            this.showAlert("请选择需要删除的账号！")
            return ;
        }
        if( account.tenantName ==null && account.status=="2" && account.departName ==null){
                this.noticeMsg="您选择删除'"+account.loginName +"'阿里云子账号,请确认；如果确认，此阿里云账号数据将不能恢复。";
                this.noticeTitle="删除阿里云子账号";
        }
        else{
            this.showAlert("子账号不属于任何企业和部门且为禁用状态时，才可以删除!");
            return ;
        }                            
      
        this.layoutService.hide();
        this.confirm.ccf = () => {};
        this.confirm.cof = () => {
            this.service.deleteAccount(account.id)
            .then(
                response=>{
                    this.layoutService.hide();
                    this.getAccountList();
                }
            )
           .catch((e) => this.onRejected(e))  
        }  
        this.confirm.open();       
    }


   //查看账号详细
    viewAccount(account:AccountListModel){
        this.type="view";
        this.route.navigate([`ali-cloud/ali-cloud-subAccount/ali-cloud-subAccount-edit`,{type:this.type,id:account.id,mainId:this.mainAccountId}])
    }
    //跳转添加子账号
    createAccount(){
         this.type="create";
        this.route.navigate([`ali-cloud/ali-cloud-subAccount/ali-cloud-subAccount-edit`,{type:this.type,mainId:this.mainAccountId}])
    }

    //编辑账号
    editAccount(){
        this.type="edit";
         const account=this.accountList.find((e)=>{return e.isSelect});
         this.route.navigate([`ali-cloud/ali-cloud-subAccount/ali-cloud-subAccount-edit`,{type:this.type,id:account.id,mainId:this.mainAccountId}])
    }

     //分配企业
    setEntprise(){
         const account=this.accountList.find((e)=>{return e.isSelect});
          if(!account){
            this.showAlert("请选择需要编辑的账号！")
            return ;
        }
        if(account.departName==null){
          this.route.navigate([`ali-cloud/ali-cloud-subAccount/ali-cloud-subAccount-setEnterprise`,{id:account.id,mainId:this.mainAccountId}])
        }
        else{
            this.showAlert("只有该子账号没有分配给全部部门或单一部门时，才能重新分配企业！");
            return;
        }
    }

    
    //选取账号
     getSelectAccount(selectedAccount: AccountListModel) {
        this.accountList.forEach((selectedAccount) => {
            selectedAccount.isSelect = false;
        });
        selectedAccount.isSelect= true;
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
