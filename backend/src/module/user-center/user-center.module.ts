import { NgModule } from '@angular/core';

import { AccountMngModule } from './account-mng/account-mng.module';
import { RoleMngModule } from './role-mng/role-mng.module';  
// import { ProdMngModule } from './prod-mng/prod-mng.module';


@NgModule({
    imports: [
        AccountMngModule,
        RoleMngModule
    ],
    declarations: [],
    exports: [
        AccountMngModule,
        RoleMngModule
    ],
    providers: []
})

export class UserCenterModule { }
