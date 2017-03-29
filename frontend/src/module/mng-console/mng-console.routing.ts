import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MngConsoleComponent } from './component/mng-console.component';

export const MngConsoleRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: MngConsoleComponent
    }
    
]);