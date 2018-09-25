import { RouterModule } from "@angular/router";

import { VmDisIndexComponent } from './component/index.component';

export const VmDisIndexRouting = RouterModule.forChild([
    {
        path: "vm-mng-dbt/index/:pid",
        component: VmDisIndexComponent 
    }
]);