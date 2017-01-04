 import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhyPoolMngComponent } from './component/phy-pool-mng.component';

export const PhyPoolRouting= RouterModule.forChild([
    {
        path: "phy-mng/phy-pool/phy-pool-mng",
        component: PhyPoolMngComponent
    },
]);
