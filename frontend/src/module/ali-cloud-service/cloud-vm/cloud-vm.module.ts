import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// component 
import { AliCloudVmListComponent } from './component/cloud-vm-list.component';
import { AliCloudVmOrderComponent } from './component/cloud-vm-order.component';

//service 
import { AliCloudVmService } from "./service/cloud-vm.service";
import { AliCloudDiskService } from "../cloud-disk/service/cloud-disk.service";
import { AliCloudDiskDictService } from "../cloud-disk/service/cloud-disk-dict.service";


//routing
import { AliCloudVmRouting } from './cloud-vm.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        AliCloudVmRouting
    ],
    declarations: [
        AliCloudVmListComponent,
        AliCloudVmOrderComponent
    ],
    exports: [
        AliCloudVmListComponent,
        AliCloudVmOrderComponent
    ],
    providers: [
        AliCloudDiskService,
        AliCloudDiskDictService,
        AliCloudVmService
    ]

})
export class AliCloudVmModule { }
