import { NgModule } from '@angular/core';

// pf_conn_mng
import { PfConnMngCreModule } from './pf_conn_mng/pf_conn_mng_cre/pf_conn_mng_cre.module';

@NgModule({
    imports: [
        PfConnMngCreModule
    ],
    declarations: [],
    exports: [
        PfConnMngCreModule
    ],
    providers: []
})

export class PfMngModule { }