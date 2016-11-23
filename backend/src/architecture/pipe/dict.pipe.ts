import { Pipe, PipeTransform } from "@angular/core";
import { SystemDictionaryService } from '../../architecture';

@Pipe({
    name: "dict"
})

export class dictPipe implements PipeTransform {

    transform(value: string, promise:Promise<any[]>): Promise<any> {
        return promise.then(arrs => {

            arrs = arrs.filter(arr => {    //过滤字典
               return arr.value == value;
            });

            if(arrs.length) {   //是否取到了值
                return arrs[0].displayValue;
            }
            return "";
        })
    }
}
