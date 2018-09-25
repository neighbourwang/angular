/****

调用方法如下：
1. 在你自己组件的service里面引入 SystemDictionaryService，并添加到constructor里面
import { SystemDictionaryService } from '../../../../architecture’;
constructor(
    private dict:SystemDictionaryServicei
) { };

2. 在service文件里面设置你自己所需要的数据，如：
dictProductType = this.dict.get({      //这里的调用的方法为promise 所以dictProductType是一个promise
    owner : "GLOBAL",
    field : “SERVICE_TYPE”    
});

3. {{cart.serviceType | dict:service.dictProductType | async}}
解读：cart.serviceType为调用后端的数据，一般是0，1，2之类的数字，后面是一个dict的管道，冒号后面的service.dictProductType是我们在service设置的promise，后面再加一个async的管道，就渲染出来的
****/

import { Pipe, PipeTransform, Injectable } from "@angular/core";
import { SystemDictionaryService } from '../../architecture';

@Pipe({
    name: "dict"
})

@Injectable()
export class dictPipe implements PipeTransform {

    transform(value: string, promise:Promise<any[]>): Promise<string> {
        return promise.then(arrs => {

            if(!$.isArray(arrs)) return "";  //如果不是arr返回空

            arrs = arrs.filter(arr => arr.value == value); //过滤字典

            if(arrs.length) {   //是否取到了值
                return arrs[0].displayValue;
            }
            return "";
        })
    }
}
