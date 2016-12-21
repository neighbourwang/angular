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
		title : "订购VMware云主机"
	}
}
