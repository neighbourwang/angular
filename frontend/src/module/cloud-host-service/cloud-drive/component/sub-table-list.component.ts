/***************************子组件，table列表*************************/

import { Component,ViewChild, OnInit,Input , Output,EventEmitter } from '@angular/core';

@Component({
	selector: 'table-list',
	templateUrl: '../template/sub-table-list.component.html',
	styleUrls: ['../style/sub-table-list.less']
})
export class subTableListComponent implements OnInit {

	// @Output() onChanges = new EventEmitter<any>();

	@Input() platformId:string;

	ngOnInit() {
	}

}
