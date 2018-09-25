import { NgModule } from '@angular/core';

// Common Componets
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

import { OrderCancleModule } from '../components/order-cancel/order-cancel.module';

import { UnsubscribeModule } from '../../cloud-host-service/components/unsubscribe/unsubscribe.module';

// Routing
import { OrderMngRouting } from './order-mng.routing';

//component
import {OrderMngDetailComponent, OrderMngComponent,OrderMngRenewComponent
        ,OrderMngSearchComponent
        ,OrderMngSearchDetailComponent
        ,CostPandectComponent,CostPandectDepartmentComponent
        ,OrderRenewCompleteComponent} from './component';

@NgModule({
    imports: [
        CommonComponentModule,
        OrderMngRouting,
        OrderCancleModule,
        UnsubscribeModule,
        PipeModule
    ],
    declarations: [
        OrderMngDetailComponent,
        OrderMngComponent,
        OrderMngRenewComponent,
        OrderMngSearchComponent,
        OrderMngSearchDetailComponent
        ,CostPandectComponent
        ,CostPandectDepartmentComponent
        ,OrderRenewCompleteComponent
    ],
    exports: [],
    providers: []

})
export class OrderMngModule { }