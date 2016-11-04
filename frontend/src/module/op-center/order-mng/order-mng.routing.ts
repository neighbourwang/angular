import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderMngDetailComponent, OrderMngComponent, OrderMngRenewComponent,OrderMngCancelComponent} from './component';

export const OrderMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'op-center/order-mng/order-mng',
        component: OrderMngComponent
    }
    ,{
        path: 'op-center/order-mng/order-mng-detail',
        component: OrderMngDetailComponent
    },{
        path: 'op-center/order-mng/order-mng-renew',
        component: OrderMngRenewComponent
    },{
        path: 'op-center/order-mng/order-mng-cancel',
        component: OrderMngCancelComponent
    }
    
]);