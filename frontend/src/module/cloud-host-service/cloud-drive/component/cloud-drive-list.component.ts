// ***********子组件 云硬盘列表*************

import { Component,ViewChild, OnInit, Input , Output, OnDestroy } from '@angular/core';
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

export class cloudDriveListComponent implements OnInit, OnDestroy {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild("vmDialog") vmDialog: PopupComponent;

	@ViewChild('platformZone') platformZone;

	@ViewChild('diskReconfig') diskReconfig;
	
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

	destroyed: boolean;

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

		this.destroyed = false;
	}

	ngOnDestroy() {
		this.destroyed = true;
	}

	setDistList(): void {
		this.layoutService.show();
		this.service.getDistList(this.list).then(res => {
			if (res.resultCode !== "100") {
				throw "";
			}
			this.layoutService.hide();
			this.list.pageParameter.totalPage = res.pageInfo.totalPage;
			return res.resultContent;
		}).then(list => {
			this.distList = list;
			// this.distList = {"resultCode":"100","detailDescription":null,"resultContent":[{"id":"270895bb-91b7-440d-86d2-8a493bf911aa","uuid":"553916778+云硬盘_YHR","instanceItemId":"18c664cf-fb00-413a-b1a8-0ce43817607e","subInstanceId":"d5aff0f5-aa63-4228-b83e-8916b11cc6de","name":"云硬盘","type":"","size":3,"relyId":null,"relyName":null,"status":2,"expireDate":1495012196000,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"43c8acc9-c3e3-47b1-b7c0-932ac1187073","uuid":"553930147+我是云硬盘_2DU","instanceItemId":"26a30a7d-64e4-426d-b6e7-6779f253a183","subInstanceId":"d1c10ae1-2268-44a9-a2af-833a0e338731","name":"我是云硬盘","type":"","size":1,"relyId":null,"relyName":null,"status":3,"expireDate":1495012254000,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"4e61c4db-4bc7-40b6-83ef-ac44998ba494","uuid":"895600563+空白片_FNG","instanceItemId":"f08cd766-7e60-4263-96fa-f4eb6b6f27e2","subInstanceId":"0be72ebd-d177-4048-be07-d7c169884ec6","name":"空白片","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"762041a7-a3ae-4bd3-82c8-7ca52f299a46","uuid":"125417042+测试_YUL","instanceItemId":"fac7db67-a3c5-4092-80d6-437fa21e1b33","subInstanceId":"2444af52-2d28-4e11-82d1-0a5b523445f7","name":"测试","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"终于可以了","platformId":"c9c8bb22-6464-41bb-809f-1f7a56c1074a","zoneName":"SHcluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"7241ed97-8fc1-44c9-8057-ad054e374b58","billingMode":1,"basePrice":23.0,"periodType":0,"basicPrice":null,"cyclePrice":null,"unitPrice":43.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"7718f5a3-2d1e-433e-a97e-e26f85c912c8","uuid":"125419363+发发发_5I8","instanceItemId":"eb3b2f39-de23-46ae-b819-41dded27c655","subInstanceId":"9386ac31-3464-4ecd-9fc5-59c2fa14e6a4","name":"发发发","type":"","size":3,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"终于可以了","platformId":"c9c8bb22-6464-41bb-809f-1f7a56c1074a","zoneName":"SHcluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"61dcf68f-960c-4e62-b343-5962b7255771","billingMode":1,"basePrice":10.0,"periodType":0,"basicPrice":null,"cyclePrice":null,"unitPrice":1.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"81358e4f-0b35-455b-9fd8-f58b9300650a","uuid":"125417102+再来一次_CAB","instanceItemId":"85042494-cbc5-4830-8d0d-f54e026fcfae","subInstanceId":"2a2f7fbc-5e8c-4a66-90db-7371a4a35f1b","name":"再来一次","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"终于可以了","platformId":"c9c8bb22-6464-41bb-809f-1f7a56c1074a","zoneName":"SHcluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"7241ed97-8fc1-44c9-8057-ad054e374b58","billingMode":1,"basePrice":23.0,"periodType":0,"basicPrice":null,"cyclePrice":null,"unitPrice":43.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"81d3f392-905e-4afd-a1e2-cdd7b5521df2","uuid":"895600595+再来五个_5C3","instanceItemId":"d84c7cf4-7345-48fb-b6eb-ea4aaa0f4ebb","subInstanceId":"db525207-420e-43cd-89b1-4067d0b125b6","name":"再来五个","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":1495012275000,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"91620e33-024b-468e-bd12-3ce445df9244","uuid":"895602620+Mpwsn01PjO_ZY4","instanceItemId":"9842978e-30e7-4437-b343-54514c9ff27b","subInstanceId":"19a5d516-b0e1-4878-9b81-037de74cbc63","name":"Mpwsn01PjO","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"9c5c2882-c616-425d-bd57-722cd55aaddf","uuid":"895600555+空白片_RCU","instanceItemId":"f1f74220-ce4c-4e0d-b0b5-b91cb1777a60","subInstanceId":"2fa34b45-0ef4-4616-9a3b-01cc0eb12988","name":"空白片","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"9ce9ec45-3a5c-4e99-ab3f-3a9a3e19b9ae","uuid":"895600531+空白片_86E","instanceItemId":"05fb59c4-f1ec-4abe-b834-252eaf7e7291","subInstanceId":"e1fa8ae9-21ec-4af1-819d-07ad10fe21c8","name":"空白片","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"ace4356f-9402-43d7-94c2-618ab597a0c3","uuid":"895602553+BQANzVHTOj_AL7","instanceItemId":"26a30a7d-64e4-426d-b6e7-6779f253a182","subInstanceId":"53856416-aa34-4f79-8d76-9a577eb3b547","name":"BQANzVHTOj","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":1495012241000,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"b0171732-be74-46b4-96c4-fbcd5ec47e13","uuid":"125409009+Ziw7VVRqgH_L8I","instanceItemId":"f67c64bb-9bb1-4595-af1a-ec51db7a9f74","subInstanceId":"700a833d-e083-41d2-9a49-ca0adae98065","name":"Ziw7VVRqgH","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"b2c6d8c9-0d4e-4c8e-9a8a-6b433b0950a0","uuid":"895600539+空白片_UAC","instanceItemId":"edea4402-6936-458d-bc86-b46a4153f71b","subInstanceId":"4f0c9b34-f973-4d27-a46f-9425fff668f3","name":"空白片","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"b33b4cd3-437c-4bbe-99fa-47d8dfb0c3f8","uuid":"956608613+测试中文名_PL3","instanceItemId":"0b3ee5d6-c2b6-4756-9a79-d5d2bba5a879","subInstanceId":"03c1d18d-9baa-443a-a489-a24fb5b2d275","name":"测试中文名","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"b44cf9cc-8a7a-4724-bd46-c1334ddc6d0a","uuid":"956608943+测试不行吧_69X","instanceItemId":"d3f67aa3-a1d4-4337-a534-6df1b420b87e","subInstanceId":"82a437d0-3164-4948-a755-d06a7d97c77c","name":"测试不行吧","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Dev_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"c43b546b-a9c2-4124-a178-3ac0a6f4dc26","uuid":"895602545+XNkRrDhdu2_2ET","instanceItemId":"2b98390a-49bf-4728-95ca-2cd9b775ca26","subInstanceId":"6ab3b902-0901-4d04-bfcf-94c6cf366625","name":"XNkRrDhdu2","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":null,"unloadAble":null,"platformName":"前端云平台","platformId":"51645681-a728-45cb-a6eb-493e61ab6063","zoneName":"Op_Cluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"90139f53-7f7f-4c31-81b8-3c27e56ca624","billingMode":1,"basePrice":10.0,"periodType":1,"basicPrice":null,"cyclePrice":null,"unitPrice":20.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}},{"id":"dc0b3716-41e9-4a76-ad43-794835ccd086","uuid":"125417078+测试timeline_BRW","instanceItemId":"26a30a7d-64e4-426d-b6e7-6779f253a181","subInstanceId":"53ca22df-9a59-48a8-80ca-25b93713f5ee","name":"测试timeline","type":"","size":1,"relyId":null,"relyName":null,"status":1,"expireDate":1495012241000,"unloadAble":null,"platformName":"终于可以了","platformId":"c9c8bb22-6464-41bb-809f-1f7a56c1074a","zoneName":"SHcluster","useType":null,"sourceType":0,"platformType":"2","billingInfo":{"billingId":"7241ed97-8fc1-44c9-8057-ad054e374b58","billingMode":1,"basePrice":23.0,"periodType":0,"basicPrice":null,"cyclePrice":null,"unitPrice":43.0,"unitType":0.0,"addonUnitPriceDetailInfo":null}}],"pageInfo":{"currentPage":1,"totalPage":1,"pageSize":20,"totalRecords":17}}.resultContent;
			this.checkListMiddleState();
		}).catch(error => {
			this.layoutService.hide();
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
			this.showNotice("CLOUD_DRIVE_LIST.CLOUD_DISK_OPERATION" ,"COMMON.SUCCESS");

			this.setDistList();
		}).catch(error => {
			this.layoutService.hide();
		})
	}


	isMiddleState(state) {
		return !!["0", "2", "3", "4", "5", "6", "8", "9", "11", "13", "15" ].filter(v => v==state).length
	}

	checkListMiddleState() {
		if(this.destroyed) return false;  //如果组件被销毁了 return

		let mkPromise = (disk) => this.isMiddleState(disk.status) ? this.service.fetchDiskState(disk.id) : false
		let fecthMiddleStateList = this.distList.map(mkPromise)

		if(!fecthMiddleStateList.filter(l => l).length) return false;   //如果没有中间状态了 则不再循环

		Promise.all(fecthMiddleStateList).then(res => {
			res.forEach((disk, i) => {
				if(disk) this.distList[i].status = disk.diskState
			})
			setTimeout(this.checkListMiddleState.bind(this) , 10 * 1000)
		})
	}


	vmListClick(vm) {
		this.serverId = vm.uuid;
	};
	confirmVm() {
		if(!this.serverId) return this.showNotice("提示", "请选择要挂载的云主机")

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

	changeName(name, disk:DistList) {
		console.log(name);
		this.service.changeDiskName(name, disk.id)
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