 import { ModuleWithProviders } from '@angular/core';
 import { RouterModule } from '@angular/router';

 import { PhyPoolMngComponent } from './component/phy-pool-mng.component';
 import { PhyCreatComponent } from './component/phy-creat.component';
 import { PhyUnitMngComponent } from './component/phy-unit-mng.component';

export const PhyPoolRouting= RouterModule.forChild([
    {
        path: "phy-mng/phy-pool/phy-pool-mng",
        component: PhyPoolMngComponent
    },
    {
        path: "phy-mng/phy-pool/phy-creat",
        component: PhyCreatComponent
    },
    {
        path: "phy-mng/phy-pool/phy-unit-mng",
        component: PhyUnitMngComponent
    }
]);
