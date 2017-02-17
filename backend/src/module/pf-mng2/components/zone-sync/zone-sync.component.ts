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

	@Input('zoneList')zoneList:ZoneListModel;

	@Output() complete=new EventEmitter();

	display:boolean=false;
	constructor(
		private layoutService: LayoutService,
		private service : ZoneSyncService
	) { }

	ngOnInit() {
		console.log(this.zoneList);
	}

	open() {
		console.log(this.zoneList);
		$('#zoneBox').modal('show');		
	}

	setConfig() {
		console.log(this.zoneList);
		this.complete.emit();
	}


}
