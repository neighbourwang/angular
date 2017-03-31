import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../../architecture';
import { CommonComponentModule } from '../../../../architecture';

//component
import {orderCompleteComponent} from './order-complete.component';

import { orderCompleteService } from './order-complete.service';

import { formatInfo } from './formatInfo'; 

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
    ],
    declarations: [
        orderCompleteComponent,
        formatInfo
    ],
    exports: [
        orderCompleteComponent,
        formatInfo
    ],
    providers: [
        orderCompleteService
    ]

})
export class OrderCompleteModule { }