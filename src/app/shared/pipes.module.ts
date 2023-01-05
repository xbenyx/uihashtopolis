import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { WarningColorPipe } from "../core/_pipes/warning-color.pipe";
import { FileSizePipe } from "../core/_pipes/file-size.pipe";
import { ShortenStringPipe } from "../core/_pipes/shorten-string.pipe";
import { StaticArrayPipe } from "../core/_pipes/static-array.pipe";
import { SearchPipe } from "../core/_pipes/filter-search.pipe";
import { ArraySortPipe } from "../core/_pipes/orderby-item.pipe";
import { FileTypePipe } from "../core/_pipes/file-type.pipe";
import { HealthCheckStatusPipe } from "../core/_pipes/healthcheck-status.pipe";

@NgModule({
  declarations: [
    WarningColorPipe,
    FileSizePipe,
    ShortenStringPipe,
    StaticArrayPipe,
    SearchPipe,
    ArraySortPipe,
    FileTypePipe,
    HealthCheckStatusPipe
  ],
  imports: [CommonModule],
  exports: [
    WarningColorPipe,
    FileSizePipe,
    ShortenStringPipe,
    StaticArrayPipe,
    SearchPipe,
    ArraySortPipe,
    FileTypePipe,
    HealthCheckStatusPipe
  ]
})
export class PipesModule {}







