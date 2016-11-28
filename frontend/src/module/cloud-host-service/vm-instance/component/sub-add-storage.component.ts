/***************************子组件，增加数据盘*************************/

import { Component,ViewChild, OnInit,Input , Output,EventEmitter } from '@angular/core';

import { AttrList, PayLoad } from '../model/attr-list.model';
import { OrderList, OrderService, SendModule, TimeLineData, VlueList } from '../model/services.model';

interface Storage {
	storage : string,
	storagesize : string
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

	forArr:Array<Storage> = []; 

	ngOnInit() {
		console.log(this.configs);
	}

	outputValue(value) {
		console.log(value)
	}
 
	addDisk(){   //添加一块
		if(this.forArr.length === this.maxLenght) return;
		this.forArr.push({
			storage : "",
			storagesize : ""
		});
	}
}
