import { Component, ViewChild, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LayoutService, NoticeComponent , ConfirmComponent, PopupComponent  } from '../../../../architecture';

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
        private layoutService : LayoutService
    ) {

    }

    noticeTitle = "";
    noticeMsg = "";

    @ViewChild("notice")
    notice: NoticeComponent;

    @ViewChild("confirm")
    confirm: ConfirmComponent;

    @ViewChild("editaccountType")
    editType:PopupComponent;

    accountList:Array<AccountListModel>;

    type: string;

    ngOnInit (){
        console.log('init');
    }

    //获取主账号列表
    getAccountList(){
        this.layoutService.hide();
        this.service.getMainAccounts() 
        .then(
                response => {
                    this.layoutService.hide();
                    if (response && 100 == response["resultCode"]) {
                        this.layoutService.hide();
                        this.accountList=response["resultContent"];
                    } else {
                        this.showAlert("COMMON.OPERATION_ERROR");
                    }
                }
            )
            .catch((e) => this.onRejected(e));      
    }

    //编辑账号类型
   editAccountType(){
      // const account=this.accountList.find((e)=>{return e.isSelect});
      this.editType.open("编辑账号类型");

   }

    //修改账号状态         
    changeAccountStatus(){
        // const account=this.accountList.find((e)=>{return e.isSelect});

    }

    //分配企业
    setEntprise(){
         //const account=this.accountList.find((e)=>{return e.isSelect});
          this.route.navigate([`ali-cloud/ali-cloud-mainAccount/ali-cloud-mainAccount-setEnterprise`])

    }

    //编辑账号
    editAccount(){
        this.type="edit";
         //const account=this.accountList.find((e)=>{return e.isSelect});
         this.route.navigate([`ali-cloud/ali-cloud-mainAccount/ali-cloud-mainAccount-edit`,{type:this.type}])

    }
    
    //查看账号详细
    viewAccount(){
        this.type="view";
        this.route.navigate([`ali-cloud/ali-cloud-mainAccount/ali-cloud-mainAccount-edit`,{type:this.type}])

    }
    //跳转添加主账号
    createAccount(){
        this.type="create";
        this.route.navigate([`ali-cloud/ali-cloud-mainAccount/ali-cloud-mainAccount-edit`,{type:this.type}])
    }
     //跳转管理子账号
     gotoSubAccountList(){
        this.route.navigate([`ali-cloud/ali-cloud-subAccount/ali-cloud-subAccount-list`])
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
