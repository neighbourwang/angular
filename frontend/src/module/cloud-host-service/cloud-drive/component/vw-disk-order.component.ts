/**
 * [订购逻辑]
 * 订购VMware主硬盘
 */

import { Component} from '@angular/core';
import { OrderOptions } from '../model/options.model';

@Component({
	selector: 'vw-disk-order',
	templateUrl: '../template/vw-disk-order.component.html',
	styleUrls: []
})
export class vwDiskOrderComponent {

	options : OrderOptions = {
		title : "VM_DISK.ORDER_VMWARE_CLOUD_HARD_DISK" //VM_DISK.ORDER_VMWARE_CLOUD_HARD_DISK
	}
}
