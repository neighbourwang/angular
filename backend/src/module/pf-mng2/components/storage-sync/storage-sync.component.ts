import { Component, OnInit,ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { StorageSyncService} from './storage-sync.service';
import { StorageModel } from '../../cl-mng/model/cre-step4.model';

@Component({
	selector: 'storage-sync',
	templateUrl: './storage-sync.component.html',
	styleUrls: ['./storage-sync.component.less'],
	providers: []
})
export class StorageSyncComponent implements OnInit {

	@Input()storageList:Array<StorageModel>;
	@Input()type:string;
	@Output() complete=new EventEmitter();

	constructor(
		private layoutService: LayoutService,
		private service : StorageSyncService
	) { }

	ngOnInit() {
	}

	open() {
		$('#storageBox').modal('show');
		console.log(this.storageList);	
		console.log(this.type);			
	}

	update() {
		console.log(this.storageList);
		console.log(this.type);	
		this.storageList.forEach(ele=>{
			ele.quota=ele.quotaPercentDisplay/100;
		})
		$('#storageBox').modal('hide');				
		this.layoutService.show()
		this.service.putUpdateStorageList(this.storageList).then(
            res => {
                console.log('同步', res);
				this.layoutService.hide();
				this.complete.emit();				
            }
        ).catch(err => {
            console.error('获取更新存储区列表出错', err);
			this.layoutService.hide();
        })
	}


}
