 import { ModuleWithProviders } from '@angular/core';
 import { RouterModule } from '@angular/router';

 import { PhyPoolMngComponent } from './component/phy-pool-mng.component';
 import { PhyCreatComponent } from './component/phy-creat.component.ts';
 

export const PhyPoolRouting= RouterModule.forChild([
    {
        path: "phy-mng/phy-pool/phy-pool-mng",
        component: PhyPoolMngComponent
    },
    {
        path: "phy-mng/phy-pool/phy-creat",
        component: PhyCreatComponent
    },
]);
