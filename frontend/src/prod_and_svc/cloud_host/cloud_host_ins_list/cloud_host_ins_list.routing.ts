import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InstanceListComponent } from './component/instance.component';


export const CloudHostInsListRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'prod_and_svc/cloud_host/cloud_host_ins_list',
        component: InstanceListComponent
    }
]);