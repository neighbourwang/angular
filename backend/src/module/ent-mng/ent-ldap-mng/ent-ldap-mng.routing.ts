import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";

import { EntLdapMngComponent } from "./component/ent-ldap-mng.component";

export const EntLdapMngRouting = RouterModule.forChild([
    {
        path: "ent-mng/ent-ldap-mng/ent-ldap-mng/:id",
        component: EntLdapMngComponent
    },
    {
        path: "ent-mng/ent-ldap-mng/ent-ldap-mng",
        component: EntLdapMngComponent
    },
 
]);