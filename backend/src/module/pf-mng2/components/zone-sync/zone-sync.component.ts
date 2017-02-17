import { Component, OnInit,ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { ZoneSyncService} from './zone-sync.service';
import { ZoneListModel } from '../../cl-mng/model/cre-step3.model';

@Component({
	selector: 'zone-sync',
	templateUrl: './zone-sync.component.html',
	styleUrls: ['./zone-sync.component.less'],
	providers: []
})
export class ZoneSyncComponent implements OnInit {

	@Output() complete=new EventEmitter();

	zoneList:ZoneListModel = new ZoneListModel();

	constructor(
		private layoutService: LayoutService,
		private service : ZoneSyncService
	) { }

	ngOnInit() {
		
	}

	open(zoneList:ZoneListModel) {
		$('#hostBox').modal('show');
		this.zoneList = zoneList;
	}

	setConfig() {
		console.log(this.zoneList);
		this.complete.emit();
	}


}
