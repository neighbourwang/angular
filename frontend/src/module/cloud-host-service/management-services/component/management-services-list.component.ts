
import { Component,ViewChild,Input , Output,  OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { LayoutService, NoticeComponent, ConfirmComponent, PopupComponent } from '../../../../architecture';
import { ManagementServicesListService } from '../service/management-services-list.service'
import { ManagementServicesOrderService } from '../service/management-services-order.service'

import { SuperviseQueryCondition, PageParameter} from '../model/post.model';
import { SuperviseProductItem, ProductSimpleItem, ShoppingCartProfile, SuperviseItem } from '../model/service.model';

@Component({
	selector: 'management-services-list',
	templateUrl: '../template/management-services-list.component.html',
	styleUrls: ['../style/management-services-list.less'],
})

export class ManagementServicesListComponent implements OnInit {

	@ViewChild('confirm')
	private confirmDialog: ConfirmComponent;

	@ViewChild('notice')
	private noticeDialog: NoticeComponent;

	@ViewChild('popup')
	private popup: PopupComponent;

	listQuery : SuperviseQueryCondition = new SuperviseQueryCondition();
	// mgmtList: SuperviseItem[] = []
	mgmtList: any[] = []
	mgmt:any;

	radioSelected:any;

	modalTitle: string = '';
	modalMessage: string = '';
	modalOKTitle: string = '';

	productList: ProductSimpleItem[] = [];
	product: ProductSimpleItem;

	constructor(
		private layoutService: LayoutService,
		private router: Router,
		private service: ManagementServicesListService,
		private route: ActivatedRoute,
		private orderService: ManagementServicesOrderService
	) {
	}
	ngOnInit() {
		this.fetchServicesList();
		this.checkParams();
	}

	checkParams() {
		this.route.params.subscribe(params => {
			let { serviceId } = params;
			if(serviceId) this.openDetail(serviceId)
		})
	}

	fetchServicesList() {
		this.layoutService.show();
		this.orderService.fetchServicesList().then(res => {
			this.layoutService.hide()
			this.productList = res;
			
			this.fetchMgmtList()
		})
		.catch(e => this.layoutService.hide())
	}

	fetchMgmtList() {
		// this.layoutService.show();
		this.service.fetchMgmtList(this.listQuery).then(res => {
			console.log(this.mgmtList)
			this.mgmtList = res;
			this.radioSelected = undefined;
		})
	}

	openDetail(serviceId) {
		this.layoutService.show();
		this.service.fetchMngmDetail(serviceId)
			.then(res => {
				this.layoutService.hide();
				console.log(res)
				this.mgmt = res
				this.popup.open("管理服务详情")
			})
            .catch(e => {
				this.showNotice("提示","获取服务详情失败");
				this.layoutService.hide()
            })
	}
	popupCf(){  }
	popupOf(){ this.popup.close() }

	resetSearch() {
		this.listQuery = new SuperviseQueryCondition();
		this.fetchMgmtList()
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
		page = page > this.listQuery.pageParameter.totalPage ? this.listQuery.pageParameter.totalPage : page;

		if (this.listQuery.pageParameter.currentPage + 1 == page) {
			return;
		}

		this.listQuery.pageParameter.currentPage = page - 1;
		this.fetchMgmtList();
	}
}