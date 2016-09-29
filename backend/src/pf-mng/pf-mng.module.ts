import { NgModule } from '@angular/core';

// pf_conn_mng
import { PfConnMngModule } from './pf-conn-mng/pf-conn-mng.module';

import { SvcDirMngModule } from './svc-dir-mng/svc-dir-mng.module';

@NgModule({
    imports: [
        PfConnMngModule,
        SvcDirMngModule
    ],
    declarations: [],
    exports: [
        PfConnMngModule,
        SvcDirMngModule
    ],
    providers: []
})

export class PfMngModule { }