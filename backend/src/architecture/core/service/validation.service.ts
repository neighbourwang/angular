import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
    // 非空验证
    isBlank(val: any): boolean {
        return val === undefined || val === '' || val === null;
    }

    // 邮件地址验证
    isEmail(val: string): boolean {
        const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return reg.test(val);
    }

    // 数字验证
    isNumber(val: any): boolean {
        const reg = /^\d*$/;
        return reg.test(val);
    }

    // 数字验证(限定长度)
    isLengthLimitNumber(val: any, length: number): boolean {
        const reg = new RegExp("\d{0, " + length + "}", 'g');
        return reg.test(val);
    }

    //是否手机号
    isMoblie(val: any): boolean {
        const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        return reg.test(val);
    }

    //是否固话
    isTel(val: any): boolean {
        const reg = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
        return reg.test(val);
    }
}