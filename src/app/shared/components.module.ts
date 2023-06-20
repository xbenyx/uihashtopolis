import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { HashtypeDetectorComponent } from "./hashtype-detector/hashtype-detector.component";
import { HexconvertorComponent } from "./utils/hexconvertor/hexconvertor.component";
import { CheatsheetComponent } from "./alert/cheatsheet/cheatsheet.component";
import { FilterTextboxModule } from "./filter-textbox/filter-textbox.module";
import { TableModule } from "./table/button-actions/table-actions.module";
import { SwitchThemeModule } from "./switch-theme/switch-theme.module";
import { TimeoutComponent } from "./alert/timeout/timeout.component";
import { PaginationModule } from "./pagination/pagination.module";
import { PageTitleModule } from "./page-title/page-title.module";
import { AlertComponent } from "./alert/alert.component";
import { GraphsModule } from "./graphs/graphs.module";
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    HashtypeDetectorComponent,
    LoadingSpinnerComponent,
    HexconvertorComponent,
    CheatsheetComponent,
    TimeoutComponent,
    AlertComponent
  ],
  imports: [
    FilterTextboxModule,
    SwitchThemeModule,
    ColorPickerModule,
    PaginationModule,
    PageTitleModule,
    GraphsModule,
    CommonModule,
    FormsModule,
    TableModule,
    NgbModule
  ],
  exports: [
    HashtypeDetectorComponent,
    LoadingSpinnerComponent,
    HexconvertorComponent,
    FilterTextboxModule,
    CheatsheetComponent,
    SwitchThemeModule,
    ColorPickerModule,
    PaginationModule,
    TimeoutComponent,
    PageTitleModule,
    AlertComponent,
    GraphsModule,
    CommonModule,
    TableModule
  ],
})
export class ComponentsModule {}
