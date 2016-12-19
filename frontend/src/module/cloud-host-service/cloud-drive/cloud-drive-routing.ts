import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { osDiskOrderComponent } from './component/os-disk-order.component';
import { vwDiskOrderComponent } from './component/vw-disk-order.component';
import { osDiskListComponent } from './component/os-disk-list.component';
import { vwDiskListComponent } from './component/vw-disk-list.component';


export const CloudDriveRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'cloud-host-service/cloud-drive-list',
        component: osDiskListComponent
    },
    {
        path: 'cloud-host-service/vw-disk-list',
        component: vwDiskListComponent
    },
    {
        path: 'cloud-host-service/cloud-drive-order',
        component: osDiskOrderComponent
    },
    {
        path: 'cloud-host-service/vw-disk-order',
        component: vwDiskOrderComponent
    },
]);