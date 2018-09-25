/*****
把对象转换为数组
<tr>           
  <td *ngFor="#key of object | objectToArr">{{key}}: {{object[key]}}</td>
</tr>
*****/

import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { SystemDictionaryService } from '../../architecture';

@Pipe({
	name: 'objectToArr'
})

@Injectable()
export class ObjectToArrPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push(key);
    }
    return keys;
  }
}