import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent

  ]
})
export class ComponentsModule {}
