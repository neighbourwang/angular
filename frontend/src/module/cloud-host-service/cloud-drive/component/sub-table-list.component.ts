/***************************子组件，table列表*************************/

import { Component,ViewChild, OnInit,Input , Output,EventEmitter, OnChanges } from '@angular/core';

import { SubTableListService } from '../service/sub-table-list.service';
import { QuiryDistList, DistList } from '../model/dist-list.model';
import { DiskUnMountItem, DiskBackupItem, VMSimpleItem } from '../model/sub-table-list.model';


@Component({
	selector: 'table-list',
	templateUrl: '../template/sub-table-list.component.html',
	styleUrls: ['../style/sub-table-list.less']
})
export class subTableListComponent implements OnInit, OnChanges {

	@Output() onSelect = new EventEmitter<any>();

	@Input() platformId:string;
	@Input() code:string;

	unmountList : DiskUnMountItem[] = [];
	backupList : DiskBackupItem[] = [];
	vmList : VMSimpleItem[] = [];

	activeNum : -1;

	list : QuiryDistList = new QuiryDistList();

	constructor(
		private service:SubTableListService
	) {
	};

	ngOnInit() {
		this.initSelect();
	}

	initSelect() {    //设置选择第一位
		switch (this.code) {
			case "1":
			case "2": this.service.diskQueryField.then(arr => this.list.queryField = arr[0].code); break;
			case "3": this.service.vmQueryField.then(arr => this.list.queryField = arr[0].code); break;
		}
	}

	ngOnChanges(changes) {
		if(!this.platformId) return;
		this.platformId = changes.platformId.currentValue;
		this.getList();
	}

	getList() {
		this.list.platformId = this.platformId;

		switch (this.code) {
			case "3": this.setVmList(); break;
			// case "2": this.setBackupList(); break;
			// case "1": this.setUnmountList(); break;
		}
	}

	setBackupList() {
		this.service.getBackupList(this.list).then(res => {
			console.log(res)
			this.list.pageParameter.totalPage = res.pageInfo.totalPage;
		})
	}

	setUnmountList() {
		this.service.getUnmountList(this.list).then(res => {
			console.log(res)
			this.list.pageParameter.totalPage = res.pageInfo.totalPage;
		})
	}

	setVmList() {
		this.service.getVmList(this.list).then(res => {
			this.vmList = res.resultContent;
			this.list.pageParameter.totalPage = res.pageInfo.totalPage;
			console.log(res.resultContent)
		})
	}

	emit(instance) {
		this.onSelect.emit(instance);
	}

	//分页
	changePage(page: number) {

		page = page < 1 ? 1 : page;
		page = page > this.list.pageParameter.totalPage ? this.list.pageParameter.totalPage : page;

		if (this.list.pageParameter.currentPage + 1 == page ) {
			return;
		}

		this.list.pageParameter.currentPage = page - 1;
		this.getList();
	}
}
