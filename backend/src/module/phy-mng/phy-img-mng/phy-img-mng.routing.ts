import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhyImgMngComponent } from './component/phy-img-mng.component';
//import { PhyNetIpUsageMngListComponent } from './component/phy-ipusage-mng-list.component';
//import { PhyNetResourceSetupComponent } from './component/phy-setup-resource.component';
//import { PhyNetDetailsComponent  } from './component/phy-net-details.component';
 

export const PhyImgRouting= RouterModule.forChild([
    
    {
        path: "phy-mng/phy-img/phy-img-mng",
        component: PhyImgMngComponent
    },
    
]);