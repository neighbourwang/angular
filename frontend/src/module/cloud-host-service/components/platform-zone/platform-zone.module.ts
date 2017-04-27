import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../../architecture';
import { CommonComponentModule } from '../../../../architecture';
import { ProductInfoTableModule } from '../product-info-table/product-info-table.module';

//component
import { PlatformZoneComponent } from './platform-zone.component';

import { PlatformZoneServiceList } from './platform-zone.service';



@NgModule({
    imports: [
        CommonComponentModule,
    ],
    declarations: [
        PlatformZoneComponent,
    ],
    exports: [
        PlatformZoneComponent,
    ],
    providers: [
        PlatformZoneServiceList
    ]

})
export class PlatformZoneModule { }