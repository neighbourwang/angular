import { Component, OnInit,ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { DiskReconfigService} from './disk-reconfig.service';
import { QuiryDistList,HandleDist , DistList } from '../../cloud-drive/model/dist-list.model';

@Component({
	selector: 'disk-reconfig',
	templateUrl: './disk-reconfig.component.html',
	styleUrls: ['./disk-reconfig.component.less'],
	providers: []
})
export class DiskReconfigComponent implements OnInit {

	@Output() complete=new EventEmitter();

	state:"change"|"done" = "change";

	oldStorage: number = 20;
	maxStorage: number = 200;
	step: number = 20;
	currentStorage: number = 0;

	disk:DistList = new DistList;

	constructor(
		private layoutService: LayoutService,
		private service : DiskReconfigService
	) { }

	ngOnInit() {
	}

	open(disk:DistList) {
		$('#diskBox').modal('show');
		this.state = "change";
		this.disk = disk;


		// this.service.getZoneList(disk.uuid, "1").then(res => {
		// 	console.log(res)
		// });
		console.log(disk)

	}

	setConfig() {
		this.complete.emit();
		this.state = "done";
	}

	outputValue(event) {
		this.currentStorage = event;
	}


}
