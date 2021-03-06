import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// component 
import { AliCloudDiskListComponent } from './component/cloud-disk-list.component';
import { AliCloudDiskOrderComponent } from './component/cloud-disk-order.component';
import { AliCloudDiskDetailComponent } from './component/cloud-disk-detail.component';

//service 
import { AliCloudDiskService } from "./service/cloud-disk.service";
import { AliCloudDiskDictService } from "./service/cloud-disk-dict.service";

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
        AliCloudDiskOrderComponent,
        AliCloudDiskDetailComponent
    ],
    exports: [
        AliCloudDiskListComponent,
        AliCloudDiskOrderComponent,
        AliCloudDiskDetailComponent
    ],
    providers: [
        AliCloudDiskService,
        AliCloudDiskDictService
    ]

})
export class AliCloudDiskModule { }
