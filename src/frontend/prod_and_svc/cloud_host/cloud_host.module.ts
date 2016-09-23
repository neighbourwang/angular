import { NgModule } from '@angular/core';
// import { HttpModule, Jsonp } from '@angular/http';

// Common Componets
import { CommonComponentModule } from '../../../../src/common_components/common.module';

// cloud_host_ins_list
import { InstanceListComponent } from './cloud_host_ins_list/component/instance.component';
import { InstanceListService } from './cloud_host_ins_list/service/instance.service';
import { InstanceDispPipe } from './cloud_host_ins_list/pipe/instance.pipe';

// cloud_host_order
import { HostOrderComponent } from './cloud_host_order/component/order.component';
import { OrderService } from './cloud_host_order/service/order.service';

// Routing
import { CloudHostRouting } from './cloud_host.routing';

@NgModule({
    imports: [
        CommonComponentModule,
        // HttpModule,
        CloudHostRouting
    ],
    declarations: [
        InstanceListComponent,
        HostOrderComponent,
        InstanceDispPipe
    ],
    exports: [
        InstanceListComponent,
        HostOrderComponent
    ],
    providers: [
        OrderService,
        InstanceListService
    ]

})
export class CloudHostModule { }
