import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService } from '../../../../architecture';
import { cloudHostServiceList } from '../service/cloud-host-list.service'

import { VmList,HandleVm } from '../model/vm-list.model';


@Component({
	selector: 'cloud-host-list',
	templateUrl: '../template/cloud-host-list.component.html',
	styleUrls: ['../style/cloud-host-list.less'],
})
export class cloudHostListComponent implements OnInit {

	pageSize: number = 5;
	totalPages: number = 0;
	currPage: number = 1;

	areaConfig = [];   //区域
	superSearch : boolean = false;   //高级搜索开关
	vmList : VmList[] = [];   //主机
	handleData : HandleVm;   //发送操纵云主机的数据

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service : cloudHostServiceList
	) {
		this.handleData = new HandleVm();
	}

	ngOnInit() {
		this.setArea();
		this.setHostList();
  	}
	
	setArea() : void{
		this.service.getHostConfigList().then( configList => {
			this.areaConfig = configList.filter( config => config.attrCode === "REGION")[0].valueList;
		});
	}

	setHostList() : void{
		this.layoutService.show();
		this.service.getHostList(this.currPage, this.pageSize) .then(res => {
			if(res.resultCode !== "100"){
				throw "";
			}
			this.layoutService.hide();
			this.totalPages = res.pageInfo.totalPage;
			return res.resultContent;
		}).then( list => {
			this.vmList = list;
		}).catch(error => {
			this.layoutService.hide();
		})
	}

	changePage(page: number) {

		page = page < 1 ? 1 : page;
		page = page > this.totalPages ? this.totalPages : page;

		if (this.currPage == page) {
			return;
		}

		this.currPage = page;
		this.setHostList();
	}

	//云主机的操作相关
	handleVm(key : string, vm:VmList) {
		this.layoutService.show();

		this.handleData.uid = vm.uuid;
		this.handleData.id = vm.itemId;
		this.handleData.actions = key;

		this.service.handleVm(this.handleData).then(res => {
			this.layoutService.hide();
			console.log(res);
		}).catch(error => {
			this.layoutService.hide();
		})

		console.log(this.handleData)
	}
}