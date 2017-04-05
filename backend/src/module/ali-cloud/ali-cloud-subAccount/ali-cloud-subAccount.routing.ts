 import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AliCloudSubAccountListComponent } from './component/ali-cloud-subAccount-list.component';

export const AliCloudSubAccountRouting= RouterModule.forChild([
    {
        path: "ali-cloud-subAccount/ali-cloud-subAccount-list",
        component: AliCloudSubAccountListComponent
    },
]);
