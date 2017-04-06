﻿ import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

 import { AliMajorListComponent } from './component/ali-major-list.component';
 import { AliSubListComponent } from './component/ali-sub-list.component';

export const AliMngRouting= RouterModule.forChild([
    {
        path: "ali-cloud/ali-major-list",
        component: AliMajorListComponent
    },
    {
        path: "ali-cloud/ali-sub-list",
        component: AliSubListComponent
    },
]);