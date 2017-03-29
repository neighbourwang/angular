import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ComputeTrendComponent} from './component/compute-trend.component';
import { StoreTrendComponent} from './component/store-trend.component';


export const TrendMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'trend-mng/compute-trend',
        component:  ComputeTrendComponent
    },
    {
        path: 'trend-mng/store-trend',
        component: StoreTrendComponent
    }
]);