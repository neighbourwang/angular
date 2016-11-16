import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { LayoutService, ValidationService, PopupComponent } from '../../../../architecture';

@Component({
    selector: 'attest-source-cre',
    templateUrl: '../template/attest-source-cre.component.html',
    styleUrls: [],
    providers: []
})

export class AttestSourceCreComponent implements OnInit {
    constructor(
        private router: ActivatedRoute,
        private route: Router,

        // private ProdDirDetailService: ProdDirDetailService,
        // private ProdListService : ProdListService,
        // private ProdDirListService: ProdDirListService,
        // private PostProduct:PostProduct
    ) { }
    // @ViewChild('editPassWord')
    // editPassWord: PopupComponent;
    // @ViewChild('notice')
    // notice: NoticeComponent;
    new:boolean=false;
    edit: boolean = false;
    editAcc: boolean = false;
    title:string;
    ngOnInit() {
        // console.log(this.router.params);
        this.router.params.forEach((params: Params) => {
            let id = +params['id'];
            let type = params['type'];
            console.log(type);
            switch (type) {
                case 'new':this.new=true; this.title='创建认证源'; break;
                case 'edit': this.edit = true;  this.title='编辑认证源' ;break;
                case 'editAcc': this.editAcc = true; this.title='编辑认证账户';  break;
            }
            // this.heroService.getHero(id)
            //   .then(hero => this.hero = hero);
        });
    }
    //编辑账号
    onEdit() {
        // this.router.navigate(['user-center/person-acc-mng/person-acc-edit'])
    }
    //编辑密码
    onEditPwd() {
        // this.editPassWord.open('修改密码')
    }
    cancel() {
        this.route.navigate(['user-center/attest-mng/attest-mng'])
    }
    otEditPwd() {

    }
    ccf() {

    }
}