// ***********子组件 云硬盘列表*************

import { Component,ViewChild, OnInit, Input , Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, dictPipe, PopupComponent } from '../../../../architecture';
import { cloudDriveServiceList } from '../service/cloud-drive-list.service'

import { QuiryDistList,HandleDist , DistList } from '../model/dist-list.model';
import { ListOptions } from '../model/options.model';

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

	@ViewChild("vmDialog") vmDialog: PopupComponent;

	@ViewChild('platformZone') platformZone;
	
	@ViewChild('popup')
	private popup: PopupComponent;

	@Input() options:ListOptions;

	list : QuiryDistList = new QuiryDistList();
	saveList : QuiryDistList = new QuiryDistList();   //储存点，重置搜索时会返回到这个点

	handleData: HandleDist = new HandleDist;   //发送操纵云主机的数据
  
	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	radioSelected:DistList = new DistList; //选择的disk

	serverId : string = '';
	mountDisk : DistList;
	diskPlatformId : string = '';

	areaConfig = [];   //区域
	superSearch: boolean = false;   //高级搜索开关
	distList : DistList[];

	constructor(
		private layoutService: LayoutService, 
		private router: Router,
		private dictPipe : dictPipe,
		private service: cloudDriveServiceList
	) {
	}
	ngOnInit() {
		// this.setArea();
		this.setDistList();
		this.initSelect();
	}

	setDistList(): void {
		// this.layoutService.show();
		this.service.getDistList(this.list).then(res => {
			if (res.resultCode !== "100") {
				throw "";
			}
			// this.layoutService.hide();
			this.list.pageParameter.totalPage = res.pageInfo.totalPage;
			return res.resultContent;
		}).then(list => {
			this.distList = list;
		}).catch(error => {
			// this.layoutService.hide();
		});
	}

	initSelect(){
		this.service.queryField.then(arr => this.list.queryField = arr[0].code);
	}

	
	platformClick(data) {   //选择区域列表
		this.list.platformId = data.area.id;
		this.list.zoneId = data.zone.zoneId;
		this.saveList.platformId = data.area.id;
		this.saveList.zoneId =  data.zone.zoneId;
		this.setDistList();
	}

	delectDisk() {  //退订云硬盘
		if( !this.radioSelected.subInstanceId )  return this.showNotice("退订云硬盘", "请选择要退订的硬盘");

		this.popup.open("退订云硬盘");
	}
	popupCf(){}
	popupOf(){
		this.service.deleteDisk(this.radioSelected.subInstanceId).then(res => {
			this.showNotice("退订云硬盘", "退订成功！");
			this.setDistList();
		}).catch(e => {
			this.showNotice("退订云硬盘", "退订失败！");
		})
		this.popup.close();
	}

	//云硬盘的操作相关
	handleDist(key:string ,dist:DistList, msg:string) {
		this.layoutService.show();

		this.handleData.id = dist.uuid;
		this.handleData.serverId = key === "mount" ? this.serverId : key === "unmount" ? dist.relyId : "";
		this.handleData.actions = key;
		this.handleData.enterpriseIds.platformId = dist.platformId;
		this.handleData.enterpriseIds.enterpriseId = this.service.userInfo.enterpriseId;

		this.service.handleDist(this.handleData).then(res => {
			this.layoutService.hide();
			// alert(msg+"成功！");
			this.showNotice("云硬盘操作" ,msg+"成功！");

			setTimeout(() => {   //延迟4秒执行 因为后端4秒同步一次状态
				this.setDistList();
			},4000)
		}).catch(error => {
			this.layoutService.hide();
		})
	}

	vmListClick(vm) {
		this.serverId = vm.uuid;
	};
	confirmVm() {
		this.handleDist("mount", this.mountDisk, "CLOUD_DRIVE_LIST.MOUNT_CLOUD_HOST");
		this.vmDialog.close();
	}
	cancelVm() {
		this.serverId = "";
	}

	resetSearch(){   //重置搜索
		this.list = Object.assign({}, this.saveList);
		this.initSelect();
	}
	search() {    //搜索
		console.log(this.list)

		this.setDistList();
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

		if (this.list.pageParameter.currentPage + 1 == page) {
			return;
		}

		this.list.pageParameter.currentPage = page - 1;
		this.setDistList();
	}
}