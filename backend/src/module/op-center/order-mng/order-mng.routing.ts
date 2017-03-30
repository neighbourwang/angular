import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderMngDetailComponent, OrderMngComponent,OrderMngSearchComponent,OrderMngSearchDetailComponent,CostPandectComponent, CostManageComponent} from './component';

export const OrderMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'order-mng',
        component: OrderMngComponent
    }
    ,{
        path: 'order-mng-detail/:orderId',
        component: OrderMngDetailComponent
    },{
        path: 'order-mng-search',
        component: OrderMngSearchComponent
    },{
        path: 'order-mng-searchDetail',
        component: OrderMngSearchDetailComponent
    },{
        path: 'cost-pandect',
        component: CostPandectComponent
    },{
        path: 'cost-manage',
        component: CostManageComponent
    }   
]);