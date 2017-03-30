 import { ModuleWithProviders } from '@angular/core';
 import { RouterModule } from '@angular/router';

 import { PhyPoolMngComponent } from './component/phy-pool-mng.component';
 import { PhyCreatComponent } from './component/phy-creat.component';
 import { PhyUnitMngComponent } from './component/phy-unit-mng.component';

export const PhyPoolRouting= RouterModule.forChild([
    {
        path: "phy-pool/phy-pool-mng",
        component: PhyPoolMngComponent
    },
    {
        path: "phy-pool/phy-creat",
        component: PhyCreatComponent
    },
    {
        path: "phy-pool/phy-unit-mng",
        component: PhyUnitMngComponent
    }
]);
