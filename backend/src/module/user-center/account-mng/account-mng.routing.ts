import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AccountMngComponent } from './component/account-mng-list.component';
import { AccountMngCrLocal } from './component/account-mng-cr-local.component';

export const AccountMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'user-center/account-mng/account-mng-list',
        component: AccountMngComponent
    },
    //编辑
    {
        path: 'user-center/account-mng/account-mng-cr-local/:id',
        component: AccountMngCrLocal
    },
    //创建
    {
        path: 'user-center/account-mng/account-mng-cr-local',
        component: AccountMngCrLocal
    },
    

]);
