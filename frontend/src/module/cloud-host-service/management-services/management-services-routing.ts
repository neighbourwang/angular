import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { ManagementServicesOrderComponent } from './component/management-services-order.component';
// import { ManagementServicesListComponent } from './component/management-services-list.component';

// import {ManagementServicesDetailComponent} from './component/management-services-detail.component';

export const ManagementServicesRouting: ModuleWithProviders = RouterModule.forChild([
    // {
    //     path: 'management-services-list',
    //     component: ManagementServicesListComponent
    // },
    {
        path: 'management-services-order',
        component: ManagementServicesOrderComponent
    },
    // {
    //     path: 'management-services-detail',
    //     component: ManagementServicesDetailComponent
    // }
]);