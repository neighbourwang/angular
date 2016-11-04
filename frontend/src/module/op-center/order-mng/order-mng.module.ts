import { NgModule } from '@angular/core';

// Common Componets
import { CommonComponentModule } from '../../../architecture';

// Routing
import { OrderMngRouting } from './order-mng.routing';

//component
import {OrderMngDetailComponent, OrderMngComponent,OrderMngRenewComponent} from './component';

@NgModule({
    imports: [
        CommonComponentModule,
        OrderMngRouting
    ],
    declarations: [
        OrderMngDetailComponent
        ,OrderMngComponent,
        OrderMngRenewComponent
    ],
    exports: [],
    providers: []

})
export class OrderMngModule { }