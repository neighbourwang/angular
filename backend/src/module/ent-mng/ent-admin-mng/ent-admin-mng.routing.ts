import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";

import { EntAdminCreComponent } from "./component/ent-admin-cre.component";
import { EntAdminMngComponent } from "./component/ent-admin-mng.component";
import { EntAdminCreADComponent } from "./component/ent-admin-cre-ad.component";
import { EntAdminEditADComponent } from "./component/ent-admin-edit-ad.component";

export const EntAdminMngRouting = RouterModule.forChild([
    {
        path: "ent-admin-mng/ent-admin-mng/:id",
        component: EntAdminMngComponent
    },
    {
        path: "ent-admin-mng/ent-admin-cre/enterprise/:eid/id/:aid",
        component: EntAdminCreComponent
    },
    {
        path: "ent-admin-mng/ent-admin-cre/enterprise/:eid",
        component: EntAdminCreComponent
    },
    {
        path: "ent-admin-mng/ent-admin-cre-ad/enterprise/:eid/id/:aid",
        component: EntAdminEditADComponent
    },
    {
        path: "ent-admin-mng/ent-admin-cre-ad/enterprise/:eid",
        component: EntAdminCreADComponent
    }
]);