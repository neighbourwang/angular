import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComputeTrendComponent} from './component/compute-trend.component';
import { StoreTrendComponent} from './component/store-trend.component';


export const TrendMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'mtc-center/trend-mng/compute-trend',
        component:  ComputeTrendComponent
    },
    {
        path: 'mtc-center/trend-mng/store-trend',
        component: StoreTrendComponent
    }
]);