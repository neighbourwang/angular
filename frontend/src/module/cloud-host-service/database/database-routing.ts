import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { DatabaseComponentOrder } from './component/database-order.component';
import { DatabaseListComponent } from './component/database-list.component';
import {DatabaseDetailComponent} from './component/database-detail.component';

export const DatabaseRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'database-list',
        component: DatabaseListComponent
    },
    {
        path: 'database-order',
        component: DatabaseComponentOrder
    },
    {
        path: 'database-detail/:itemId',
        component: DatabaseDetailComponent
    }
]);