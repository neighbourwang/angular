
import { Component,ViewChild,Input , Output,  OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent, Validation, ValidationRegs } from '../../../../architecture';
import { cloudHostServiceList } from '../service/cloud-host-list.service'

import { ListOptions } from '../model/options.model';
import { VmList, HandleVm, QuiryVmList } from '../model/vm-list.model';
import { VMInstanceLabelItem } from '../model/labe-iItem.model';

@Component({
	selector: 'cloud-host-list',
	templateUrl: '../template/cloud-host-list.component.html',
	styleUrls: ['../style/cloud-host-list.less'],
})

export class cloudHostListComponent implements OnInit, OnDestroy {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild('popup')
	private popup: PopupComponent;


	@ViewChild('platformZone') platformZone;

	@ViewChild('hostReconfig') hostReconfig;

	list : QuiryVmList = new QuiryVmList();
	saveList : QuiryVmList = new QuiryVmList();   //储存点，重置搜索时会返回到这个点

	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	radioSelected:VmList = new VmList; //选择的vm主机
	forceDelect: boolean = false;  //是否强制删除

	areaConfig = [];   //区域
	superSearch: boolean = false;   //高级搜索开关
	vmList: VmList[] = [];   //主机
	handleData: HandleVm;   //发送操纵云主机的数据
	labelItem:VMInstanceLabelItem[] = [];

	destroyed: boolean;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private v: Validation,
		private service: cloudHostServiceList
	) {
		this.handleData = new HandleVm();

		this.service.computeStatus.then(res => {
		})
	}
	ngOnInit() {
		this.setHostList();
		this.getLabels();  //获取标签列表
		this.initSelect();

		this.destroyed = false;
	}

	ngOnDestroy() {
		this.destroyed = true;
	}

	setHostList(): void {
		this.layoutService.show();
		this.service.getHostList(this.list).then(res => {
			if (res.resultCode !== "100") {
				throw "";
			}
			this.layoutService.hide();
			this.list.pageParameter.totalPage = res.pageInfo.totalPage;
			return res.resultContent;
			
		}).then(list => {
			this.vmList = list;
			this.checkListMiddleState();
		}).catch(error => {
			this.layoutService.hide();
		});
	};

	initSelect(){
		this.service.queryField.then(arr => this.list.queryField = arr[0].code);
	}

	getLabels() {
		this.service.getLabels().then(res => {
			this.labelItem = res;
		})
	}

	resetSearch(){   //重置搜索
		this.list = Object.assign({}, this.saveList);
		this.initSelect();
	}
	search() {    //搜索
		console.log(this.list)

		this.setHostList();
	}

	platformClick(data) {   //选择区域列表
		this.list.platformId = data.area.id;
		this.list.zoneId = data.zone.zoneId;
		this.saveList.platformId = data.area.id;
		this.saveList.zoneId =  data.zone.zoneId;
		this.setHostList();
	}

	checkListMiddleState() {
		if(this.destroyed) return false;  //如果组件被销毁了 return

		let mkPromise = (vm) => this.isMiddleState(vm.vmState) ? this.service.fetchVmState(vm.itemId) : false
		let fecthMiddleStateList = this.vmList.map(mkPromise)

		if(!fecthMiddleStateList.filter(l => l).length) return false;   //如果没有中间状态了 则不再循环

		Promise.all(fecthMiddleStateList).then(res => {
			res.forEach((vm, i) => {
				if(vm) this.vmList[i].vmState = vm.vmState
			})
			setTimeout(this.checkListMiddleState.bind(this) , 10 * 1000)
		})
	}


	//云主机的操作相关
	handleVm(key: string, vm: VmList ,msg) {
		this.layoutService.show();

		this.handleData.id = vm.uuid;
		this.handleData.actions = key;
		this.handleData.enterpriseIds.platformId = vm.platformId;
		this.handleData.enterpriseIds.enterpriseId = this.service.userInfo.enterpriseId;

		this.service.handleVm(this.handleData).then(res => {
			this.layoutService.hide();
			// alert(msg+"成功！");
			this.showNotice("COMMON.CLOUD_HOST_OPERATION" , msg+"成功");

			this.setHostList();
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

	changeName(name, vm:VmList) {
		this.layoutService.show();
		this.service.postVmInfo(vm.itemId, {instanceDisplayName : name}).then(res => {
			this.layoutService.hide();
			this.setHostList();
		}).catch(error => {
			this.layoutService.hide();
			this.showNotice("提示", "修改名称失败")
		})
	}
	nameClick(){
		console.log("222")
	}

	isMiddleState(state) {
		return !!['1', '5', '20', '22', '25', '26', '27', '28', '29'].filter(v => v==state).length
	}

	//分页
	changePage(page: number) {

		page = page < 1 ? 1 : page;
		page = page > this.list.pageParameter.totalPage ? this.list.pageParameter.totalPage : page;

		if (this.list.pageParameter.currentPage + 1 == page) {
			return;
		}

		this.list.pageParameter.currentPage = page - 1;
		this.setHostList();
	}
}