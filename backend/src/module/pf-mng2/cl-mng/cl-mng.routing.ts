/**
 * Created by junjie on 16/10/17.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClMngListComponent } from './component/cl-mng-list.component';

export const ClMngRouting: ModuleWithProviders = RouterModule.forChild([
  {
      path: 'pf-mng2/cl-mng/cl-mng',
      component: ClMngListComponent
  },
]);
