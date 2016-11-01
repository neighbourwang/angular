import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import {OrderMngDetailComponent, OrderMngComponent } from './component';

export const OrderMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'op-center/order-mng/order-mng',
        component: OrderMngComponent
    }
    
]);