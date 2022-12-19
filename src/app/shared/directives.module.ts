import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { SelectizeDirective } from "../core/_directives/selectize.directive";
import { FileSelectDirective } from "../core/_directives/file-select.directive";
import { FileDropDirective } from "../core/_directives/file-drop.directive";

@NgModule({
  declarations: [
    SelectizeDirective,
    FileSelectDirective,
    FileDropDirective
  ],
  imports: [CommonModule],
  exports: [
    SelectizeDirective,
    FileSelectDirective,
    FileDropDirective
  ]
})
export class DirectivesModule {}




