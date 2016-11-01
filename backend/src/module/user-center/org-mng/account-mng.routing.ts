import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

// import { ProdMngComponent } from './component/prod-mng.component';
// import { ProdCreComponent } from './component/prod-cre.component';

export const AccountMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'prod-mng/prod-mng/prod-mng',
        // component: ProdMngComponent
    },
    {
        path: 'prod-mng/prod-mng/prod-cre',
        // component: ProdCreComponent
    }

]);
