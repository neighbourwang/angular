import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent } from '../../../../architecture';

@Component({
	selector:'ent-prod-cre-03'
	,templateUrl:'../template/ent-prod-cre-03.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntProdCre03Component implements OnInit{
	constructor(
		private router: Router
		){

	}
	ngOnInit(){}

    cancel() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-mng");
    }

    next() {
        alert("创建产品");
    }

    prev() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-02");
    }
}