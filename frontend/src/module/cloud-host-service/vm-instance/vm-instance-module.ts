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

// import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';

// import { TreeModule } from 'angular2-tree-component';

@NgModule({
    imports: [
        VmInstanceRouting,
        CommonComponentModule,
        // TabsModule
        // TreeModule
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
