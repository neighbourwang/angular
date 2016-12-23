import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService, PopupComponent, NoticeComponent } from '../../../../architecture';

//service
import { GetPersonAccService } from '../service/person-acc-get.service';
import { PutLocalAccService } from '../service/person-acc-put.service';
import { EditPersonAccPwdService } from '../service/person-acc-pwd.service';

//model
import { PersonAcc, PersonAccPwd } from '../model/person-acc.model';

@Component({
    selector: 'person-acc-mng',
    templateUrl: '../template/person-acc-mng.component.html',
    styleUrls: ['../style/person-acc-mng.less'],
    providers: []
})

export class PersonAccMngComponent implements OnInit {
    constructor(
        private router: Router,
        private getPersonAcc: GetPersonAccService,
        private putPersonAcc: PutLocalAccService,
        private putPersonAccPwd: EditPersonAccPwdService,
        private validService: ValidationService,
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
        this.getPersonAcc.getPersonAcc().then(
            response => {
                if (response && 100 == response.resultCode) {
                    console.log(response);
                    this.personAcc = Object.assign({}, response.resultContent)
                    this.temPersonAcc = response.resultContent;
                    console.log(this.personAcc);
                } else {

                }
            }).catch((err) => {
                console.error(err);
            });
    }
    //编辑账号
    onEdit() {
        this.router.navigate(['user-center/person-acc-mng/person-acc-edit'])
    }

    //编辑姓名
    name: boolean = true;
    nameEdit: boolean = false;
    userNameValid: boolean = true;
    editName() {
        this.name = false;
        this.nameEdit = true;
        this.cancelPhone();
        this.cancelDesc();
    }
    saveName() {
        if (this.personAcc.userName) {
            console.log(this.personAcc);
            this.saveEditPerAcc().then(() => {
                this.name = true;
                this.nameEdit = false;
            });
        } else {
            this.userNameValid = false;
            this.notice.open('操作错误', '姓名不能为空')
        }
    }
    cancelName() {
        this.personAcc.userName = this.temPersonAcc.userName;
        this.name = true;
        this.nameEdit = false;
    }

    //编辑电话
    //验证手机号    
    phone: boolean = true;
    phoneEdit: boolean = false;
    editPhone() {
        this.phone = false;
        this.phoneEdit = true;
        this.cancelName();
        this.cancelDesc();
    }
    savePhone() {
        if (this.personAcc.phone) {
            if (this.validService.isMoblie(this.personAcc.phone)) {
                this.saveEditPerAcc().then(() => {
                    this.phone = true;
                    this.phoneEdit = false;
                });
            } else {
                this.notice.open('操作错误', '手机号码输入错误,请输入正确的手机号')
            }
        } else {
            this.notice.open('操作错误', '手机号码不能为空')
        }
    }
    cancelPhone() {
        this.personAcc.phone = this.temPersonAcc.phone;
        this.phone = true;
        this.phoneEdit = false;
    }
    //编辑描述
    desc: boolean = true;
    descEdit: boolean = false;
    editDesc() {
        this.desc = false;
        this.descEdit = true;
        this.cancelName();
        this.cancelPhone();
    }
    saveDesc() {
        this.saveEditPerAcc().then(() => {
            this.desc = true;
            this.descEdit = false;
        });
    }
    cancelDesc() {
        this.personAcc.description = this.temPersonAcc.description;
        this.desc = true;
        this.descEdit = false;
    }
    //编辑密码
    accPwd: PersonAccPwd = new PersonAccPwd();
    passwordValid: boolean = true;
    newPasswordValid: boolean = true;
    sameNewPassword: boolean = false;
    samePassword: boolean = true;
    active: boolean = true;
    editPwd() {
        this.accPwd = new PersonAccPwd();
        this.active = false;
        setTimeout(() => {
            this.active = true;
        }, 0)
        this.samePassword = true;
        this.passwordValid = true;
        this.newPasswordValid = true;
        this.sameNewPassword = false;
        this.accPwd.password = '';
        this.accPwd.newPassword = '';
        this.accPwd.confirmPwd = '';
        this.editPassWord.open('修改密码')
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
            this.accPwd.id = this.personAcc.id;
            console.log(this.accPwd);
            this.putPersonAccPwd.putPersonAccPwd(this.accPwd).then(
                response => {
                    if (response && 100 == response.resultCode) {
                        console.log(response);
                        this.editPassWord.close();
                        this.notice.open('操作成功', '新密码已生效');
                    }
                }).catch((err) => {
                    this.editPassWord.close();
                    this.notice.open('操作错误', 'you have input wrong password')
                });
        } else {
            this.samePassword = false;
        }
    }
    ccf() {

    }
    nof() {

    }
    saveEditPerAcc() {
        return this.putPersonAcc.putLocalAcc(this.personAcc.id, this.personAcc).then(response => {
            console.log(response);
            this.getCurrentAccount();
        }).catch(err => {
            console.error(err);
        })
    }
    clear(val) {
        console.log(val);
        this.personAcc[val] = '';
    }
}