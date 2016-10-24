import { NgModule } from '@angular/core';

// common
import { CommonComponentModule } from '../../../architecture';

//routing

import { VmInstanceRouting } from './vm-instance-routing';

//component
import { CrCloudHostComponent } from './component/cr-cloud-host.component';

import { cloudHostComponentOrder } from './component/cloud-host-order.component';

//service
import { cloudHostServiceOrder } from './service/cloud-host-order.service'; 


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
        cloudHostServiceOrder
    ]

})
export class VmInstanceModule { }
