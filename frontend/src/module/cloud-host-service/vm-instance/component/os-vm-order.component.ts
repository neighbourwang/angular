/**
 * [订购逻辑]
 * 订购openstack主机
 */

import { Component} from '@angular/core';
import { OrderOptions } from '../model/options.model';

@Component({
	selector: 'os-vm-order',
	templateUrl: '../template/os-vm-order.component.html',
	styleUrls: []
})
export class osVmOrderComponent {

	options : OrderOptions = {
		title : "VM_INSTANCE.ORDER_CLOUD_HOSTING",
		type : "os",
	}
}
