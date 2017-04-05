 import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AliMajorMngComponent } from './component/ali-major-mng.component';

export const AliCloudMajorRouting= RouterModule.forChild([
    {
        path: "ali-cloud-major/ali-major-mng",
        component: AliMajorMngComponent
    },
]);
