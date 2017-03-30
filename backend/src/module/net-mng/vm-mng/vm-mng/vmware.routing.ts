import { RouterModule } from "@angular/router";

import { VmwareStdNetComponent } from './component/vmware-std-net.component';

export const VmwareRouting = RouterModule.forChild([
    {
        path: "vm-mng/:pid",
        component: VmwareStdNetComponent 
    }
]);