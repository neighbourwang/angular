import { NgModule } from '@angular/core';

// cloud_host_ins_list
import { CloudHostInsListModule } from './cloud_host/cloud_host_ins_list/cloud_host_ins_list.module';

// cloud_host_order
import { CloudHostOrderModule } from './cloud_host/cloud_host_order/cloud_host_order.module';

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

export class ProdAndSvcModule { }