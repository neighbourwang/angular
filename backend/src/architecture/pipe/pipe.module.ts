import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { OrderByPipe } from './orderby';
import { dictPipe } from './dict.pipe';
import { formatDatePipe } from './formatDate.pipe';
import { decimalPlacesPipe } from './decimalPlaces.pipe';
import { ObjectToArrPipe } from './objectToArr.pipe';
import { formatCapacity } from './formatCapacity.pipe';

@NgModule({
    imports: [
       CommonModule
    ],
    declarations: [
        OrderByPipe,
        dictPipe,
        formatDatePipe,
        decimalPlacesPipe,
        ObjectToArrPipe,
        formatCapacity
    ],
    exports: [
        OrderByPipe,
        dictPipe,
        formatDatePipe,
        decimalPlacesPipe,
        ObjectToArrPipe,
        formatCapacity
    ],
    providers: [OrderByPipe,
        dictPipe,
        formatDatePipe,
        decimalPlacesPipe,
        ObjectToArrPipe,
        formatCapacity
    ]
})
export class PipeModule { }
