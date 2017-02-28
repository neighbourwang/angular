import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhyImgListComponent } from './component/phy-imglist.component';
 

export const PhyImgMngImgListRouting= RouterModule.forChild([
    
    {
        path: "phy-img-mng/imglist",
        component: PhyImgListComponent
    },
    
]);