import { RouterModule } from "@angular/router";

import { VmNSXIndexComponent } from './component/index-nsx.component';

export const VmNSXIndexRouting = RouterModule.forChild([
    {
        path: "net-mng/vm-mng-nsx/index/:pid",
        component: VmNSXIndexComponent 
    }
]);