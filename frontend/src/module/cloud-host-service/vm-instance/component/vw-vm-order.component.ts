/**
 * [订购逻辑]
 * 订购VMware主机
 */

import { Component} from '@angular/core';
import { OrderOptions } from '../model/options.model';

@Component({
	selector: 'vw-vm-order',
	templateUrl: '../template/vw-vm-order.component.html',
	styleUrls: []
})
export class vwVmOrderComponent {

	options : OrderOptions = {
		title : "VM_DISK.ORDER_VMWARE_CLOUD_HOSTING",
		type : "vw",
	}
}
