import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

// component 
import { AliCloudDiskListComponent } from './component/cloud-disk-list.component';
import { AliCloudDiskOrderComponent } from './component/cloud-disk-order.component';

export const AliCloudDiskRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path : 'cloud-disk/cloud-disk-list',
        component : AliCloudDiskListComponent
    },
    {
        path : 'cloud-disk/cloud-disk-order',
        component : AliCloudDiskOrderComponent
    }
]);