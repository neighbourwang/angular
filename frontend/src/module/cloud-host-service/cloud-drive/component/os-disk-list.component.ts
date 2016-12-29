/**
 * [订购逻辑]
 * openstack主硬盘列表
 */

import { Component} from '@angular/core';
import { ListOptions } from '../model/options.model';

@Component({
	selector: 'os-disk-list',
	templateUrl: '../template/os-disk-list.component.html',
	styleUrls: []
})
export class osDiskListComponent {

	options : ListOptions = {
		title : "云硬盘列表"  //OS_DISK.CLOUD_HARD_DISK_LIST
	}
}
