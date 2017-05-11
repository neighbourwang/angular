import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../../architecture';
import { CommonComponentModule } from '../../../../architecture';
import { ProductInfoTableModule } from '../product-info-table/product-info-table.module';

//component
import { RegionResourcepollComponent } from './region-resourcepoll.component';

import { RegionResourcepollServiceList } from './region-resourcepoll.service';



@NgModule({
    imports: [
        CommonComponentModule,
    ],
    declarations: [
        RegionResourcepollComponent,
    ],
    exports: [
        RegionResourcepollComponent,
    ],
    providers: [
        RegionResourcepollServiceList
    ]

})
export class RegionResourcepollModule { }