import { Component, OnInit,ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { VtSyncService} from './vt-sync.service';
import { ZoneListModel } from '../../cl-mng/model/cre-step3.model';

@Component({
	selector: 'vt-sync',
	templateUrl: './vt-sync.component.html',
	styleUrls: ['./vt-sync.component.less'],
	providers: []
})
export class VtSyncComponent implements OnInit {

	@Input()zone:ZoneListModel;

	@Output() complete=new EventEmitter();

	constructor(
		private layoutService: LayoutService,
		private service : VtSyncService
	) { }

	ngOnInit() {
	}

	open() {
		$('#vtBox').modal('show');
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
				$('#vtBox').modal('hide');
				this.complete.emit();
				this.layoutService.hide()
            }			
        ).catch(err => {
            console.error('put同步计算资源出错', err)
			this.layoutService.hide()
        })
		
	}


}
