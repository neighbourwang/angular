import { Injectable } from '@angular/core';

const uuids = {
  '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
  '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
  'all': /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
};

interface ValidationRegs {
    [key: string] : [string|number, Array<Function> , string];
}

@Injectable()
class Validation {
    result = {};   //验证的实时结果

    isBase     = (v:any):boolean => /(^[a-zA-Z\u4e00-\u9fa5-_\d]*$)/.test(v);   //基本的验证 不含特殊字符 可为空
    isUnBlank  = (v:any):boolean => !(v === undefined || v === '' || v === null);   //非空验证
    isNumber   = (v:any):boolean => /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(v);  //是否为数字
    isMoblie   = (v:any):boolean => /(^\+?(86)?(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$)/.test(v);  //是否为手机号
    isTel      = (v:any):boolean => /(^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$)/.test(v);  //是否是电话号码
    isUrl      = (v:any):boolean => /(^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$)/i.test(v);  //是否是url
    isInstanceName = (v:any):boolean => /(^[a-zA-Z\u4e00-\u9fa5].{1,67}$)/.test(v);   //云主机云硬盘名称 2-68个字符，以大小写字母或中文开头
    isPassword = (v:any):boolean => /(^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^\sA-Za-z0-9])\S*$)/.test(v);  //同时包括三项（大写字母，小写字母，数字和特殊符号）
    isEmail    = (v:any):boolean => /(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/.test(v);  //是否是email
    isInteger  = (v:any):boolean => /^\d*$/.test(v);  //是否是整数
    isIpaddress= (v:any):boolean => /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(v);  //是否是IP
    isAliCloudInstanceName = (v:any):boolean => /((^([a-zA-Z\u4e00-\u9fa5])+)([a-zA-Z\u4e00-\u9fa5\_\-\.0-9].{1,127}$))/.test(v);   //阿里云主机名称 2-128个字符，以大小写字母或中文开头
    isAliCloudPassword = (v:any):boolean => /(^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,31}$)/.test(v);

    //下面为curry函数
    min = (min:number):Function => (v:any):boolean => +v >= min;   //数字的最小值
    max = (max:number):Function => (v:any):boolean => +v <= max;   //数字的最大值
    range = (min:number, max:number):Function => (v:any):boolean => this.min(min)(v) && this.max(max)(v);    //数字的范围
    minLength = (min:number):Function => (v:string):boolean => v.length >= min;    //字符的长度最小值
    maxLength = (max:number):Function => (v:string):boolean => v.length <= max;    //字符串长度的最大值
    lengthRange = (min:number, max:number):Function => (v:string):boolean => this.minLength(min)(v) && this.maxLength(max)(v);   //字符串长度范围
    uuid = (version:"3"|"4"|"5"|"all" = "all"):Function => (v:any):boolean => new RegExp( uuids[version] || uuids.all ).test(v);  //uuid
    equalTo = (target:any):Function => (v:any):boolean => target === v;  //等于某个数
    equalToArr = (arr:any[]):Function => (v:any):boolean => arr.indexOf(v) > -1;  //在某个数组里含有
    notEqualTo = (target:any):Function => (v:any):boolean => target !== v;  //不等于某个数
    notEqualToArr = (arr:any[]):Function => (v:any):boolean => arr.indexOf(v) === -1;  //不在某个数组里含有
    startAtValue = (value:string):Function => (v:any):boolean => new RegExp( "^"+value ).test(v);  //开头必须包含某个值
    notStartAtValue = (value:string):Function => (v:any):boolean => !new RegExp( "^"+value ).test(v);  //开头不能包含某个值

    check(key, reg:ValidationRegs){  //对外方法  可以验证单个和验证所有
        let errorMessage;  
        if(key) {
            errorMessage = this.checkSigle(key, reg);
        }else {
            for(let r in reg){
                errorMessage = this.checkSigle(r, reg);
                if(errorMessage) break;
            }
        }

        return errorMessage;
    }

    //验证是否是空字符且不是isUnBlank函数
    //是为了把除了isUnBlank函数以外的函数全都包装为
    //传入的v如果为空，则直接返回true  
    //目的是为了可以允许输入空值
    private checkBlank = (validationFun:Function):Function => { 
        return (v:string):boolean => (validationFun !== this.isUnBlank && v === "") ? true : validationFun(v);
    };

    private checkSigle(key, reg:ValidationRegs):string {   //验证单个key值 私有方法
        if(!reg[key]) return;

        let [value, regulars, alertText] = reg[key],
            errorMessage = "";
        value = this.isUnBlank(value) ? value : "";

        for(let regular of regulars){
            // console.log(regular, value, regular(value))
            if(this.checkBlank(regular)(value)) {
                this.result[key] = "";
            }else {
                this.result[key] = errorMessage = alertText;
                break;
            };
        }
        return errorMessage;
    }
}

export {
    Validation,
    ValidationRegs
}


 // {
    //   'zh-CN': /^(\+?0?86\-?)?((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/,
    //   'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
    //   'en-ZA': /^(\+?27|0)\d{9}$/,
    //   'en-AU': /^(\+?61|0)4\d{8}$/,
    //   'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
    //   'fr-FR': /^(\+?33|0)[67]\d{8}$/,
    //   'de-DE': /^(\+?49|0)[1-9]\d{10}$/,
    //   'pt-PT': /^(\+351)?9[1236]\d{7}$/,
    //   'el-GR': /^(\+?30)?(69\d{8})$/,
    //   'en-GB': /^(\+?44|0)7\d{9}$/,
    //   'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
    //   'en-ZM': /^(\+26)?09[567]\d{7}$/,
    //   'ru-RU': /^(\+?7|8)?9\d{9}$/,
    //   'nb-NO': /^(\+?47)?[49]\d{7}$/,
    //   'nn-NO': /^(\+?47)?[49]\d{7}$/,
    //   'vi-VN': /^(0|\+?84)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
    //   'en-NZ': /^(\+?64|0)2\d{7,9}$/
    // };