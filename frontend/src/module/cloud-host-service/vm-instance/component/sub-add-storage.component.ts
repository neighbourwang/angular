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

	@Output() onClick = new EventEmitter<any>();

	@Input() configs:OrderList = new OrderList;
	@Input() maxLenght:number = 3;  //数据盘的最大数量

	defaultStorage : VlueList = new VlueList;
	defaultStorageSize : VlueList = new VlueList;

	forArr:Array<Storage> = []; 

	ngOnInit() {
		this.defaultStorageSize.attrValue = "40";
		this.defaultStorageSize.attrDisplayValue = "40GB";
	}

	outputValue(value, i) {
		this.forArr[i].storagesize.attrValue = value;
		this.forArr[i].storagesize.attrDisplayValue = value + "GB";
		console.log(this.forArr, 3322)
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
		console.log(this.forArr)
	}
}
