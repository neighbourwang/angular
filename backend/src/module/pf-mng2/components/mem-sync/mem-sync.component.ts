import { Component, OnInit,ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { MemSyncService} from './mem-sync.service';
import { ZoneListModel } from '../../cl-mng/model/cre-step3.model';

@Component({
	selector: 'mem-sync',
	templateUrl: './mem-sync.component.html',
	styleUrls: ['./mem-sync.component.less'],
	providers: []
})
export class MemSyncComponent implements OnInit {

	@Input()zone:ZoneListModel;

	@Output() complete=new EventEmitter();

	constructor(
		private layoutService: LayoutService,
		private service : MemSyncService
	) { }

	ngOnInit() {
	}

	open() {
		$('#memBox').modal('show');
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
				$('#memBox').modal('hide');
				this.complete.emit();
				this.layoutService.hide()
            }			
        ).catch(err => {
            console.error('put同步计算资源出错', err)
			this.layoutService.hide()
        })
		
	}


}
