import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FirstComponent } from './component/First.component';
import { SearchComponent } from './component/search.component';

export const TestUtilRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'first',
        component: FirstComponent
    },
    {
        path: 'search',
        component: SearchComponent
    }

]);
