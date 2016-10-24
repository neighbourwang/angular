import { NgModule } from '@angular/core';

// common
import { CommonComponentModule } from '../../../architecture';

//routing

import { VmInstanceRouting } from './vm-instance-routing';

//component
import { CrCloudHostComponent } from './component/cr-cloud-host.component';

import { cloudHostComponentOrder } from './component/cloud-host-order.component';

//service
import { IndexCloudHostService } from './service/index-cloud-host.service'; 


@NgModule({
    imports: [
        VmInstanceRouting,
        CommonComponentModule
    ],
    declarations: [
        CrCloudHostComponent,
        cloudHostComponentOrder
    ],
    exports: [
    ],
    providers: [
        IndexCloudHostService
    ]

})
export class VmInstanceModule { }
