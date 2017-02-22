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

	@Input()zone:ZoneListModel;

	@Output() complete=new EventEmitter();

	constructor(
		private layoutService: LayoutService,
		private service : HostSyncService
	) { }

	ngOnInit() {
	}

	open() {
		$('#hostBox').modal('show');
		console.log(this.zone);				
	}

	update() {
		console.log(this.zone);
		let list=[];
		list.push(this.zone);
		this.layoutService.show()
		this.service.putUpdateZone(list).then(
            res => {
                console.log('put同步计算资源', res);
				$('#hostBox').modal('hide');
				this.complete.emit();
				this.layoutService.hide()
            }			
        ).catch(err => {
            console.error('put同步计算资源出错', err)
			this.layoutService.hide()
        })
		
	}


}
