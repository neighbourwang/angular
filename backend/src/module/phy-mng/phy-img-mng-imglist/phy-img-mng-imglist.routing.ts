import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PhyImgListComponent } from './component/phy-imglist.component';
import { PhyImgListShowImgComponent } from'./component/phy-imglist-showimg.component';
import { PhyImgListSyncComponent } from'./component/phy-imglist-sync.component';
import { PhyImgListSetentComponent } from'./component/phy-imglist-setent.component';
export const PhyImgMngImgListRouting= RouterModule.forChild([
    
    {
        path: "phy-img-mng/imglist",
        component: PhyImgListComponent
    },
    {
        path: "phy-img-mng/imglist/showimg",
        component: PhyImgListShowImgComponent
    },
    {
        path:"phy-img-mng/imglist/sync",
        component: PhyImgListSyncComponent
    },
    {
        path:"phy-img-mng/imglist/setent",
        component: PhyImgListSetentComponent
    }
    
]);