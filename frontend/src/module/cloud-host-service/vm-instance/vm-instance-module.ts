import { NgModule } from '@angular/core';

// common
import { CommonComponentModule } from '../../../architecture';

//routing

import { VmInstanceRouting } from './vm-instance-routing';

//component
import { cloudHostListComponent } from './component/cloud-host-list.component';

import { cloudHostComponentOrder } from './component/cloud-host-order.component';

import { CartButtonComponent } from '../components/cart-button/cart-button.component';

//service
import { cloudHostServiceOrder } from './service/cloud-host-order.service'; 
import { cloudHostServiceList } from './service/cloud-host-list.service'; 

// import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        VmInstanceRouting,
        CommonComponentModule,
        // MyDatePickerModule
        // TabsModule
        // TreeModule
    ],
    declarations: [
        cloudHostListComponent,
        cloudHostComponentOrder,
        CartButtonComponent
    ],
    exports: [
    ],
    providers: [
        cloudHostServiceOrder,
        cloudHostServiceList
    ]

})
export class VmInstanceModule { }
