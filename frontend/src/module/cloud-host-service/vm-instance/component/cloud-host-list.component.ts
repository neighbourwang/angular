
import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { cloudHostServiceList } from '../service/cloud-host-list.service'

import { VmList, HandleVm, QuiryVmList } from '../model/vm-list.model';

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

	list : QuiryVmList = new QuiryVmList();
	searchName : string = "云主机名";

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
		this.setHostList();
	}

	setHostList(): void {
		this.service.getHostList(this.list).then(res => {
			if (res.resultCode !== "100") {
				throw "";
			}
			this.list.pageParameter.totalPage = res.pageInfo.totalPage;
			return res.resultContent;
		}).then(list => {
			this.vmList = list;
		}).catch(error => {
			// this.layoutService.hide();
		});

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

	platformClick(data) {
		console.log(data, 332)
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
		page = page > this.list.pageParameter.totalPage ? this.list.pageParameter.totalPage : page;

		if (this.list.pageParameter.currentPage == page) {
			return;
		}

		this.list.pageParameter.currentPage = page;
		this.setHostList();
	}
}