 import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AliCloudSubAccountListComponent } from './component/ali-cloud-subAccount-list.component';
import { AliCloudSubAccountEditComponent } from './component/ali-cloud-subAccount-edit.component';
import { AliCloudSubAccountEnterpriseComponent } from './component/ali-cloud-subAccount-enterprise.component';

export const AliCloudSubAccountRouting= RouterModule.forChild([
    {
        path: "ali-cloud-subAccount/ali-cloud-subAccount-list",
        component: AliCloudSubAccountListComponent
    },
    {
        path: "ali-cloud-subAccount/ali-cloud-subAccount-edit",
        component: AliCloudSubAccountEditComponent
    },
      {
        path: "ali-cloud-subAccount/ali-cloud-subAccount-setEnterprise",
        component: AliCloudSubAccountEnterpriseComponent
    },
]);
