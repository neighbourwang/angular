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

	@Input('zoneList') zoneList:Array<ZoneListModel>;
	@Input('type')type:string;
	@Output() complete=new EventEmitter();

	constructor(
		private layoutService: LayoutService,
		private service : ZoneSyncService
	) { }

	ngOnInit() {
		console.log(this.zoneList);
		console.log(this.type);
	}

	open() {
		$('#zoneBox').modal('show');
		console.log(this.zoneList);
		console.log(this.type);				
	}

	addZone() {
		for (let zone of this.zoneList) {           
            zone.quotaPercentage = 0;
            zone.quotaPercentage = zone.quotaPercentDisplay * 0.01
        }
		console.log(this.zoneList);
		$('#zoneBox').modal('hide');		
		this.layoutService.show();
		this.service.putUpdateZoneList(this.zoneList).then(res=>{
			console.log(res);
			this.complete.emit();
			this.layoutService.hide();
		}).catch(err=>{
			console.error(err)
			this.layoutService.hide();			
		})
	}


}
