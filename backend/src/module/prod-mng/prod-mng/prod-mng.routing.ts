/**
 * Created by wangyao on 2016/10/18.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProdMngComponent } from './component/prod-mng.component';
import { ProdCreComponent } from './component/prod-cre.component';
import { ProdDetailComponent } from './component/prod-detail.component';

import { ProdMngCreStep1Component} from './component/prod-mng-cre-step-1.component';
import { ProdMngCreStep2Component} from './component/prod-mng-cre-step-2.component';
import { ProdMngCreStep3Component} from './component/prod-mng-cre-step-3.component';
import { ProdMngCreStep4Component} from './component/prod-mng-cre-step-4.component';

export const ProdMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'prod-mng/prod-mng',
        component: ProdMngComponent
    },
    {
        path: 'prod-mng/prod-cre',
        component: ProdCreComponent
    },
    {
        path: 'prod-mng/prod-mng-cre-1',
        component: ProdMngCreStep1Component
    },
    {
        path: 'prod-mng/prod-mng-cre-2',
        component: ProdMngCreStep2Component
    },
    {
        path: 'prod-mng/prod-mng-cre-3',
        component: ProdMngCreStep3Component
    },
    {
        path: 'prod-mng/prod-mng-cre-4',
        component: ProdMngCreStep4Component
    },

    {
        path: 'prod-mng/prod-detail',
        component: ProdDetailComponent
    }

]);
