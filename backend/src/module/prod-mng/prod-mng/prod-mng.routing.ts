/**
 * Created by wangyao on 2016/10/18.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProdMngComponent } from './component/prod-mng.component';
import { ProdCreComponent } from './component/prod-cre.component';
import { ProdDetailComponent } from './component/prod-detail.component';


export const ProdMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'prod-mng/prod-mng/prod-mng',
        component: ProdMngComponent
    },
    {
        path: 'prod-mng/prod-mng/prod-cre',
        component: ProdCreComponent
    },
    {
        path: 'prod-mng/prod-mng/prod-detail/:id',
        component: ProdDetailComponent
    }

]);
