import { RouterModule } from "@angular/router";

import { ImgIndexComponent } from './component/img-index.component';

export const ImgIndexRouting = RouterModule.forChild([
    {
        path: 'host-mng/img-mng/img-index',
        component:  ImgIndexComponent 
    }
]);