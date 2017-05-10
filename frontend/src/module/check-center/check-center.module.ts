import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../architecture';
import { CommonComponentModule } from '../../architecture';
import { OrderCancleModule } from '../op-center/components/order-cancel/order-cancel.module';
// Routing
import { CheckCenterRouting } from './check-center.routing';

//component
import { CheckMngListComponent } from './component/check-mng-list.component';
import { CheckMngHascheckComponent } from './component/check-mng-hascheck.component';
import { CheckMngSetComponent } from './component/check-mng-set.component';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        CheckCenterRouting,
        OrderCancleModule
    ],
    declarations: [
         CheckMngListComponent,
         CheckMngHascheckComponent,
         CheckMngSetComponent
    ],
    exports: [],
    providers: []

})
export class CheckCenterModule { }