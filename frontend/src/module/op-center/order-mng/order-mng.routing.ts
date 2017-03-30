import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderRenewCompleteComponent,CostPandectDepartmentComponent,CostPandectComponent,OrderMngDetailComponent, OrderMngComponent, OrderMngRenewComponent,OrderMngSearchComponent,OrderMngSearchDetailComponent} from './component';

export const OrderMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'order-mng/order-mng',
        component: OrderMngComponent
    }
    ,{
        path: 'order-mng/order-mng-detail',
        component: OrderMngDetailComponent
    },{
        path: 'order-mng/order-mng-renew',
        component: OrderMngRenewComponent
    },{
        path: 'order-mng/order-mng-search',
        component: OrderMngSearchComponent
    },{
        path: 'order-mng/order-mng-searchDetal',
        component: OrderMngSearchDetailComponent
    },{
        path: 'order-mng/cost-pandect',
        component: CostPandectComponent
    },{
        path: 'order-mng/cost-pandect-department',
        component: CostPandectDepartmentComponent
    },{
        path: 'order-mng/order-renew-complete',
        component: OrderRenewCompleteComponent
    }
    
]);