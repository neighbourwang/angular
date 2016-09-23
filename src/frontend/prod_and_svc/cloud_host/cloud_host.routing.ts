import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InstanceListComponent } from './cloud_host_ins_list/component/instance.component';
import { HostOrderComponent } from './cloud_host_order/component/order.component';

export const CloudHostRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'prod_and_svc',
        redirectTo: 'prod_and_svc/cloud_host/cloud_host_ins_list',
        pathMatch: 'full'
    },
    {
        path: 'prod_and_svc/cloud_host/cloud_host_order',
        component: HostOrderComponent
    },
    {
        path: 'prod_and_svc/cloud_host/cloud_host_ins_list',
        component: InstanceListComponent
    }
]);