import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService, PopupComponent ,NoticeComponent} from '../../../../architecture';

import { Validation, ValidationRegs } from '../../../../architecture';

//service
import { GetPersonAccService } from '../service/person-acc-get.service';
import { PutPersonAccService } from '../service/person-acc-put.service';
import { EditPersonAccPwdService } from '../service/person-acc-pwd.service';



//model
import { PersonAcc, PersonAccPwd} from '../model/person-acc.model';

@Component({
    selector: 'person-acc-mng',
    templateUrl: '../template/person-acc-mng.component.html',
    styleUrls: [],
    providers: []
})

export class PersonAccMngComponent implements OnInit {
    constructor(
        private router: Router,
        private getPersonAcc: GetPersonAccService,
        private putPersonAcc: PutPersonAccService,
        private putPersonAccPwd:EditPersonAccPwdService,
        private validationService:ValidationService,
        private layoutService :LayoutService,
        private v: Validation,
    ) { }
    @ViewChild('editPassWord')
    editPassWord: PopupComponent;
    @ViewChild('notice')
    notice: NoticeComponent;
    personAcc: PersonAcc = new PersonAcc();
    temPersonAcc: PersonAcc = new PersonAcc();

    edit: boolean;
    ngOnInit() {
        this.edit = false;
        this.getCurrentAccount();
    }
    //获取当前登录信息
    getCurrentAccount() {
        this.layoutService.show();
        this.getPersonAcc.getPersonAcc().then(
            response => {
                if (response && 100 == response.resultCode) {
                    console.log(response);
                    this.temPersonAcc=JSON.parse(JSON.stringify(response.resultContent));                    
                    this.personAcc = Object.assign({}, response.resultContent);
                    // this.temPersonAcc = Object.assign({}, this.personAcc);
                    // console.log('1',sessionStorage['userInfo']);
                    sessionStorage.removeItem('userInfo');
                    sessionStorage["userInfo"] = JSON.stringify(response.resultContent);
                    console.log(this.personAcc);
                    // console.log('2',sessionStorage['userInfo']);
                    this.layoutService.hide();
                } else {

                }
            }).catch((err) => {
                console.error(err);
                this.layoutService.hide();
            });
    }
    //编辑账号
    onEdit() {
        this.edit = true;
        // this.router.navigate(['user-center/person-acc-mng/person-acc-edit'])
    }
    //编辑密码
    accPwd: PersonAccPwd = new PersonAccPwd();
    passwordValid: boolean = true;
    newPasswordValid: boolean = true;
    sameNewPassword:boolean=false;
    samePassword: boolean = true;
    active:boolean=true;
    onEditPwd() {        
        this.accPwd= new PersonAccPwd();
        this.active=false;
        setTimeout(()=>{
            this.active=true;
        },0)
        this.samePassword=true;
        this.passwordValid= true;
        this.newPasswordValid= true;
        this.sameNewPassword=false;
        this.accPwd.password='';
        this.accPwd.newPassword='';
        this.accPwd.confirmPwd='';
        this.editPassWord.open('USER_CENTER.CHANGE_PASSWORD') //USER_CENTER.CHANGE_PASSWORD=>修改密码 

    }
    pwdValid(val){
        if (this.accPwd.password && this.accPwd.password.trim() != '') {
            this.passwordValid = true;
        } else {
            this.passwordValid = false;
        }    
    }
    newPwdValid(val){
        if (this.accPwd.newPassword && this.accPwd.newPassword.trim() != '') {
            this.newPasswordValid = true;
        } else {
            this.newPasswordValid = false;
        }
        if(this.accPwd.newPassword==this.accPwd.password){
            this.sameNewPassword=true;
        }else{
            this.sameNewPassword=false;
        }
    }

    otEditPwd() {
        console.log(this.accPwd);
        if (!this.passwordValid||!this.newPasswordValid||this.sameNewPassword) 
        {return;} 
     if (this.accPwd.newPassword == this.accPwd.confirmPwd) {
            this.accPwd.id = this.personAcc.userId;
            console.log(this.accPwd);
            this.putPersonAccPwd.putPersonAccPwd(this.accPwd).then(
                response => {
                    if (response && 100 == response.resultCode) {
                        console.log(response);
                        this.editPassWord.close();
                        this.notice.open('USER_CENTER.OPERATION_SUCCESS', 'USER_CENTER.NEW_PASSWORD_WORKED'); //USER_CENTER.NEW_PASSWORD_WORKED=>新密码已生效  //USER_CENTER.OPERATION_SUCCESS=>操作成功 
                    }else if(response &&response.resultCode==10001001){
                        this.editPassWord.close();
                        this.notice.open('COMMON.OPERATION_ERROR', 'you have input wrong password') //COMMON.OPERATION_ERROR=>操作错误 

                    }
                }).catch((err) => {
                    this.editPassWord.close();
                    this.notice.open('COMMON.OPERATION_ERROR', 'you have input wrong password') //COMMON.OPERATION_ERROR=>操作错误 

                });
        } else {
            this.samePassword = false;
        }
    }
    ccf() {

    }
    nof(){
        
    }
    //cancel edit
    cancel() {
        console.log(this.temPersonAcc);
        this.personAcc = Object.assign({},this.temPersonAcc);
        this.edit = false;
    }

    //表单验证
    checkForm(key?: string) {
        let regs: ValidationRegs = {  //regs是定义规则的对象
            userName: [this.personAcc.userName, [this.v.isInstanceName, this.v.isBase, this.v.isUnBlank], "用户名输入格式不正确"],
            // loginName: [this.account.loginName, [this.v.isEmail, this.v.isUnBlank], "USER_CENTER.ACCOUNT_FORMAT_ERROR"],
            //验证email
            // baseInput: [this.baseInput, [this.v.isBase, this.v.isUnBlank], "不能包含特殊字符"],
            //两次验证[基础的验证不能包含特殊字符，不能为空]
            // phone: [this.account.phone, [this.v.isMoblie, this.v.isUnBlank], "USER_CENTER.MOBILE_PHONE_FORMAT_ERROR"],
            //手机号码验证
            description:[this.personAcc.description, [this.v.maxLength(68)], "描述输入错误"],
        }
        console.log(this.v.check(key, regs));
        return this.v.check(key, regs);
    }
    //submit edit
    onSubmit() {
        let message=this.checkForm();
        if(message) return ;
        if(this.personAcc.phone){
            if(!this.validationService.isMoblie(this.personAcc.phone)){
            this.notice.open('COMMON.OPERATION_ERROR','USER_CENTER.MOBILE_PHONE_INPUT_ERROR'); //COMMON.OPERATION_ERROR=>操作错误  //USER_CENTER.MOBILE_PHONE_INPUT_ERROR=>手机号码输入错误 
            return;
        }
        }else{
            this.notice.open('COMMON.OPERATION_ERROR','USER_CENTER.MOBILE_PHONE_NOT_NULL'); //COMMON.OPERATION_ERROR=>操作错误  //USER_CENTER.MOBILE_PHONE_NOT_NULL=>手机号码不能为空 
            return;
        }        
        console.log(this.personAcc);
        this.layoutService.show();
        this.putPersonAcc.putPersonAcc(this.personAcc.userId, this.personAcc).then(response => {
            console.log(response);
            if (response && 100 == response.resultCode) {
                this.edit = false;
                this.getCurrentAccount();
            } else {

            }
            this.layoutService.hide();
        }).catch(err => {
            console.error(err);
            this.layoutService.hide();            
        })
    }
}