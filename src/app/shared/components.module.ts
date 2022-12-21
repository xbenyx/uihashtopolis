import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { FilterBoxComponent } from "./filter-box/filter-box.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    FilterBoxComponent
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    FilterBoxComponent
  ]
})
export class ComponentsModule {}
