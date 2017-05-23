import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { MiddlewareComponentOrder } from './component/middleware-order.component';
// import { MiddlewareListComponent } from './component/middleware-list.component';
// import {MiddlewareDetailComponent} from './component/middleware-detail.component';

export const MiddlewareRouting: ModuleWithProviders = RouterModule.forChild([
    // {
    //     path: 'middleware-list',
    //     component: MiddlewareListComponent
    // },
    {
        path: 'middleware-order',
        component: MiddlewareComponentOrder
    },
    // {
    //     path: 'middleware-detail/:itemId',
    //     component: MiddlewareDetailComponent
    // }
]);