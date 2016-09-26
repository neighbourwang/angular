import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HostOrderComponent } from './component/order.component';


export const CloudHostOrderRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'prod_and_svc/cloud_host/cloud_host_order'
        component: HostOrderComponent
    }
]);