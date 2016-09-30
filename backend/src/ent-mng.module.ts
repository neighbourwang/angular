import { NgModule } from '@angular/core';

// pf_conn_mng
import { EntResQuotaMngModule } from './ent-res-quota-mng/ent-res-quota-mng.module';

@NgModule({
    imports: [
        EntResQuotaMngModule
    ],
    declarations: [],
    exports: [
        EntResQuotaMngModule
    ],
    providers: []
})

export class EntMngModule { }