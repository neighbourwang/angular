import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { CrCloudHostComponent } from './component/cr-cloud-host.component';

import { cloudHostComponentOrder } from './component/cloud-host-order.component';


export const VmInstanceRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'cloud-host-service/vm-instance/cr-cloud-host',
        component: CrCloudHostComponent
    },
    {
        path: 'cloud-host-service/cloud-host-order',
        component: cloudHostComponentOrder
    },
]);