 import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhyCreatComponent } from './component/phy-creat.component.ts';

export const PhyCreatRouting= RouterModule.forChild([
    {
        path: "phy-mng/phy-pool/phy-creat",
        component: PhyCreatComponent
    },
]);
