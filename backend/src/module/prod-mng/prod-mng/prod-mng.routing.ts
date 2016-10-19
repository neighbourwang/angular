/**
 * Created by wangyao on 2016/10/18.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProdMngComponent } from './component/prod-mng.component.ts';

export const ProdMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'prod-mng/prod-mng/prod-mng',
        component: ProdMngComponent
    },
    
]);
