import { Component, OnInit,ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { HostReconfigService} from './host-reconfig.service';
import { VmList, HandleVm, QuiryVmList } from '../../vm-instance/model/vm-list.model';

@Component({
	selector: 'host-reconfig',
	templateUrl: './host-reconfig.component.html',
	styleUrls: ['./host-reconfig.component.less'],
	providers: []
})
export class HostReconfigComponent implements OnInit {

	@Output() complete=new EventEmitter();

	state:"change"|"done" = "change";
	vm:VmList = new VmList;

	constructor(
		private layoutService: LayoutService,
		private service : HostReconfigService
	) { }

	ngOnInit() {
		
	}

	open(vm:VmList) {
		$('#hostBox').modal('show');
		this.vm = vm;
		this.state = "change";
	}

	setConfig() {
		this.complete.emit();
		this.state = "done";
	}


}
