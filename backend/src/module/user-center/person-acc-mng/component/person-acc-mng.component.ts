import { Component, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService,PopupComponent } from '../../../../architecture';

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
        // private ProdDirDetailService: ProdDirDetailService,
        // private ProdListService : ProdListService,
        // private ProdDirListService: ProdDirListService,
        // private PostProduct:PostProduct
    ) { }
    @ViewChild('editPassWord')
    editPassWord: PopupComponent;
    // @ViewChild('notice')
    // notice: NoticeComponent;
    personAcc:PersonAcc;
    edit:boolean;   
    ngOnInit() {
        this.edit=false;
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
}