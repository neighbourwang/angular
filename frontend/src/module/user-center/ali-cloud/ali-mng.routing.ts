 import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

 import { AliMajorListComponent } from './component/ali-major-list.component';
 import { AliSubListComponent } from './component/ali-sub-list.component';
 import { AliSharedListComponent } from './component/ali-shared-list.component';

export const AliMngRouting= RouterModule.forChild([
    {
        path: "ali-cloud/ali-major-list",
        component: AliMajorListComponent
    },
    {
        path: "ali-cloud/ali-sub-list/:loginName",
        component: AliSubListComponent
    },
    {
        path: "ali-cloud/ali-shared-list",
        component: AliSharedListComponent
    }
]);
