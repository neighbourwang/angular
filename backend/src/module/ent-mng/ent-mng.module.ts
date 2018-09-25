import { NgModule } from '@angular/core';

// pf_conn_mng
import { EntResQuotaMngModule } from './ent-res-quota-mng/ent-res-quota-mng.module';
import { EntAdminMngModule } from './ent-admin-mng/ent-admin-mng.module';
import { EntEstMngModule } from './ent-est-mng/ent-est-mng.module'
import { EntProdMngModule } from './ent-prod-mng/ent-prod-mng.module'
import { AttestMngModule } from './ent-attest-mng/attest-mng.module'

@NgModule({
    imports: [
        EntResQuotaMngModule,
        EntAdminMngModule,
        EntEstMngModule,
        EntProdMngModule,
        AttestMngModule
    ],
    declarations: [],
    exports: [
        EntResQuotaMngModule,
        EntAdminMngModule,
        EntEstMngModule,
        EntProdMngModule,
        AttestMngModule
    ],
    providers: []
})

export class EntMngModule { }