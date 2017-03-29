import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { cartListComponent } from './component/cart-list.component';

import { cartOrderComponent } from './component/cart-order.component';


export const ShopingCartRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'cart-list',
        component: cartListComponent
    },
    {
        path: 'cart-order/:orderlist',
        component: cartOrderComponent
    },
]);