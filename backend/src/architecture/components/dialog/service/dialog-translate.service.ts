import { Injectable } from '@angular/core';

@Injectable()
export class DialogTranslate {
    paramSign = '^^^';

    getText(val?: String ): String{
        return val?val.split(this.paramSign)[0]:'';
    };

    getParam(val?: String ): any{
        if(val){
            let obj = {};
            let valArray = val.split(this.paramSign);
            for(let i =0; i<valArray.length; i++) {
                if(i>0){
                    obj['value_' + i] = valArray[i];
                }
            }
            return obj;
        }else{
            return {value: ''};
        }
    };

    getId(val?: String): String{
        return val.replace(/[&\|\\\*^%$#@\-:： ；。，,.]/g,"")
    }
}