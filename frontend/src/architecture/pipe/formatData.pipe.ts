/**** 时间戳转为时间  {{1497654369000 | formatData}} ===> 2017-6-17 7:6:9*****/

import { Pipe, PipeTransform } from "@angular/core";
import { SystemDictionaryService } from '../../architecture';

@Pipe({
    name: "formatData"
})

export class formatDataPipe implements PipeTransform {

    transform(number : number): string {
        var d = new Date(number);
        return (d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
    }
}
