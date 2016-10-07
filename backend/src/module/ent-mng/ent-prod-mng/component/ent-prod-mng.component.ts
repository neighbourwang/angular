import { Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent } from '../../../../architecture';

@Component({
	selector:'ent-prod-mng'
	,templateUrl:'../template/ent-prod-mng.component.html'
	,styleUrls:[]
	,providers:[]
})
export class EntProdMngComponent implements OnInit{
	constructor(
		private router: Router
		){

	}
	ngOnInit(){}
       //页面上的操作

    creation() {
        this.router.navigateByUrl("ent-mng/ent-prod-mng/ent-prod-cre-01");
    }
}