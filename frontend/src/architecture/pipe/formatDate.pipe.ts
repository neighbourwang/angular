/**** 时间戳转为时间  {{1497654369000 | formatDate}} ===> 2017-06-17 07:06:09*****/

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "formatDate"
})

export class formatDatePipe implements PipeTransform {

    transform(number : number): string {
    	if(!number) return "";
    	
        const d = new Date(number);
        const cr = (nub:number) => nub<10 ? ("0"+nub) : nub;
        return (d.getFullYear()+"-"+(cr(d.getMonth()+1))+"-"+cr(d.getDate())+" "+cr(d.getHours())+":"+cr(d.getMinutes())+":"+cr(d.getSeconds()));
    }
}
