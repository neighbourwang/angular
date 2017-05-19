import { Component, OnInit,ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { LayoutService, PopupComponent } from '../../../../architecture';
import { HostReconfigService} from '../host-reconfig/host-reconfig.service';
import { QuiryDistList,HandleDist , DistList } from '../../cloud-drive/model/dist-list.model';

@Component({
	selector: 'disk-reconfig',
	templateUrl: './disk-reconfig.component.html',
	styleUrls: ['./disk-reconfig.component.less'],
	providers: []
})
export class DiskReconfigComponent implements OnInit {

	@Output() complete=new EventEmitter();
	@Output() onSuccess=new EventEmitter();

	state:"change"|"done" = "change";

	oldStorage: number = 0;
	maxStorage: number = 0;
	minStorage: number = 0;
	step: number = 0;
	currentStorage: number = 0;
	config: any;
	res: any;

	ot:string = "";
	orderId:string = "";

	disk:DistList = new DistList;

	constructor(
		private layoutService: LayoutService,
		private service : HostReconfigService,
		private router: Router
	) { }

	ngOnInit() {
	}

	reset() {
		this.state = "change";
		this.disk = undefined;
		this.config = undefined;
		this.maxStorage = 0;
		this.step = 0;
		this.minStorage = 0;
		this.currentStorage = 0;
	}

	open(disk:DistList) {
		$('#diskBox').modal('show');
		this.state = "change";
		this.reset();
		this.disk = disk;

		this.layoutService.show();
		this.service.getConfig(disk.id, "1").then(res => {
			this.config = {};
			this.res = res;
			res.serivceConfigChangeDiskItem.attrList.forEach(attr => {
				this.config[attr.attrCode] = attr;
			});
			this.maxStorage = +this.config.DISKMAXSIZE.valueList[0].attrValue;
			this.step = +this.config.DISKSTEPSIZE.valueList[0].attrValue;
			let minStorage = this.disk.size + this.step;
			this.minStorage = minStorage > this.maxStorage ? this.maxStorage : minStorage;
			this.currentStorage = this.minStorage;

			this.layoutService.hide();
		}).catch(error => {
			this.layoutService.hide();
		})

	}

	close() {
		$('#diskBox').modal('hide');
	}

	check(){
		if(this.ot || !this.currentStorage) return false;

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
			Object.assign({
				attrDisplayValue:"",
				attrValue:this.currentStorage.toString(),
				attrValueCode:"",
				attrValueId:""
			}, _getParentAttr("DISKSIZE")) 
		];

		let postData = {
			attrList : attrList,
			productId : this.res.productId,
			skuId : this.res.serviceSkuId
		}
		this.service.submitConfig("disk", this.disk.id, postData).then(res => {
			// this.complete.emit();
			this.onSuccess.emit();
			this.ot = "";
			this.orderId = "[\""+res+"\"]";
			this.state = "done";
		}).catch(error => {
			this.ot = "";
		})

	}

	outputValue(event) {
		this.currentStorage = event;
	}


}
