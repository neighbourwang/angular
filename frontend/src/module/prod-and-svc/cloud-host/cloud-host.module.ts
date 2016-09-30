import { NgModule } from '@angular/core';

// cloud_host_order
import { CloudHostOrderModule } from './cloud-host-order/cloud-host-order.module';
// cloud_host_ins_list
import { CloudHostInsListModule } from './cloud-host-ins-list/cloud-host-ins-list.module';

@NgModule({
    imports: [
        CloudHostInsListModule,
        CloudHostOrderModule,
    ],
    declarations: [],
    exports: [
        CloudHostInsListModule,
        CloudHostOrderModule
    ],
    providers: []
})

export class CloudHostModule { }