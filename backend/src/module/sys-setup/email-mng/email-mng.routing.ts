import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmailMngComponent } from './component/email-mng.component';
import { EmailTemplateListComponent } from './component/email-template-list.component';
import { EmailTemplateDetailsComponent } from './component/email-template-details.component';

export const EmailMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: 'email-mng/email-list',
        component: EmailMngComponent
    },
    {
        path: 'email-mng/email-template-list',
        component: EmailTemplateListComponent
    },
    {
        path: 'email-mng/email-template-details',
        component: EmailTemplateDetailsComponent
    }

]);
