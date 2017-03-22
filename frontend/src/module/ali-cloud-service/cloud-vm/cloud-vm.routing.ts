import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { AliCloudVmListComponent } from './component/cloud-vm-list.component';
import { AliCloudVmOrderComponent } from './component/cloud-vm-order.component';

export const AliCloudVmRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path : 'ali-cloud-service/cloud-vm/cloud-vm-list',
        component : AliCloudVmListComponent
    },
    {
        path : 'ali-cloud-service/cloud-vm/cloud-vm-order',
        component : AliCloudVmOrderComponent
    }
]);