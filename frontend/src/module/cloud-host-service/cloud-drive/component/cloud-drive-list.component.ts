
import { Component,ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent } from '../../../../architecture';
import { cloudDriveServiceList } from '../service/cloud-drive-list.service'

import { QuiryDistList, DistList } from '../model/dist-list.model';

@Component({
	selector: 'cloud-drive-list',
	templateUrl: '../template/cloud-drive-list.component.html',
	styleUrls: ['../style/cloud-drive-list.less'],
})

export class cloudDriveListComponent implements OnInit {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	totalPages: number = 0;
  
	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	areaConfig = [];   //区域
	superSearch: boolean = false;   //高级搜索开关
	quiryDistList : QuiryDistList;
	distList : DistList[];

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service: cloudDriveServiceList
	) {
		this.quiryDistList = new QuiryDistList();
		this.quiryDistList.pageParameter.size = 5;  //设置页数
	}
	ngOnInit() {
		// this.setArea();
		this.setHostList();
	}

	setArea(): void {
		this.service.getHostConfigList().then(configList => {
			this.areaConfig = configList.filter(config => config.attrCode === "PLATFORM")[0].valueList;
		});
	}

	setHostList(): void {
		// this.layoutService.show();
		this.service.getDistList(this.quiryDistList).then(res => {
			if (res.resultCode !== "100") {
				throw "";
			}
			// this.layoutService.hide();
			this.totalPages = res.pageInfo.totalPage;
			return res.resultContent;
		}).then(list => {
			this.distList = list;
		}).catch(error => {
			// this.layoutService.hide();
		});

	}

	forMatData(number : number) : string {
		var d = new Date(number);
 		return (d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
	}

	//云主机的操作相关
	handleVm() {
		
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

		if (this.quiryDistList.pageParameter.currentPage == page) {
			return;
		}

		this.quiryDistList.pageParameter.currentPage = page;
		this.setHostList();
	}
}