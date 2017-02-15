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

	constructor(
		private layoutService: LayoutService,
		private service : DiskReconfigService
	) { }

	ngOnInit() {
		
	}

	open(vm:DistList) {
		$('#diskBox').modal('show');
		this.state = "change";
	}

	setConfig() {
		this.complete.emit();
		this.state = "done";
	}

	outputValue() {
		
	}


}
