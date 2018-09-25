import { NgModule } from '@angular/core';

import { afterNgForDirective } from './afterNgFor.directive';

@NgModule({
  declarations: [afterNgForDirective],
  exports: [afterNgForDirective]
})
export class AfterNgForModule {}
