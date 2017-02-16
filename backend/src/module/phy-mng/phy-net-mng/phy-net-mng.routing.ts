import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhyNetMngComponent } from './component/phy-net-mng.component';
import { PhyNetIpUsageMngListComponent } from './component/phy-ipusage-mng-list.component';
import { PhyNetResourceSetupComponent } from './component/phy-setup-resource.component';
import { PhyNetDetailsComponent  } from './component/phy-net-details.component';
 

export const PhyNetRouting= RouterModule.forChild([
    {
        path: "phy-mng/phy-net/phy-net-mng",
        component: PhyNetMngComponent
    },
    {
        path: "phy-mng/phy-net/phy-net-ips-mng",
        component: PhyNetIpUsageMngListComponent
    },
    {
        path: "phy-mng/phy-net/phy-net-setup-resource",
        component: PhyNetResourceSetupComponent
    },
    {
        path: "phy-mng/phy-net/phy-net-details",
        component: PhyNetDetailsComponent
    },
]);
