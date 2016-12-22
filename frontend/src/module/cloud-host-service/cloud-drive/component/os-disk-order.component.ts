/**
 * [订购逻辑]
 * 订购openstack云硬盘
 */

import { Component} from '@angular/core';
import { OrderOptions } from '../model/options.model';

@Component({
	selector: 'os-disk-order',
	templateUrl: '../template/os-disk-order.component.html',
	styleUrls: []
})
export class osDiskOrderComponent {

	options : OrderOptions = {
		title : "订购云硬盘"
	}
}
