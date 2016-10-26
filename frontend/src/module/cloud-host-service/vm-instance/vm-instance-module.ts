import { NgModule } from '@angular/core';

// common
import { CommonComponentModule } from '../../../architecture';

//routing

import { VmInstanceRouting } from './vm-instance-routing';

//component
import { cloudHostListComponent } from './component/cloud-host-list.component';

import { cloudHostComponentOrder } from './component/cloud-host-order.component';

//service
import { cloudHostServiceOrder } from './service/cloud-host-order.service'; 
import { cloudHostServiceList } from './service/cloud-host-list.service'; 


@NgModule({
    imports: [
        VmInstanceRouting,
        CommonComponentModule
    ],
    declarations: [
        cloudHostListComponent,
        cloudHostComponentOrder
    ],
    exports: [
    ],
    providers: [
        cloudHostServiceOrder,
        cloudHostServiceList
    ]

})
export class VmInstanceModule { }
