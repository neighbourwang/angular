import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService, PopupComponent ,NoticeComponent} from '../../../../architecture';

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
        private putPersonAccPwd:EditPersonAccPwdService
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
                } else {

                }
            }).catch((err) => {
                console.error(err);
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
        this.editPassWord.open('修改密码')
    }
    otEditPwd() {
        console.log(this.accPwd);
        if(this.accPwd.password&&this.accPwd.password.trim()!=''){            
            this.passwordValid=true;
        }else{
            this.passwordValid=false;
            return;
        }
        if(this.accPwd.newPassword&&this.accPwd.newPassword.trim()!=''){
            this.newPasswordValid=true;            
        }else{
            this.newPasswordValid=false; 
            return;
        }
        if(this.accPwd.password==this.accPwd.newPassword){
            this.sameNewPassword=true; 
            return;
        }     

        if(this.accPwd.newPassword == this.accPwd.confirmPwd){
            this.accPwd.id = this.personAcc.id;
            console.log(this.accPwd);
            this.putPersonAccPwd.putPersonAccPwd(this.accPwd).then(
            response => {
                if (response && 100 == response.resultCode) {
                    console.log(response);
                    this.editPassWord.close();
                    this.notice.open('操作成功','新密码已生效');
                } 
            }).catch((err) => {
                this.editPassWord.close();
                this.notice.open('操作错误','you have input wrong password')
            });
        }else{
            this.samePassword=false;
        }        
    }
    // otEditPwd() {
    //     this.accPwd.id=this.personAcc.id;
    //     console.log(this.accPwd);
    //     this.putPersonAccPwd.putPersonAccPwd(this.accPwd).then(
    //         response => {
    //             if (response && 100 == response.resultCode) {
    //                 console.log(response);
    //             } else {

    //             }
    //         }).catch((err) => {
    //             console.error(err);
    //         });
    // }
    ccf() {

    }
    nof(){
        
    }
    //cancel edit
    cancel() {
        this.personAcc = this.temPersonAcc;
        this.edit = false;
    }
    //submit edit
    onSubmit() {
        console.log(this.personAcc);
        this.putPersonAcc.putPersonAcc(this.personAcc.id, this.personAcc).then(response => {
            console.log(response);
            if (response && 100 == response.resultCode) {
                this.edit = false;
            } else {

            }
        }).catch(err => {
            console.error(err)
        })
    }
}