/**** 时间戳转为时间  {{1497654369000 | formatData}} ===> 2017-06-17 07:06:09*****/

import { Pipe, PipeTransform } from "@angular/core";
import { SystemDictionaryService } from '../../architecture';

@Pipe({
    name: "formatData"
})

export class formatDataPipe implements PipeTransform {

    transform(number : number): string {
        const d = new Date(number);
        const cr = (nub:number) => nub<10 ? ("0"+nub) : nub;
        return (d.getFullYear()+"-"+(cr(d.getMonth()+1))+"-"+cr(d.getDate())+" "+cr(d.getHours())+":"+cr(d.getMinutes())+":"+cr(d.getSeconds()));
    }
}
