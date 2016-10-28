import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountMngComponent } from './component/account-mng-list.component';
// import { ProdCreComponent } from './component/prod-cre.component';

export const AccountMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'user-center/account-mng/account-mng-list',
        component: AccountMngComponent
    },
    

]);
