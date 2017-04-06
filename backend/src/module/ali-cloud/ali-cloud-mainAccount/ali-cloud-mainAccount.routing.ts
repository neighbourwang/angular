 import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AliCloudMainAccountListComponent } from './component/ali-cloud-mainAccount-list.component';

export const AliCloudMainAccountRouting= RouterModule.forChild([
    {
        path: "ali-cloud-mainAccount/ali-cloud-mainAccount-list",
        component: AliCloudMainAccountListComponent
    },
]);
