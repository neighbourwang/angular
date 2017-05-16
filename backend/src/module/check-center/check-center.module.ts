import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../architecture';
import { PipeModule } from '../../architecture';

// Routing
import { CheckCenterRouting } from './check-center.routing';

//component
import { CheckMngListComponent } from './component/check-mng-list.component';
import { CheckMngHascheckComponent } from './component/check-mng-hascheck.component';
import { CheckMngSetComponent } from './component/check-mng-set.component';
import {VmViewComponent} from './component/vm-view.component';
import {DiskViewComponent} from './component/disk-view.component';
// import {MachineViewComponent} from '../op-center/order-mng/component/machine-view.component';
// import {ServiceViewComponent} from '../op-center/order-mng/component/service-view.component';
import {OrderViewModule} from '../op-center/components/order-view/order-view.module';
@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        CheckCenterRouting,
        OrderViewModule
        // MachineViewComponent,
        // ServiceViewComponent
    ],
    declarations: [
         CheckMngListComponent,
         CheckMngHascheckComponent,
         CheckMngSetComponent,
         VmViewComponent,
         DiskViewComponent,
        //  OrderViewModule
      
    ],
    exports: [],
    providers: []

})
export class CheckCenterModule { }