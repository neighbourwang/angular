import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../../architecture';
import { CommonComponentModule } from '../../../../architecture';

//component
import {DiskViewComponent} from './component/disk-view.component';
import {OrderMngCancelComponent} from './component/order-mng-cancel.component';
import {VmViewComponent} from './component/vm-view.component';

import { OrderCancelService } from './service/order-cancel.service';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
    ],
    declarations: [
        VmViewComponent,
        OrderMngCancelComponent,
        DiskViewComponent
    ],
    exports: [
        OrderMngCancelComponent,
        VmViewComponent,
        DiskViewComponent
    ],
    providers: [
        OrderCancelService
    ]

})
export class OrderCancleModule { }