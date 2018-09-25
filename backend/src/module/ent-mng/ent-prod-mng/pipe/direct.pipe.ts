import { Pipe, Injectable, PipeTransform } from '@angular/core';

@Pipe({
    name: 'direct',
    pure: false
})

@Injectable()
export class DirectPipe implements PipeTransform {
    transform(items: any[], arg: any): any {
        return items.filter(item => item.direct == arg);
    }
}