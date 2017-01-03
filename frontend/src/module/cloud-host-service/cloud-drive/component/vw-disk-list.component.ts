/*
 *云硬盘列表
 */

import { Component} from '@angular/core';
import { ListOptions } from '../model/options.model';

@Component({
	selector: 'vw-disk-list',
	templateUrl: '../template/vw-disk-list.component.html',
	styleUrls: []
})
export class vwDiskListComponent {

	options : ListOptions = {
		title : "VM_DISK.VMWARE_CLOUD_HARD_DISK_LIST" //VM_DISK.VMWARE_CLOUD_HARD_DISK_LIST
	}  
}
