import { Injectable } from '@angular/core';
import { ValidationService } from '../../../../architecture';

/*
https://www.npmjs.com/package/ip
*/
const ip = require('ip');

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UtilValidationService {
    constructor(
        private validationService: ValidationService
    ) { }

    isIP(val: any): boolean {
        const reg = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/;
        return reg.test(val);
    }

    isUrl(val: any): boolean {
        return true;
    }

    validate(name: string, val: any, op: string) {
        let map: any = {
            "*": {
                "func": this.validationService.isBlank,
                "msg": "NET_MNG_VM_IP_MNG.CANT_NULL"
            },
             "url": {
                "func": val => !this.isUrl(val),
                "msg": "NET_MNG_VM_IP_MNG.INVALID"
            }
        }

        if (map[op].func(val)) {
            return [name, map[op].msg];
        }
        else
            return undefined;
    }



}