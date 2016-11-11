import { NgModule } from "@angular/core";
import { Ng2Bs3ModalModule } from "ng2-bs3-modal/ng2-bs3-modal";

// Common Components
import { CommonComponentModule } from "../../../architecture";

// pf-conn-mng
import { EntLdapMngComponent } from "./component/ent-ldap-mng.component";

import { EntLdapMngService} from "./service/ent-ldap-mng.service";

// Routing
import { EntLdapMngRouting } from "./ent-ldap-mng.routing";

@NgModule({
    imports: [
        Ng2Bs3ModalModule,
        CommonComponentModule,
        EntLdapMngRouting
    ],
    declarations: [
        EntLdapMngComponent
    ],
    exports: [
        EntLdapMngComponent
    ],
    providers: [
        EntLdapMngService
    ]

})
export class EntLdapMngModule {
}