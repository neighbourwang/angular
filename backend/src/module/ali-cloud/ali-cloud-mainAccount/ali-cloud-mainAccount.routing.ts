 import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AliCloudMainAccountListComponent } from './component/ali-cloud-mainAccount-list.component';
import { AliCloudMainAccountEditComponent } from './component/ali-cloud-mainAccount-edit.component';
import { AliCloudMainAccountEnterpriseComponent } from './component/ali-cloud-mainAccount-enterprise.component';

export const AliCloudMainAccountRouting= RouterModule.forChild([
    {
        path: "ali-cloud-mainAccount/ali-cloud-mainAccount-list",
        component: AliCloudMainAccountListComponent
    },
    {
        path: "ali-cloud-mainAccount/ali-cloud-mainAccount-edit",
        component: AliCloudMainAccountEditComponent
    },
    {
        path: "ali-cloud-mainAccount/ali-cloud-mainAccount-setEnterprise",
        component: AliCloudMainAccountEnterpriseComponent
    },
]);
