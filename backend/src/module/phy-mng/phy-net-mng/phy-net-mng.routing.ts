import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhyNetMngComponent } from './component/phy-net-mng.component';
import { PhyNetMngIpAddrComponent } from './component/phy-net-mng-ip-addr.component';
import { PhyNetSetupResourceComponent } from './component/phy-net-setup-resource.component';
import { PhyNetDetailsComponent  } from './component/phy-net-details.component';
 

export const PhyNetRouting= RouterModule.forChild([
    {
        path: "phy-mng/phy-net/phy-net-mng",
        component: PhyNetMngComponent
    },
    {
        path: "phy-mng/phy-net/phy-net-mng-ip-addr",
        component: PhyNetMngIpAddrComponent
    },
    {
        path: "phy-mng/phy-net/phy-net-setup-resource-1",
        component: PhyNetSetupResourceComponent
    },
    {
        path: "phy-mng/phy-net/phy-net-details",
        component: PhyNetDetailsComponent
    },
]);
