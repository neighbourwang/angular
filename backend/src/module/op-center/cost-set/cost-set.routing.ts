import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CostSetListComponent,CostSetDefaultComponent} from './component';

export const CostSetRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'cost-set-list',
        component: CostSetListComponent
    },
    {
        path: 'cost-set-default',
        component: CostSetDefaultComponent
    }
     
]);