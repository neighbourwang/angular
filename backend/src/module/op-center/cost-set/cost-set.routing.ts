import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CostSetListComponent,CostSetDefaultComponent} from './component';

export const CostSetRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'op-center/cost-set/cost-set-list',
        component: CostSetListComponent
    },
    {
        path: 'op-center/cost-set/cost-set-default',
        component: CostSetDefaultComponent
    }
     
]);