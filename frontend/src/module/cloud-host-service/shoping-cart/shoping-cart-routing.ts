import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { cartListComponent } from './component/cart-list.component';

import { cartOrderComponent } from './component/cart-order.component';


export const ShopingCartRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'cloud-host-service/cart-list',
        component: cartListComponent
    },
    {
        path: 'cloud-host-service/cart-order',
        component: cartOrderComponent
    },
]);