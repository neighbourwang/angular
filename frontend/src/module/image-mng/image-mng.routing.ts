import { ModuleWithProviders } from "@angular/core";
import { RouterModule } from "@angular/router";

//Components
import { ImgMngComponent_dlm } from './image-mng-dlm/component/img-mng.component';
import { ImgMngComponent_fhd } from './image-mng-fhd/component/img-mng.component';
import { ImgMngComponent_gcy } from './image-mng-gcy/component/img-mng.component';
import { ImgMngComponent_my } from './image-mng-my/component/img-mng.component';
import { ImgMngComponent_wxl } from './image-mng-wxl/component/img-mng.component';
export const ImgMngRouting = RouterModule.forChild([
    {
        path: "image-mng/image-mng-dlm",
        component: ImgMngComponent_dlm
    },
    {
        path: "image-mng/image-mng-fhd",
        component: ImgMngComponent_fhd
    },
        {
        path: "image-mng/image-mng-gcy",
        component: ImgMngComponent_dlm
    },
        {
            path: "image-mng/image-mng-my",
            component: ImgMngComponent_dlm
        },
        {
            path: "image-mng/image-mng-wxl",
            component: ImgMngComponent_wxl
        }
    
]);