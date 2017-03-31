import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../../architecture';
import { CommonComponentModule } from '../../../../architecture';
import { ProductInfoTableModule } from '../product-info-table/product-info-table.module';

//component
import { UnsubscribeComponent } from './unsubscribe.component';

import { UnsubscribeService } from './unsubscribe.service';



@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        ProductInfoTableModule
    ],
    declarations: [
        UnsubscribeComponent,
    ],
    exports: [
        UnsubscribeComponent,
    ],
    providers: [
        UnsubscribeService
    ]

})
export class UnsubscribeModule { }