import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhyNetMngComponent } from './component/phy-net-mng.component';
import { PhyNetIpUsageMngListComponent } from './component/phy-ipusage-mng-list.component';
 

export const PhyNetRouting= RouterModule.forChild([
    {
        path: "phy-mng/phy-net/phy-net-mng",
        component: PhyNetMngComponent
    },
    {
        path: "phy-mng/phy-net/phy-net-ips-mng",
        component: PhyNetIpUsageMngListComponent
    },    
]);
