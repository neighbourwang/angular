import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// Routing
import { OrderMngRouting } from './order-mng.routing';

//component
import {OrderMngDetailComponent, OrderMngComponent,OrderMngRenewComponent,OrderMngCancelComponent
        ,OrderMngSearchComponent
        ,OrderMngSearchDetailComponent
        ,VmViewComponent
        ,DiskViewComponent
        ,CostPandectComponent,CostPandectDepartmentComponent} from './component';

@NgModule({
    imports: [
        CommonComponentModule,
        OrderMngRouting,
        PipeModule
    ],
    declarations: [
        OrderMngDetailComponent,
        OrderMngComponent,
        OrderMngRenewComponent,
        OrderMngCancelComponent,
        OrderMngSearchComponent,
        OrderMngSearchDetailComponent
        ,VmViewComponent
        ,DiskViewComponent
        ,CostPandectComponent
        ,CostPandectDepartmentComponent
    ],
    exports: [],
    providers: []

})
export class OrderMngModule { }