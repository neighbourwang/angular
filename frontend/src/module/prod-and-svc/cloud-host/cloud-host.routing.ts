import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
    GeneralViewComponent, 
    HostOrderComponent,
    InstanceListComponent,
    InstantceDetailComponent
} from './component';


export const CloudHostRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'prod-and-svc/cloud-host/cloud-host-general-view',
        component: GeneralViewComponent
    },
    {
        path: 'prod-and-svc/cloud-host/cloud-host-order',
        component: HostOrderComponent
    },{
        path: 'prod-and-svc/cloud-host/cloud-host-ins-list',
        component: InstanceListComponent
    },{
        path: 'prod-and-svc/cloud-host/cloud-host-ins-detail/:uuid',
        component: InstantceDetailComponent
    }
]);