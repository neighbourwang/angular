import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HostOrderComponent } from './component/order.component';


export const CloudHostOrderRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'prod-and-svc/cloud-host/cloud-host-order',
        component: HostOrderComponent
    }
]);