import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { cloudDriveListComponent } from './component/cloud-drive-list.component';

import { cloudDriveComponentOrder } from './component/cloud-drive-order.component';


export const CloudDriveRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'cloud-host-service/cloud-drive-list',
        component: cloudDriveListComponent
    },
    {
        path: 'cloud-host-service/cloud-drive-order',
        component: cloudDriveComponentOrder
    },
]);