import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { OrderByPipe } from './orderby';
import { dictPipe } from './dict.pipe';
import { formatDataPipe } from './formatData.pipe';
import { decimalPlacesPipe } from './decimalPlaces.pipe';
import { ObjectToArrPipe } from './objectToArr.pipe';


@NgModule({
    imports: [
       CommonModule
    ],
    declarations: [
        OrderByPipe,
        dictPipe,
        formatDataPipe,
        decimalPlacesPipe,
        ObjectToArrPipe
    ],
    exports: [
        OrderByPipe,
        dictPipe,
        formatDataPipe,
        decimalPlacesPipe,
        ObjectToArrPipe
    ],
    providers: [],
})
export class PipeModule { }
