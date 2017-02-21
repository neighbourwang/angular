import { Component, OnInit,ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { HostSyncService} from './host-sync.service';
import { ZoneListModel } from '../../cl-mng/model/cre-step3.model';

@Component({
	selector: 'host-sync',
	templateUrl: './host-sync.component.html',
	styleUrls: ['./host-sync.component.less'],
	providers: []
})
export class HostSyncComponent implements OnInit {

	@Input('zoneList') zoneList:ZoneListModel;

	@Output() complete=new EventEmitter();

	constructor(
		private layoutService: LayoutService,
		private service : HostSyncService
	) { }

	ngOnInit() {
		console.log(this.zoneList);
	}

	open(zoneList:ZoneListModel) {
		$('#zoneBox').modal('show');
		console.log(this.zoneList);
				
	}

	setConfig() {
		console.log(this.zoneList);
		this.complete.emit();
	}


}
