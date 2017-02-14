import { NgModule } from '@angular/core';

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
        ,CostManageComponent } from './component';

@NgModule({
    imports: [
        CommonComponentModule,
        PipeModule,
        OrderMngRouting
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
    ],
    exports: [],
    providers: []

})
export class OrderMngModule { }