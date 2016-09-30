import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../../architecture';

// cloud_host_ins_list
import { HostOrderComponent } from './component/order.component';
import { OrderService } from './service/order.service';

// Routing
import { CloudHostOrderRouting } from './cloud-host-order.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        CloudHostOrderRouting
    ],
    declarations: [
        HostOrderComponent
    ],
    exports: [
        HostOrderComponent
    ],
    providers: [
        OrderService
    ]

})
export class CloudHostOrderModule { }
