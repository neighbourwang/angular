import { Pipe, PipeTransform } from '@angular/core';
import { Instance } from '../model/instance';

@Pipe({
    name: 'instanceDispPipe',
    pure: false
})
export class InstanceDispPipe implements PipeTransform {
    transform(instances: Instance[], filter: string) {
        if (instances) {
            return instances.filter(instance => {
                let found = false;
                if (!filter || filter == '') {
                    found = true;
                } else {
                    found = found || this.compString(instance.instanceName, filter);
                    found = found || this.compString(instance.osInfo, filter);
                    found = found || this.compString(instance.specification, filter);
                    found = found || this.compString(instance.networkType, filter);
                    found = found || this.compString(instance.paymentType, filter);
                    found = found || this.compString(instance.ipAddress, filter)
                }

                return found;
            });
        }
    }

    compString(str1: string, str2: string): boolean {
        let ret: boolean = false;

        if (!str2 || str2 == '') {
            ret = true;
        } else if (str1 != null && str1.toLocaleLowerCase().indexOf(str2.toLocaleLowerCase()) >= 0){
            ret = true;
        }

        return ret;
    }
}