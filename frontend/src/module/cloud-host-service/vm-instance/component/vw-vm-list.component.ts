/**
 * [订购逻辑]
 * VMware主机列表
 */

import { Component} from '@angular/core';
import { ListOptions } from '../model/options.model';

@Component({
	selector: 'vw-vm-list',
	templateUrl: '../template/vw-vm-list.component.html',
	styleUrls: []
})
export class vwVmListComponent {

	options : ListOptions = {
		title : "VMware云主机列表",
		type : "vw",
	}
}
