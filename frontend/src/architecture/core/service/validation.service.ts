﻿import { Injectable } from '@angular/core';

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
}