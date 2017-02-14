import { Component, OnInit,ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';

@Component({
	selector: 'host-reconfig',
	templateUrl: './host-reconfig.component.html',
	styleUrls: ['./host-reconfig.component.less'],
	providers: []
})
export class HostReconfigComponent implements OnInit {

	constructor(
		private layoutService: LayoutService,
		private router: Router,
	) { }

	ngOnInit() {
		// $('#hostBox').modal('show');
	}


	modalconfirm = function(){};
	modalcancle = function(){};
	modalnotice = function(){};
}
