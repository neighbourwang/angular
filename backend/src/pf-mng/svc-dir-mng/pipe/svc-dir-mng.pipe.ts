import { Pipe, PipeTransform } from '@angular/core';
import { Directory } from '../model/directory';

@Pipe({
    name: 'directoryDispPipe',
    pure: false
})
export class DirectoryDispPipe implements PipeTransform {
    transform(directories: Directory[], filter: number) {
        if (directories) {
            return directories.filter(directory => {
                let found = false;
                if (directory.regionId && directory.regionId == filter) {
                    found = true;
                }
                
                return found;
            });
        }
    }

    compNumber(val1: number, val2: number): boolean {
        let ret: boolean = false;

        if (!val2 || val2 == 0) {
            ret = true;
        } else if (val1 != null && val1 == val2){
            ret = true;
        }

        return ret;
    }
}