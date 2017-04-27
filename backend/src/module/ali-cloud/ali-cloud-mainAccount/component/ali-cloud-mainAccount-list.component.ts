import { Component, ViewChild, OnInit } from '@angular/core';

import { Router,Params,ActivatedRoute} from '@angular/router';

import { LayoutService,NoticeComponent,ConfirmComponent,PopupComponent,dictPipe  } from '../../../../architecture';

//model
import{AccountListModel} from '../model/account-list.model';

//service
import { AliCloudMainAccountMngService} from '../service/ali-cloud-mainAccount-list.service'

@Component({
    selector: 'ali-cloud-mainAccount-list',
    templateUrl: '../template/ali-cloud-mainAccount-list.html',
    styleUrls: [],
    providers: []
})

export class AliCloudMainAccountListComponent implements OnInit{

    constructor(
        private route : Router,
        private service : AliCloudMainAccountMngService,
        private layoutService : LayoutService,
        private dictPipe : dictPipe
    ) { }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("editaccountType")
    editType:PopupComponent;

    accountList:Array<AccountListModel>;
    account:AccountListModel=new AccountListModel;

    type: string;
    selectAccountType:string="";

    ngOnInit (){
        console.log('init');
        this.getAccountList();
    }

    //获取主账号列表
    getAccountList(){
        this.layoutService.show();
        this.service.getMainAccounts() 
        .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.accountList=response["resultContent"];
                        console.log(this.accountList);
                    } 
                    else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));      
    }

    //编辑账号类型弹出框 1独享 2共享  还需要修改
    editAccountType(){
        const selectAccount=this.accountList.find((e)=>{return e.isSelect});
        if(!selectAccount){
            this.showAlert("请选择需要编辑的账号！");
            return;
        }
        if(selectAccount.mainAccountType =="1" && selectAccount.tenantCross !="" ){
            this.showAlert("独享主账号分配给了企业后，不能改账号类型，请先移除其所分配的企业。");
            return;  
        }     
        if( selectAccount.mainAccountType =="2" && selectAccount.isEditable!="" ){
            this.showAlert("共享主账号中的任何子账号分配出去后，不能更改账号类型，请先将所有账号的所属都移除");
            return;  
        }                                 
        this.selectAccountType=selectAccount.mainAccountType; 
        let editAccount= new AccountListModel();
        editAccount= selectAccount;
        this.account= editAccount; 
        this.editType.open("编辑账号类型"); 
    }
    //确认修改账号类型
    confirmAccountType(){
         this.layoutService.show();
         this.service.editAccountType(this.account.id,this.selectAccountType)
            .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        console.log("修改后的账号类型",this.selectAccountType)
                          this.editType.close();   
                        this. gotoAccountList();
                    } 
                    else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));      
    }

    //启用主账号
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
    
    //禁用主账号
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
    //修改账号状态    2禁用 1启用   
    // changeAccountStatus(status:string){
    //     const account=this.accountList.find((e)=>{return e.isSelect});
    //     if(!account){
    //         this.showAlert("请选择需要编辑的账号！");
    //         return;
    //     }
    //     if(account.status==status){          
    //         this.dictPipe.transform(account.status,this.service.dictStatus)
    //         .then(
    //             res=> {
    //                // this.showAlert("PHYSICAL_MNG.PHYSICAL_STATUS^^^" + res);
    //             this.showAlert("该账号已经是"+res+"状态!");
    //             }) ;                 
    //         return;
    //     }
    //     switch(status){
    //         case "2":
    //             this.noticeMsg="您选择禁用账号'"+account.loginName +"',请确认；如果确认，用户将不能够访问阿里云。";
    //             this.noticeTitle="禁用阿里云主账号";
    //             break;
    //         case "1":
    //             this.noticeMsg="您选择启用账号'"+account.loginName +"',请确认；如果确认，用户将能够访问阿里云。";
    //             this.noticeTitle="启用阿里云主账号";
    //             break;
    //         // case "2":
    //         //     if(account.mainAccountType =="1" ){
    //         //         if( account.tenantCross=="" && account.status=="0"){
    //         //              this.noticeMsg="您选择删除'"+account.loginName +"'阿里云主账号,请确认；如果确认，此阿里云账号数据(包括子账号)将不能恢复。";
    //         //              this.noticeTitle="删除阿里云主账号";
    //         //         }
    //         //         else{
    //         //             this.showAlert("独享主账号不属于任何企业且禁用状态时，才可以删除!");
    //         //             return ;
    //         //         }               
    //         //     }             
    //         //    else if(account.mainAccountType =="2" && account.hasSubAccount=="0" && account.status=="0"){
    //         //         this.noticeMsg="您选择删除'"+account.loginName +"'阿里云主账号,请确认；如果确认，此阿里云账号数据(包括子账号)将不能恢复。";
    //         //         this.noticeTitle="删除阿里云主账号";
    //         //     }
    //         //     else{
    //         //         this.showAlert("共享主账号只有将所有子账号的企业或部门设置移除且禁用状态，才能删除该主账号！");
    //         //         return;
    //         //     }             
    //     }
    //     this.confirm.ccf = () => {};
    //     this.confirm.cof = () => {
    //         this.layoutService.show();
    //         this.service.updateStatusAndDelete(account.id, status)
    //             .then(
    //                 response => {
    //                     this.layoutService.hide();
    //                     if (response && 100 == response["resultCode"]) {
    //                         this.getAccountList();
    //                     }
    //                     else {
    //                         this.showAlert("COMMON.OPERATION_ERROR");
    //                     }
    //                 }
    //             )
    //             .catch((e) => this.onRejected(e));
    //     };
    //     this.confirm.open();           
    // }

    //分配企业 独享账号,才能点分配企业 1独享 2共享
    setEntprise(){
        const account=this.accountList.find((e)=>{return e.isSelect});
        if(!account){
            this.showAlert("请选择需要编辑的账号！")
            return ;
        }
        if(account.mainAccountType =="1" && account.status =="2"){
          this.route.navigate([`ali-cloud/ali-cloud-mainAccount/ali-cloud-mainAccount-setEnterprise`,{id:account.id}])
        }
        else{
            this.showAlert("只有账号类型为独享账号且为禁用状态时，才能分配企业！");
            return;
        }
    }

    //编辑账号
    editAccount(){
        this.type="edit";
         const account=this.accountList.find((e)=>{return e.isSelect});
         if(!account){
            this.showAlert("请选择需要编辑的账号！")
            return ;
        }
         this.route.navigate([`ali-cloud/ali-cloud-mainAccount/ali-cloud-mainAccount-edit`,{type:this.type,id:account.id}])
    }
    
    //查看账号详细
    viewAccount(account:AccountListModel){
        this.type="view";
        this.route.navigate([`ali-cloud/ali-cloud-mainAccount/ali-cloud-mainAccount-edit`,{type:this.type,id:account.id}])
    }

    //删除账号 jiekou
    deleteAccount(){
        const account=this.accountList.find((e)=>{return e.isSelect});
        if(!account){
            this.showAlert("请选择需要编辑的账号！")
            return ;
        }
         if(account.mainAccountType =="1" ){
            if( account.tenantCross==null  && account.status=="2"){
                    this.noticeMsg="您选择删除'"+account.loginName +"'阿里云主账号,请确认；如果确认，此阿里云账号数据(包括子账号)将不能恢复。";
                    this.noticeTitle="删除阿里云主账号";
            }
            else{
                this.showAlert("独享主账号不属于任何企业且禁用状态时，才可以删除!");
                return ;
            }               
        }             
        else if(account.mainAccountType =="2" && account.isEditable=="0" && account.status=="2"){
            this.noticeMsg="您选择删除'"+account.loginName +"'阿里云主账号,请确认；如果确认，此阿里云账号数据(包括子账号)将不能恢复。";
            this.noticeTitle="删除阿里云主账号";
        }
        else{
            this.showAlert("共享主账号只有将所有子账号的企业或部门设置移除且为禁用状态，才能删除该主账号！");
            return;
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
    }

    //跳转添加主账号
    createAccount(){
        this.type="create";
        this.route.navigate([`ali-cloud/ali-cloud-mainAccount/ali-cloud-mainAccount-edit`,{type:this.type}])
    }

    //跳转管理子账号   1独享账号不能点击
    gotoSubAccountList(){
        const account=this.accountList.find((e)=>{return e.isSelect});
         if(!account){
            this.showAlert("请选择需要编辑的账号！")
            return ;
        }
        if(account.mainAccountType =="1"){
            this.showAlert("独享账号不能管理子账号，请选择共享账号！")
            return ;
        }
        else this.route.navigate([`ali-cloud/ali-cloud-subAccount/ali-cloud-subAccount-list`,{id:account.id}])
    }

    //跳转到账号列表
     gotoAccountList(){
           this.route.navigate([`ali-cloud/ali-cloud-mainAccount/ali-cloud-mainAccount-list`])
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
