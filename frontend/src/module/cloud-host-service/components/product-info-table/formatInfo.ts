
import { Pipe, PipeTransform } from "@angular/core";
import { Info } from "./formatInfo.model";

@Pipe({
    name: "formatInfo"
})

export class formatInfo implements PipeTransform {

    transform(lists: Array<any>, serviceType:0|1): Array<any> {
    	let arr = [],
    		info:Info = new Info;
    	lists.forEach(list => info[list.attrCode] = list);

		if(serviceType === 0) {   //云主机
			arr = [
				{
					attrDisplayName : "区域",
					attrDisplayValue : info.PLATFORM.attrDisplayValue
				},
				{
					attrDisplayName : info.ZONE.attrDisplayName,
					attrDisplayValue : info.ZONE.attrDisplayValue
				},
				{
					attrDisplayName : "实例规格",
					attrDisplayValue : info.CPU.attrDisplayName + info.CPU.attrDisplayValue + " / " +
									   info.MEM.attrDisplayName + info.MEM.attrDisplayValue + " / " +
									   "启动盘" + info.BOOTSIZE.attrDisplayValue
				},
				{
					attrDisplayName : "操作系统",
					attrDisplayValue : info.OS.attrDisplayValue
				},
				{
					attrDisplayName : info.USERNAME.attrDisplayName,
					attrDisplayValue : info.USERNAME.attrDisplayValue
				},
				{
					attrDisplayName : "密码",
					attrDisplayValue : "已设置"
				},
				{
					attrDisplayName : info.INSTANCENAME.attrDisplayName,
					attrDisplayValue : info.INSTANCENAME.attrDisplayValue
				}
			]
		}else if (serviceType === 1){ //云硬盘
			arr = [
				{
					attrDisplayName : "区域",
					attrDisplayValue : info.PLATFORM.attrDisplayValue
				},
				{
					attrDisplayName : info.ZONE.attrDisplayName,
					attrDisplayValue : info.ZONE.attrDisplayValue
				},
				{
					attrDisplayName : info.STORAGE.attrDisplayName,
					attrDisplayValue : info.STORAGE.attrDisplayValue
				},
				{
					attrDisplayName : info.DISKSIZE.attrDisplayName,
					attrDisplayValue : info.DISKSIZE.attrDisplayValue
				},
				{
					attrDisplayName : "云硬盘名称",
					attrDisplayValue : info.DISKINSNAME.attrDisplayValue
				}


			]
		}
        
        return arr;
    }
}
