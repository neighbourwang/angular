import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// component 
import { AliCloudVmListComponent } from './component/cloud-vm-list.component';
import { AliCloudVmOrderComponent } from './component/cloud-vm-order.component';
import { AliCloudVmDetailComponent } from './component/cloud-vm-detail.component';

//service 
import { AliCloudVmService } from "./service/cloud-vm.service";
import { AliCloudVMDictService } from "./service/cloud-vm-dict.service";
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
        AliCloudVmOrderComponent,
        AliCloudVmDetailComponent
    ],
    exports: [
        AliCloudVmListComponent,
        AliCloudVmOrderComponent,
        AliCloudVmDetailComponent
    ],
    providers: [
        AliCloudDiskService,
        AliCloudDiskDictService,
        AliCloudVmService,
        AliCloudVMDictService
    ]

})
export class AliCloudVmModule { }
