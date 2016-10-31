import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import {OrderMngDetailComponent } from './component/order-mng-detail.component';

export const OrderMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'op-center/order-mng/order-mng-detail',
        component: OrderMngDetailComponent
    }
    
]);