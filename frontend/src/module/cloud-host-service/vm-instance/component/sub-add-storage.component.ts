/***************************子组件，增加数据盘*************************/

import { Component,ViewChild, OnInit,Input ,OnChanges, Output,EventEmitter } from '@angular/core';

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
export class subAddStorageComponent implements OnInit,OnChanges {

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

	ngOnChanges(value) {
		if(value.configs.currentValue.length) {
			this.defaultStorage = this.configs[0];
			for(let list of this.forArr){   //循环设置已展开的下拉列表为第一位
				list.storage = value.configs.currentValue[0];
			}
		}
	}

	outputValue(value, i) {
		let storagesize = new VlueList;

		storagesize.attrValue = value;
		storagesize.attrDisplayValue = value + "GB";

		this.forArr[i].storagesize = storagesize;
	}

	delete(i) {
		this.forArr.splice(i, 1);
		this.onChanges.emit(this.getData());
	}

	addDisk(){   //添加一块
		if(this.forArr.length === this.maxLenght) return;

		this.forArr.push({
			storage : this.defaultStorage,
			storagesize : this.defaultStorageSize
		});
		this.onChanges.emit(this.getData());
	}

	getData() {
		this.forArr = this.forArr.filter( arr => arr.storage.attrValue && arr.storagesize.attrValue );  //排除空的

		return this.forArr;
	}
}
