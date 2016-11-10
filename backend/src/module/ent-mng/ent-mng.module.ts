import { NgModule } from '@angular/core';

// pf_conn_mng
import { EntResQuotaMngModule } from './ent-res-quota-mng/ent-res-quota-mng.module';
import { EntAdminMngModule } from './ent-admin-mng/ent-admin-mng.module';
import { EntEstMngModule } from './ent-est-mng/ent-est-mng.module'
import { EntProdMngModule } from './ent-prod-mng/ent-prod-mng.module'
import { EntLdapMngModule } from './ent-ldap-mng/ent-ldap-mng.module'

@NgModule({
    imports: [
        EntResQuotaMngModule,
        EntAdminMngModule,
        EntEstMngModule,
        EntProdMngModule,
        EntLdapMngModule
    ],
    declarations: [],
    exports: [
        EntResQuotaMngModule,
        EntAdminMngModule,
        EntEstMngModule,
        EntProdMngModule,
        EntLdapMngModule
    ],
    providers: []
})

export class EntMngModule { }