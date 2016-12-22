import { Injectable } from '@angular/core';

@Injectable()
export class DialogTranslate {
    paramSign = '^^^';

    getText(val?: String ): String{
        return val?val.split(this.paramSign)[0]:'';
    };

    getParam(val?: String ): String{
        return val?val.split(this.paramSign)[1]:'';
    };
}