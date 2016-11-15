import { Injectable } from '@angular/core';

@Injectable()
export class Validation {

    phones = "(\\+?0?86\\-?)?((13\\d|14[57]|15[^4,\\D]|17[678]|18\\d)\\d{8}|170[059]\\d{7})";
   

    tel = "(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?";

    base64 = "(?:[A-Z0-9+\\/]{4})*(?:[A-Z0-9+\\/]{2}==|[A-Z0-9+\\/]{3}=|[A-Z0-9+\\/]{4})";

    number = "(?:-?\\d+|-?\\d{1,3}(?:,\\d{3})+)?(?:\\.\\d+)?";

    url = "(?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})).?)(?::\\d{2,5})?(?:[/?#]\\S*)?";

    email = "\\S+@\\S+\\.\\S+";

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