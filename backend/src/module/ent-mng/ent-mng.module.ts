import { NgModule } from '@angular/core';

// pf_conn_mng
import { EntResQuotaMngModule } from './ent-res-quota-mng/ent-res-quota-mng.module';
import { EntAdminMngModule } from './ent-admin-mng/ent-admin-mng.module';
@NgModule({
    imports: [
        EntResQuotaMngModule,
        EntAdminMngModule
    ],
    declarations: [],
    exports: [
        EntResQuotaMngModule,
        EntAdminMngModule
    ],
    providers: []
})

export class EntMngModule { }