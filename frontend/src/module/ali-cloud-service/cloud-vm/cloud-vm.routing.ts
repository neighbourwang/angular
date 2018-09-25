import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { AliCloudVmListComponent } from './component/cloud-vm-list.component';
import { AliCloudVmOrderComponent } from './component/cloud-vm-order.component';
import { AliCloudVmDetailComponent } from './component/cloud-vm-detail.component';

export const AliCloudVmRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path : 'cloud-vm/cloud-vm-list',
        component : AliCloudVmListComponent
    },
    {
        path : 'cloud-vm/cloud-vm-order',
        component : AliCloudVmOrderComponent
    },
    {
        path : 'cloud-vm/cloud-vm-detail',
        component : AliCloudVmDetailComponent
    }
]);