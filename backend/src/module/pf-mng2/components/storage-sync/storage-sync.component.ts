import { Component, OnInit,ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { StorageSyncService} from './storage-sync.service';
import { ZoneListModel } from '../../cl-mng/model/cre-step3.model';

@Component({
	selector: 'storage-sync',
	templateUrl: './storage-sync.component.html',
	styleUrls: ['./storage-sync.component.less'],
	providers: []
})
export class StorageSyncComponent implements OnInit {

	@Input()zone:ZoneListModel;

	@Output() complete=new EventEmitter();

	constructor(
		private layoutService: LayoutService,
		private service : StorageSyncService
	) { }

	ngOnInit() {
	}

	open() {
		$('#storageBox').modal('show');
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
				$('#storageBox').modal('hide');
				this.complete.emit();
				this.layoutService.hide()
            }			
        ).catch(err => {
            console.error('put同步计算资源出错', err)
			this.layoutService.hide()
        })
		
	}


}
