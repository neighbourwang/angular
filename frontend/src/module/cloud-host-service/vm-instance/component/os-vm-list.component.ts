/**
 * [订购逻辑]
 * openstack云主机列表
 */

import { Component} from '@angular/core';
import { ListOptions } from '../model/options.model';

@Component({
	selector: 'os-vm-list',
	templateUrl: '../template/os-vm-list.component.html',
	styleUrls: []
})
export class osVmListComponent {

	options : ListOptions = {
		title : "云主机列表",
		type : "os",
	}
}
