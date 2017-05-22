import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FirstComponent } from './component/First.component';

export const TestUtilRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'first',
        component: FirstComponent
    }

]);
