import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhyImgMngComponent } from './component/phy-img-mng.component';
import { PhyImgMngAllocateComponent } from'./component/phy-img-mng-allocate.component';

export const PhyImgRouting= RouterModule.forChild([
    
    {
        path: "phy-img/phy-img-mng",
        component: PhyImgMngComponent
    },
    {
        path: "phy-img/phy-img-mng-allocate",
        component: PhyImgMngAllocateComponent
    }
    
]);