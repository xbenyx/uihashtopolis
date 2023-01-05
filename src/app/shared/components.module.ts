import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { FilterBoxComponent } from "./filter-box/filter-box.component";
import { FormsModule } from "@angular/forms";
import { ColorPickerModule } from 'ngx-color-picker';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    FilterBoxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    FilterBoxComponent,
    ColorPickerModule
  ]
})
export class ComponentsModule {}
