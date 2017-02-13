/**
 * Created by wangyao on 2016/10/18.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProdDirListComponent } from './component/prod-dir-list.component';
import { ProdDirCreComponent } from './component/prod-dir-cre.component';
import { ProdDirDiskCreComponent } from './component/prod-dirDisk-cre.component';
import { PhsicalProdDirCreComponent } from "./component/prod-dirPhsical-cre.component";


export const ProdDirMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        // path: 'pf-mng2/cl-mng/cl-mng',
        path: 'prod-mng/prod-dir-mng/prod-dir-mng',
        component: ProdDirListComponent
    },
    {
        path: 'prod-mng/prod-dir-mng/prod-dir-cre',
        component: ProdDirCreComponent
    },
    {
        path: 'prod-mng/prod-dir-mng/prod-dirDisk-cre',
        component: ProdDirDiskCreComponent
    },
    {
        path: 'prod-mng/prod-dir-mng/prod-dirPhsical-cre',
        component: PhsicalProdDirCreComponent
    },
]);
