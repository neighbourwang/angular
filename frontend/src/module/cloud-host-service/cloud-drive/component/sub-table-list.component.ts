/***************************子组件，table列表*************************/

import { Component,ViewChild, OnInit,Input , Output,EventEmitter } from '@angular/core';

import { SubTableListService } from '../service/sub-table-list.service';
import { QuiryDistList, DistList } from '../model/dist-list.model';
import { DiskUnMountItem, DiskBackupItem, VMSimpleItem } from '../model/sub-table-list.model';


@Component({
	selector: 'table-list',
	templateUrl: '../template/sub-table-list.component.html',
	styleUrls: ['../style/sub-table-list.less']
})
export class subTableListComponent implements OnInit {

	// @Output() onChanges = new EventEmitter<any>();

	@Input() platformId:string;
	@Input() code:string;

	unmountList : DiskUnMountItem[] = [];
	backupList : DiskBackupItem[] = [];
	vmList : VMSimpleItem[] = [];

	list : QuiryDistList = new QuiryDistList();

	constructor(
		private service:SubTableListService
	) {
	};

	ngOnInit() {
		this.list.platformId = this.platformId;

		switch (this.code) {
			case "vm": this.setVmList(); break;
			// case "backup": this.setBackupList(); break;
			// case "unmount": this.setUnmountList(); break;
		}
	}

	setBackupList() {
		this.service.getBackupList(this.list).then(res => {
			console.log(res)
		})
	}

	setUnmountList() {
		this.service.getUnmountList(this.list).then(res => {
			console.log(res)
		})
	}

	setVmList() {
		this.service.getVmList(this.list).then(res => {
			this.vmList = res.resultContent;
		})
	}
}