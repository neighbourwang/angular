import { Component, OnInit,ViewChild, Input, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
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
	selectedZone:ProductAttributeValueItem;
	selectedPlatform:ProductAttributeValueItem;
	product:any;  //选中的产品
	billingInfo: ProductBillingItem;  //选中产品的价格信息

	ot:string = "";

	orderId:string = "";


	res:SerivceConfigChangeResp;

	constructor(
		private chRef: ChangeDetectorRef,
		private layoutService: LayoutService,
		private service : HostReconfigService
	) { }

	ngOnInit() {
		
	}


	change(){   //当用户选择时出发的函数
		if(!this.selectedCpu || !this.selectedMem) return;

		let proMap = this.res.serivceConfigChangeVMitem.proMap,
			value = [this.selectedPlatform.attrValueId, this.selectedZone.attrValueId, this.selectedCpu.attrValueId, this.selectedMem.attrValueId]; //现有的四个属性的组合 和promap里面的key做对比

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

	open(vm:VmList) {
		$('#hostBox').modal('show');

		this.vm = vm;
		this.state = "change";
		this.config = undefined;

		this.service.getConfig(vm.itemId, "0").then(res => {
			this.config = {};
			this.res = res;
			res.serivceConfigChangeVMitem.attrList.forEach(attr => {
				this.config[attr.attrCode] = attr;
			})
				console.log(res ,222)

			this.selectedPlatform = this.config.PLATFORM.valueList[0];
			this.selectedZone = this.config.ZONE.mapValueList[this.selectedPlatform.attrValueId][0];
			console.log(this.config)
		});
	}

	check(){
		if(this.ot || !this.selectedMem || !this.selectedCpu) return false;

		return true;
	}

	setConfig() {
		if(!this.check()) return;
		const _getParentAttr = (name:string) => ({   //获取父层的一些属性
			attrCode: this.config[name].attrCode,
			attrDisplayName: this.config[name].attrDisplayName,
			attrId: this.config[name].attrId
		});
		this.ot = "正在提交...";
		let attrList = [
			Object.assign(this.selectedCpu, _getParentAttr("CPU")), 
			Object.assign(this.selectedMem, _getParentAttr("MEM")) 
		];

		let postData = {
			attrList : attrList,
			productId : this.product.productId,
			skuId : this.product.skuId
		}
		this.service.submitConfig(this.vm.itemId, postData).then(res => {
			// this.complete.emit();
			this.ot = "";
			this.orderId = "[\""+res+"\"]";
			this.state = "done";
		}).catch(error => {
			this.ot = "";
		})

	}


}