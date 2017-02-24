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

	@Input()storage:ZoneListModel;

	@Output() complete=new EventEmitter();

	constructor(
		private layoutService: LayoutService,
		private service : MemSyncService
	) { }

	ngOnInit() {
	}

	open() {
		$('#memBox').modal('show');
		console.log(this.storage);				
	}

	update() {
		console.log(this.storage);
		let list=[];
		list.push(this.storage);
		$('#memBox').modal('hide');
		this.layoutService.show()		
		this.service.putUpdateStorage(list).then(
            res => {
                console.log('put同步存储区计算资源', res);
                this.complete.emit();
				this.layoutService.hide()
            }
        ).catch(err => {
            console.error('put同步存储区计算资源出错', err);
			this.layoutService.hide()
        })
		
	}


}
