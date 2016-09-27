import { NgModule } from '@angular/core';

// pf_conn_mng
import { PfConnMngCreModule } from './pf_conn_mng/pf_conn_mng_cre/pf_conn_mng_cre.module';

import { SvcDirMngModule } from './svc_dir_mng/svc_dir_mng.module';

@NgModule({
    imports: [
        PfConnMngCreModule,
        SvcDirMngModule
    ],
    declarations: [],
    exports: [
        PfConnMngCreModule,
        SvcDirMngModule
    ],
    providers: []
})

export class PfMngModule { }