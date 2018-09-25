import { Component, OnInit,ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { VtSyncService} from './vt-sync.service';
import { VolumeTypeModel } from '../../cl-mng/model/volumeType.model';

@Component({
	selector: 'vt-sync',
	templateUrl: './vt-sync.component.html',
	styleUrls: ['./vt-sync.component.less'],
	providers: []
})
export class VtSyncComponent implements OnInit {

	@Input()volumeTypeList:Array<VolumeTypeModel>;

	@Output() complete=new EventEmitter();

	constructor(
		private layoutService: LayoutService,
		private service : VtSyncService
	) { }

	ngOnInit() {
	}

	open() {
		$('#vtBox').modal('show');
	}

	update() {
		console.log(this.volumeTypeList);
		this.layoutService.show()
		this.service.postUpdateVolumeType(this.volumeTypeList).then(
            res => {
                console.log('post Volumetype', res);
				$('#vtBox').modal('hide');
				this.complete.emit();
				this.layoutService.hide()
            }			
        ).catch(err => {
            console.error('post Volumetype', err)
			this.layoutService.hide()
        })
		
	}


}
