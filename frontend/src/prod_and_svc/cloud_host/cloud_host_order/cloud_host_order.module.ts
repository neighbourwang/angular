import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../../src/common_components/common.module';

// cloud_host_ins_list
import { HostOrderComponent } from './component/order.component';
import { OrderService } from './service/order.service';

// Routing
import { CloudHostOrderRouting } from './cloud_host_order.routing';

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
