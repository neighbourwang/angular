
import { Component,ViewChild,Input , Output,  OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';
import { PhysicalMachineListService } from '../service/physical-machine-list.service'

@Component({
	selector: 'physical-machine-list',
	templateUrl: '../template/physical-machine-list.component.html',
	styleUrls: ['../style/physical-machine-list.less'],
})

export class PhysicalMachineListComponent implements OnInit {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild('popup')
	private popup: PopupComponent;
	
	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service: PhysicalMachineListService
	) {

	}
	ngOnInit() {
		
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

	changeName(name) {
		
	}

	//分页
	changePage(page: number) {

		page = page < 1 ? 1 : page;
		// page = page > this.list.pageParameter.totalPage ? this.list.pageParameter.totalPage : page;

		// if (this.list.pageParameter.currentPage + 1 == page) {
		//	return;
		// }

		// this.list.pageParameter.currentPage = page - 1;
		// this.setHostList();
	}
}