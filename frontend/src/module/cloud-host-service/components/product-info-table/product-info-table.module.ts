import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../../architecture';
import { CommonComponentModule } from '../../../../architecture';

//component
import {ProductInfoTableComponent} from './product-info-table.component';
import {ProductInfoTrComponent} from './product-info-tr.component';

import { ProductInfoTableService } from './product-info-table.service';

import { formatInfo } from './formatInfo'; 
import { releatedToItem } from './relatedToItem.pipe'; 

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
    ],
    declarations: [
        ProductInfoTableComponent,
        ProductInfoTrComponent,
        formatInfo,
        releatedToItem
    ],
    exports: [
        ProductInfoTableComponent,
        ProductInfoTrComponent,
        formatInfo,
        releatedToItem
    ],
    providers: [
        ProductInfoTableService
    ]

})
export class ProductInfoTableModule { }