import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InstanceListComponent } from './component/instance.component';


export const CloudHostInsListRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'prod-and-svc/cloud-host/cloud-host-ins-list',
        component: InstanceListComponent
    }
]);