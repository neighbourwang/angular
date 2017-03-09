import { NgModule } from '@angular/core';

import { EmailMngModule } from './email-mng/email-mng.module';

@NgModule({
    imports: [
        EmailMngModule,
    ],
    declarations: [],
    exports: [
        EmailMngModule,
    ],
    providers: []
})

export class SysSetupModule { }
