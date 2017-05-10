
import { Pipe, PipeTransform } from "@angular/core";
import { Info } from "./formatInfo.model";

@Pipe({
	name: "formatInfo"
})

export class formatInfo implements PipeTransform {

	transform(lists: Array<any>, serviceType: 0 | 1, obj): Array<any> {
		let arr = [],
			info: Info = new Info;
		lists.forEach(list => info[list.attrCode] = list);

		if (serviceType == 0) {   //云主机
			arr = [
				{
					attrDisplayName: "区域",
					attrDisplayValue: info.PLATFORM.attrDisplayValue
				},
				{
					attrDisplayName: info.ZONE.attrDisplayName,
					attrDisplayValue: info.ZONE.attrDisplayValue
				},
				{
					attrDisplayName: "实例规格",
					attrDisplayValue: info.CPU.attrDisplayName + info.CPU.attrDisplayValue + " / " +
					info.MEM.attrDisplayName + info.MEM.attrDisplayValue + " / " +
					"启动盘" + info.BOOTSIZE.attrDisplayValue
				},
				{
					attrDisplayName: "操作系统",
					attrDisplayValue: info.OS.attrDisplayValue
				},
				{
					attrDisplayName: info.USERNAME.attrDisplayName,
					attrDisplayValue: info.USERNAME.attrDisplayValue
				},
				{
					attrDisplayName: "密码",
					attrDisplayValue: "已设置"
				},
				{
					attrDisplayName: info.INSTANCENAME.attrDisplayName,
					attrDisplayValue: info.INSTANCENAME.attrDisplayValue
				}
			]
		} else if (serviceType == 1) { //云硬盘
			arr = [
				{
					attrDisplayName: "区域",
					attrDisplayValue: info.PLATFORM.attrDisplayValue
				},
				{
					attrDisplayName: info.ZONE.attrDisplayName,
					attrDisplayValue: info.ZONE.attrDisplayValue
				},
				{
					attrDisplayName: info.STORAGE.attrDisplayName,
					attrDisplayValue: info.STORAGE.attrDisplayValue
				},
				{
					attrDisplayName: info.DISKSIZE.attrDisplayName,
					attrDisplayValue: info.DISKSIZE.attrDisplayValue
				},
				{
					attrDisplayName: "云硬盘名称",
					attrDisplayValue: info.DISKINSNAME.attrDisplayValue
				}
			]
		} else if (serviceType == 4) {  //物理机
			let {iloIPAddress, priIPAddr} = obj.pmEntity
			let getValue = (code, unit = "") => {
				let values = obj.pmEntity.partsEntitys.filter(parts=> parts.partsName === code)
				return values.length ? values.map( valuse => `${valuse.specName} ${valuse.specValue}${unit}*${valuse.number}`).join("<br />") : ""
			}
			arr = [
				{
					attrDisplayName: "区域",
					attrDisplayValue: info.PLATFORM.attrDisplayValue
				},
				{
					attrDisplayName: info.RESOURCEPOOL.attrDisplayName,
					attrDisplayValue: info.RESOURCEPOOL.attrDisplayValue
				},
				{
					attrDisplayName: "CPU",
					attrDisplayValue: getValue("CPU")
				},
				{
					attrDisplayName: "内存",
					attrDisplayValue: getValue("内存", "GB")
				},
				{
					attrDisplayName: "磁盘信息",
					attrDisplayValue: getValue("磁盘", "GB")
				},
				{
					attrDisplayName: "网卡",
					attrDisplayValue: getValue("网卡")
				},
				{
					attrDisplayName: "IP地址",
					attrDisplayValue: `(内部)${priIPAddr}<br/> (外部)${iloIPAddress}`
				},
				{
					attrDisplayName: info.OSYSTEM.attrDisplayName,
					attrDisplayValue: info.OSYSTEM.attrDisplayValue
				},
				{
					attrDisplayName: "密码",
					attrDisplayValue: "已设置"
				},
				{
					attrDisplayName: info.INSTANCENAME.attrDisplayName,
					attrDisplayValue: info.INSTANCENAME.attrDisplayValue
				}
			]
		}else if (serviceType == 11){  //管理服务
			arr = [
				{
					attrDisplayName: "区域",
					attrDisplayValue: info.REGION.attrDisplayValue
				},
				{
					attrDisplayName: "可用区",
					attrDisplayValue: info.ZONE.attrDisplayValue
				},
				{
					attrDisplayName: "产品类型",
					attrDisplayValue: info.SERVICEOBJECTCODE.attrDisplayValue
				},
				{
					attrDisplayName: "产品名称",
					attrDisplayValue: info.INSTANCENAME.attrDisplayValue
				}
			]
		}
		console.log(arr, 435345345)
		return arr;
	}
}
