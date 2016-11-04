import { Component, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService,PopupComponent} from '../../../../architecture';

@Component({
    selector: 'person-acc-mng',
    templateUrl: '../template/person-acc-mng.component.html',
    styleUrls: ['../style/person-acc-mng.less'],
    providers: []
})

export class PersonAccMngComponent implements OnInit {
    constructor(
        private router: Router,
        // private ProdDirDetailService: ProdDirDetailService,
        // private ProdListService : ProdListService,
        // private ProdDirListService: ProdDirListService,
        // private PostProduct:PostProduct
    ) { }
    @ViewChild('editPassWord')
    editPassWord: PopupComponent;
    // @ViewChild('notice')
    // notice: NoticeComponent;

    ngOnInit(){}
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
    //编辑密码
    editPwd(){
        this.editPassWord.open('修改密码');
    }
    onEditPwd(){
        // this.editPassWord.open('修改密码')
    }
    otEditPwd(){

    }
    ccf(){

    }
}