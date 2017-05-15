import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { cloudDriveComponentOrder } from './component/cloud-drive-order.component';
import { cloudDriveListComponent } from './component/cloud-drive-list.component';


export const CloudDriveRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'cloud-drive-list',
        component: cloudDriveListComponent
    },
    {
        path: 'cloud-drive-order',
        component: cloudDriveComponentOrder
    },
]);