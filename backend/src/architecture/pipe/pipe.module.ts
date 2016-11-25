import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { OrderByPipe } from './orderby';
import { dictPipe } from './dict.pipe';
import { formatDataPipe } from './formatData.pipe';
import { decimalPlacesPipe } from './decimalPlaces.pipe';


@NgModule({
    imports: [
       CommonModule
    ],
    declarations: [
        OrderByPipe,
        dictPipe,
        formatDataPipe,
        decimalPlacesPipe
    ],
    exports: [
        OrderByPipe,
        dictPipe,
        formatDataPipe,
        decimalPlacesPipe
    ],
    providers: [],
})
export class PipeModule { }
