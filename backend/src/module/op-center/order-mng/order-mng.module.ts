import { NgModule } from '@angular/core';
import {OrderViewModule} from '../components/order-view/order-view.module';
// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// Routing
import { OrderMngRouting } from './order-mng.routing';

//component
import {OrderMngDetailComponent
        , OrderMngComponent
        ,OrderMngRenewComponent
        , OrderMngCancelComponent
        ,OrderMngSearchComponent
        ,OrderMngSearchDetailComponent
        ,VmViewComponent
        ,DiskViewComponent
        ,CostPandectComponent
        // ,MachineViewComponent
        // ,ServiceViewComponent
        ,CostManageComponent } from './component';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        OrderMngRouting,
        OrderViewModule
    ],
    declarations: [
        OrderMngDetailComponent
        ,OrderMngComponent
        ,OrderMngRenewComponent
        ,OrderMngCancelComponent
        ,OrderMngSearchComponent
        ,OrderMngSearchDetailComponent
        ,VmViewComponent
        ,DiskViewComponent
        ,CostPandectComponent
        ,CostManageComponent
        // ,MachineViewComponent
        // ,ServiceViewComponent
    ],
    exports: [],
    providers: []

})
export class OrderMngModule { }