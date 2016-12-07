/***************************子组件，增加数据盘*************************/

import { Component,ViewChild, OnInit,Input , Output,EventEmitter } from '@angular/core';

import { AttrList, PayLoad } from '../model/attr-list.model';
import { OrderList, OrderService, SendModule, TimeLineData, VlueList } from '../model/services.model';

interface Storage {
	storage : VlueList,
	storagesize : VlueList
}

@Component({
	selector: 'add-storage',
	templateUrl: '../template/sub-add-storage.component.html',
	styleUrls: ['../style/sub-add-storage.less']
})
export class subAddStorageComponent implements OnInit {

	@Output() onChanges = new EventEmitter<any>();

	@Input() configs:VlueList[] = [];
	@Input() maxLenght:number = 3;  //数据盘的最大数量

	defaultStorage : VlueList = new VlueList;
	defaultStorageSize : VlueList = new VlueList;

	forArr:Array<Storage> = [];

	ngOnInit() {
		this.defaultStorageSize.attrValue = "40";
		this.defaultStorageSize.attrDisplayValue = "40GB";
	}

	outputValue(value, i) {
		let storagesize = new VlueList;

		storagesize.attrValue = value;
		storagesize.attrDisplayValue = value + "GB";

		this.forArr[i].storagesize = storagesize;
	}

	delete(i) {
		this.forArr.splice(i, 1);
	}

	addDisk(){   //添加一块
		if(this.forArr.length === this.maxLenght) return;
		this.forArr.push({
			storage : this.defaultStorage,
			storagesize : this.defaultStorageSize
		});
	}

	getData() {
		this.forArr = this.forArr.filter( arr => arr.storage.attrValue && arr.storagesize.attrValue );  //排除空的

		return this.forArr;
	}
}
