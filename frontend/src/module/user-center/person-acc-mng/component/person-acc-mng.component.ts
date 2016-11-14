import { Component, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService,PopupComponent} from '../../../../architecture';

//service
import { GetPersonAccService } from '../service/person-acc-get.service';
import { PutPersonAccService } from '../service/person-acc-put.service';
import { EditPersonAccPwdService } from '../service/person-acc-pwd.service';

//model
import { PersonAcc, PersonAccPwd} from '../model/person-acc.model';

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
        private putPersonAcc: PutPersonAccService,
        private putPersonAccPwd:EditPersonAccPwdService
    ) { }
     @ViewChild('editPassWord')
    editPassWord: PopupComponent;
    // @ViewChild('notice')
    // notice: NoticeComponent;
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
    onEdit(){
        this.router.navigate(['user-center/person-acc-mng/person-acc-edit'])
    }    

    //编辑姓名
    name:boolean=true;
    nameEdit:boolean=false;
    editName(){
        this.name=false;
        this.nameEdit=true;
    }
    saveName(){
        this.name=true;
        this.nameEdit=false;
    }
    cancelName(){
        this.name=true;
        this.nameEdit=false;
    }

    //编辑电话
    phone:boolean=true;
    phoneEdit:boolean=false;
    editPhone(){
        this.phone=false;
        this.phoneEdit=true;
    }
    savePhone(){
        this.phone=true;
        this.phoneEdit=false;
    }
    cancelPhone(){
        this.phone=true;
        this.phoneEdit=false;
    }

    //编辑描述
    desc:boolean=true;
    descEdit:boolean=false;
    editDesc(){
        this.desc=false;
        this.descEdit=true;
    }
    saveDesc(){
        this.desc=true;
        this.descEdit=false;
    }
    cancelDesc(){
        this.desc=true;
        this.descEdit=false;
    }
    //编辑密码
    accPwd:PersonAccPwd = new PersonAccPwd();
    samePwd:boolean=false;
    comparePwd(){
        if(this.accPwd.newPassword!==this.accPwd.confirmPwd){
            this.samePwd=true;
        }
    }
    editPwd() {
        this.editPassWord.open('修改密码')
    }
    otEditPwd() {
        this.accPwd.id=this.personAcc.id;
        console.log(this.accPwd);
        this.putPersonAccPwd.putPersonAccPwd(this.accPwd).then(
            response => {
                if (response && 100 == response.resultCode) {
                    console.log(response);
                } else {

                }
            }).catch((err) => {
                console.error(err);
            });
    }
    ccf() {

    }
    saveEditPerAcc(){
        this.putPersonAcc.putPersonAcc(this.personAcc.id,this.personAcc).then(response=>{
            console.log(response);
        }).catch(err=>{
            console.error(err);
        })
    }
    clear(obj){
        console.log(obj);
        obj.value="";
    }
}