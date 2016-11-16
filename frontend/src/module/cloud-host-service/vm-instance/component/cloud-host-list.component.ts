
import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { cloudHostServiceList } from '../service/cloud-host-list.service'

import { VmList, HandleVm } from '../model/vm-list.model';

@Component({
	selector: 'cloud-host-list',
	templateUrl: '../template/cloud-host-list.component.html',
	styleUrls: ['../style/cloud-host-list.less'],
})

export class cloudHostListComponent implements OnInit {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	pageSize: number = 5;
	totalPages: number = 0;
	currPage: number = 1;
  
	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	areaConfig = [];   //区域
	superSearch: boolean = false;   //高级搜索开关
	vmList: VmList[] = [];   //主机
	handleData: HandleVm;   //发送操纵云主机的数据

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service: cloudHostServiceList
	) {
		this.handleData = new HandleVm();
	}
	ngOnInit() {
		this.setArea();
		this.setHostList();
	}

	setArea(): void {
		// this.service.getHostConfigList().then(configList => {
		// 	this.areaConfig = configList.filter(config => config.attrCode === "PLATFORM")[0].valueList;
		// });
	}

	setHostList(): void {
		// this.layoutService.show();
		this.service.getHostList(this.currPage, this.pageSize).then(res => {
			if (res.resultCode !== "100") {
				throw "";
			}
			// this.layoutService.hide();
			this.totalPages = res.pageInfo.totalPage;
			return res.resultContent;
		}).then(list => {
			this.vmList = list;
		}).catch(error => {
			// this.layoutService.hide();
		});

	}

	forMatData(number : number) : string {
		var d = new Date(number);
 		return (d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
	}

	//云主机的操作相关
	handleVm(key: string, vm: VmList ,msg) {
		this.layoutService.show();

		this.handleData.uid = "";
		this.handleData.id = vm.uuid;
		this.handleData.actions = key;

		this.service.handleVm(this.handleData).then(res => {
			this.layoutService.hide();
			// alert(msg+"成功！");
			this.showNotice("云主机操作" ,msg+"成功！");

			setTimeout(() => {   //延迟4秒执行 因为后端4秒同步一次状态
				this.setHostList();
			},4000)
		}).catch(error => {
			this.layoutService.hide();
		})
	}

	goTo(url : string) {
		this.router.navigateByUrl(url);
	}


	// 警告框相关
	showNotice(title: string, msg: string) {
	    this.modalTitle = title;
	    this.modalMessage = msg;

	    this.noticeDialog.open();
	}

	modalAction(btnType: number) {
	    if (btnType == 0) {
	      this.noticeDialog.close();
	      return;
	    }
	    
	    this.noticeDialog.close()
	    this.confirmDialog.close();
	}
	// 警告框相关结束

	//分页
	changePage(page: number) {

		page = page < 1 ? 1 : page;
		page = page > this.totalPages ? this.totalPages : page;

		if (this.currPage == page) {
			return;
		}

		this.currPage = page;
		this.setHostList();
	}
}