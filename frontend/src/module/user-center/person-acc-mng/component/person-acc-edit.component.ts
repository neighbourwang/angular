import { Component, ViewChild, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, ValidationService } from '../../../../architecture';

@Component({
    selector: 'person-acc-edit',
    templateUrl: '../template/person-acc-edit.component.html',
    styleUrls: [],
    providers: []
})

export class PersonAccEditComponent implements OnInit {
    constructor(
        private router: Router,
        // private ProdDirDetailService: ProdDirDetailService,
        // private ProdListService : ProdListService,
        // private ProdDirListService: ProdDirListService,
        // private PostProduct:PostProduct
    ) { }

    // @ViewChild('notice')
    // notice: NoticeComponent;

    // enterpriseList = new Array();
    // prodDirList = new Array();
    // prodDir = new ProductDir();
    // prodDirId:string;
    // product=new Product();   
    ngOnInit(){}
    cancel(){
        this.router.navigate(['user-center/person-acc-mng/person-acc-mng']);
    }
    onSubmit(){
        
    }
}