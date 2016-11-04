import { Component, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService,  PopupComponent } from '../../../../architecture';

@Component({
    selector: 'attest-mng',
    templateUrl: '../template/attest-mng.component.html',
    styleUrls: [],
    providers: []
})

export class AttestMngComponent implements OnInit {
    constructor(
        private router: Router,
        // private ProdDirDetailService: ProdDirDetailService,
        // private ProdListService : ProdListService,
        // private ProdDirListService: ProdDirListService,
        // private PostProduct:PostProduct
    ) { }
    // @ViewChild('editPassWord')
    // editPassWord: PopupComponent;
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
        
    }
    //编辑密码
    onEditPwd(){
        // this.editPassWord.open('修改密码')
    }
    creation(){
        this.router.navigate(['user-center/attest-mng/attest-source-cre'])
    }
    otEditPwd(){

    }
    ccf(){

    }
}