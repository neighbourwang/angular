import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// component 
import { AliCloudDiskListComponent } from './component/cloud-disk-list.component';
import { AliCloudDiskOrderComponent } from './component/cloud-disk-order.component';

//service 
import { AliCloudDiskService } from "./service/cloud-disk.service";

//routing
import { AliCloudDiskRouting } from './cloud-disk.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        AliCloudDiskRouting
    ],
    declarations: [
        AliCloudDiskListComponent,
        AliCloudDiskOrderComponent
    ],
    exports: [
        AliCloudDiskListComponent,
        AliCloudDiskOrderComponent
    ],
    providers: [
        AliCloudDiskService
    ]

})
export class AliCloudDiskModule { }
