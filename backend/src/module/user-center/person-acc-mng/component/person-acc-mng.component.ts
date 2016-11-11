import { Component, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService,PopupComponent } from '../../../../architecture';

//service
import { GetPersonAccService } from '../service/person-acc-get.service';

//model
import { PersonAcc } from '../model/person-acc.model';

@Component({
    selector: 'person-acc-mng',
    templateUrl: '../template/person-acc-mng.component.html',
    styleUrls: [],
    providers: []
})

export class PersonAccMngComponent implements OnInit {
    constructor(
        private router: Router,
        private getPersonAcc :GetPersonAccService
    ) { }
    @ViewChild('editPassWord')
    editPassWord: PopupComponent;
    // @ViewChild('notice')
    // notice: NoticeComponent;
    personAcc:PersonAcc = new PersonAcc();
    temPersonAcc:PersonAcc = new PersonAcc();
    
    edit:boolean;   
    ngOnInit() {
        this.edit=false;
        this.getCurrentAccount();
    }
    //获取当前登录信息
    getCurrentAccount(){
        this.getPersonAcc.getPersonAcc().then(
            response=>{
            console.log(response);
            this.personAcc=Object.assign({}, response.resultContent)
            this.temPersonAcc=response.resultContent;            
        }).catch((err)=>{
            console.error(err);
        });        
    }
    //编辑账号
    onEdit(){
        this.edit=true;
        // this.router.navigate(['user-center/person-acc-mng/person-acc-edit'])
    }
    //编辑密码
    onEditPwd(){
        this.editPassWord.open('修改密码')
    }
    otEditPwd(){

    }
    ccf(){

    }
    //cancel edit
    cancel(){
        this.personAcc=this.temPersonAcc;
        this.edit=false;
    }
    //submit edit
    onSubmit(){

    }
}