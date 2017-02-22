import { Component, OnInit,ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { HostReconfigService} from './host-reconfig.service';
import { VmList, HandleVm, QuiryVmList } from '../../vm-instance/model/vm-list.model';

import { ServiceRespAttributePair, ProductAttributeValueItem, SerivceConfigChangeResp, ProductBillingItem } from './changeConfig.model';

@Component({
	selector: 'host-reconfig',
	templateUrl: './host-reconfig.component.html',
	styleUrls: ['./host-reconfig.component.less'],
	providers: []
})
export class HostReconfigComponent implements OnInit {

	@Output() complete=new EventEmitter();

	state:"change"|"done" = "change";
	vm:VmList = new VmList;

	config:any;
	selectedCpu:ProductAttributeValueItem;
	selectedMem:ProductAttributeValueItem;
	platformId:string;
	zoneId:string;
	product:any;  //选中的产品
	billingInfo: ProductBillingItem;  //选中产品的价格信息


	res:SerivceConfigChangeResp;

	constructor(
		private layoutService: LayoutService,
		private service : HostReconfigService
	) { }

	ngOnInit() {
		
	}


	change(){   //当用户选择时出发的函数
		if(!this.selectedCpu || !this.selectedMem) return;

		let proMap = this.res.serivceConfigChangeVMitem.proMap,
			value = [this.platformId, this.zoneId, this.selectedCpu.attrValueId, this.selectedMem.attrValueId]; //现有的四个属性的组合 和promap里面的key做对比

		this.product = undefined;
		this.billingInfo = undefined;
		for (let key in proMap){
			let codeArr = key.match(/\[(.*)?\,\s(.*)?\,\s(.*)?\,\s(.*)?\]/);
			let count = 0;
			for (let i = 1; i < codeArr.length; ++i) {
				
				if(value.indexOf(codeArr[i]) > -1) count++;
				console.log(count, value, codeArr[i])
				if(count === 4) {
					this.product = proMap[key];   //四个属性全匹配 确定产品
					this.billingInfo = this.product.productBillingItem;
					break;
				}
			}
		}
	}

	submit(){
		let attrList = [this.selectedCpu, this.selectedMem];
		let postData = {
			attrList : attrList,
			productId : this.product.productId,
			skuId : this.product.skuId
		}
		this.service.submitConfig(this.vm.subInstanceId, postData).then(res => {

		})
	}

	open(vm:VmList) {
		$('#hostBox').modal('show');
		this.vm = vm;
		this.state = "change";
		this.config = undefined;

		this.service.getConfig(vm.subInstanceId, "0").then(res => {
			this.config = {};
			this.res = res;
			res.serivceConfigChangeVMitem.attrList.forEach(attr => {
				this.config[attr.attrCode] = attr;
			})
				console.log(res ,222)

			this.platformId = this.res.platformId;
			this.zoneId = this.res.zoneId;
			console.log(this.config)
		});
	}

	setConfig() {
		this.complete.emit();
		this.state = "done";
	}


}
