import { Pipe, PipeTransform } from '@angular/core';
import { Directory } from '../model/directory';

@Pipe({
    name: 'directoryDispPipe',
    pure: false
})
export class DirectoryDispPipe implements PipeTransform {
    transform(directories: Directory[], filter: string) {
        if (directories) {
            return directories.filter(directory => {
                let found = false;
                if (!filter || filter == '') {
                    found = true;
                } else {
                    found = found || this.compString(directory.instanceName, filter);
                    found = found || this.compString(directory.osInfo, filter);
                    found = found || this.compString(directory.specification, filter);
                    found = found || this.compString(directory.networkType, filter);
                    found = found || this.compString(directory.paymentType, filter);
                    found = found || this.compString(directory.ipAddress, filter)
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