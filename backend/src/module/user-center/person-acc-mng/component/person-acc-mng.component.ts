import { Component, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService } from '../../../../architecture';

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

    // enterpriseList = new Array();
    // prodDirList = new Array();
    // prodDir = new ProductDir();
    // prodDirId:string;
    // product=new Product();   
    ngOnInit() {}
    //编辑账号
    onEdit(){
        this.router.navigate(['user-center/person-acc-mng/person-acc-edit'])
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