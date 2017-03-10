import { NgModule } from '@angular/core';
import { PipeModule } from '../../../architecture';
import { CommonComponentModule } from '../../../architecture';

// Routing
import { EmailMngRouting } from './email-mng.routing';

//Components
import { EmailMngComponent } from './component/email-mng.component';
import { EmailTemplateListComponent } from './component/email-template-list.component';
import { EmailTemplateDetailsComponent } from './component/email-template-details.component';

//Service
import { EmailMngService } from "./service/email-mng.service";
import { EmailMngDictService } from "./service/email-mng-dict.service";


@NgModule({
    imports: [
        CommonComponentModule,
        EmailMngRouting,
        PipeModule
    ],
    declarations: [
        EmailMngComponent,
        EmailTemplateListComponent,
        EmailTemplateDetailsComponent
    ],
    exports: [
    ],
    providers: [
        EmailMngService,
        EmailMngDictService,
    ]

})
export class EmailMngModule { }