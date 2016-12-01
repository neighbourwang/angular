import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderMngDetailComponent, OrderMngComponent,OrderMngSearchComponent,OrderMngSearchDetailComponent } from './component';

export const OrderMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'op-center/order-mng/order-mng',
        component: OrderMngComponent
    }
    ,{
        path: 'op-center/order-mng/order-mng-detail/:orderId',
        component: OrderMngDetailComponent
    },{
        path: 'op-center/order-mng/order-mng-search',
        component: OrderMngSearchComponent
    },{
        path: 'op-center/order-mng/order-mng-searchDetail',
        component: OrderMngSearchDetailComponent
    }   
]);