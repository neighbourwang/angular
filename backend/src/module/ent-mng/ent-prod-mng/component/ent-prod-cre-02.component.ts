import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent } from '../../../../architecture';

@Component({
	selector:'ent-prod-cre-02'
	,templateUrl:'../template/ent-prod-cre-02.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntProdCre02Component implements OnInit{
	constructor(
		private router: Router
		){

	}
	ngOnInit(){}
    cancel() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-mng");
    }

	next(){
      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-03");
	}

	prev(){
      	this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-01");
    }
}