/*****
计算部件的总数量
*****/

import { Pipe, PipeTransform, Injectable } from "@angular/core";

@Pipe({
	name: 'countPartLength'
})

@Injectable()
export class CountPartLengthPipe implements PipeTransform {
	transform(part: any): string {
		if( part.partsName === "内存" || part.partsName === "磁盘" ) {
			return parseFloat(part.specValue) * part.number + "GB"
		}
		return "";
	}
}