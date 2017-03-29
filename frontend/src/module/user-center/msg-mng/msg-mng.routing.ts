import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

//component
import { MsgListComponent } from './component/msg-list.component';

export const MsgMngRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path : 'msg-mng/msg-list',
        component : MsgListComponent
    }
]);