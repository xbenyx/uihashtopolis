import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { AlertComponent } from "./alert/alert.component";
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { FormsModule } from "@angular/forms";
import { ColorPickerModule } from 'ngx-color-picker';
import { FilterTextboxModule } from "./filter-textbox/filter-textbox.module";
import { PaginationModule } from "./pagination/pagination.module";
import { TimeoutComponent } from "./alert/timeout/timeout.component";

@NgModule({
  declarations: [
    AlertComponent,
    TimeoutComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ColorPickerModule,
    FilterTextboxModule,
    PaginationModule,
  ],
  exports: [
    CommonModule,
    AlertComponent,
    TimeoutComponent,
    LoadingSpinnerComponent,
    ColorPickerModule,
    FilterTextboxModule,
    PaginationModule,
  ]
})
export class ComponentsModule {}
