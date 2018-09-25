/*****
计算部件的总数量
*****/

import { Pipe, PipeTransform, Injectable } from "@angular/core";

@Pipe({
	name: 'filterInstanceList'
})

@Injectable()
export class FilterInstanceListPipe implements PipeTransform {
	transform(instanceList: any, code): string {
		if(!instanceList || code == "8") return instanceList

		return instanceList.filter(instance => instance.value == code);
	}
}