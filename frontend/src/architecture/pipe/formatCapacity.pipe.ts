/**** 将byte转化为TB/GB/MB/KB  {{102400 | formatCapacity}} ===> 100KB*****/

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "formatCapacity"
})

export class formatCapacity implements PipeTransform {

    transform(capacity: number): string {
        const Tn = 1099511627776.0;
        const Gn = 1073741824.0;
        const Mn = 1048576.0;
        const Kn = 1024.0;
        if (!capacity) {
            return "未知";
        } else {
            let c = capacity;
            if (c == 0) {
                return "0";
            }
            if (c >= Tn) {
                return (c / Tn).toFixed(2) + "TB";
            } else if (c >= Gn) {
                return (c / Gn).toFixed(2) + "GB";
            } else if (c >= Mn) {
                return (c / Mn).toFixed(2) + "MB";
            } else {
                return (c / Kn).toFixed(2) + "KB";
            }
        }
    }
}
