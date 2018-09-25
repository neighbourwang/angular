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

import {OrderViewModule} from '../op-center/components/order-view/order-view.module';
@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        CheckCenterRouting,
        OrderViewModule
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