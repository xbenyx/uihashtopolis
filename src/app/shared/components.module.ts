import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { FormsModule } from "@angular/forms";
import { ColorPickerModule } from 'ngx-color-picker';
import { FilterTextboxModule } from "./filter-textbox/filter-textbox.module";

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ColorPickerModule,
    FilterTextboxModule
  ],
  exports: [
    CommonModule,
    AlertComponent,
    LoadingSpinnerComponent,
    ColorPickerModule,
    FilterTextboxModule
  ]
})
export class ComponentsModule {}
