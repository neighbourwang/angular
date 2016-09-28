import { NgModule } from '@angular/core';

// pf_conn_mng
import { PfConnMngCreModule } from './pf-conn-mng/pf-conn-mng.module';

import { SvcDirMngModule } from './svc-dir-mng/svc-dir-mng.module';

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