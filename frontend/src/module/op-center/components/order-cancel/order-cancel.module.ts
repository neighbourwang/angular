import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../../architecture';
import { CommonComponentModule } from '../../../../architecture';

//component
import {DiskViewComponent} from './component/disk-view.component';
import {OrderMngCancelComponent} from './component/order-mng-cancel.component';
import {VmViewComponent} from './component/vm-view.component';
import {MachineViewComponent} from './component/machine-view.component';
import { OrderCancelService } from './service/order-cancel.service';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
    ],
    declarations: [
        VmViewComponent,
        OrderMngCancelComponent,
        DiskViewComponent,
        MachineViewComponent
    ],
    exports: [
        OrderMngCancelComponent,
        VmViewComponent,
        DiskViewComponent,
        MachineViewComponent
    ],
    providers: [
        OrderCancelService
    ]

})
export class OrderCancleModule { }