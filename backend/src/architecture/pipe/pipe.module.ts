import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { OrderByPipe } from './orderby';
import { dictPipe } from './dict.pipe';


@NgModule({
    imports: [
       CommonModule
    ],
    declarations: [
        OrderByPipe,
        dictPipe
    ],
    exports: [
        OrderByPipe,
        dictPipe
    ],
    providers: [],
})
export class PipeModule { }
