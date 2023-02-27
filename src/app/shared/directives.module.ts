import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FileSelectDirective } from "../core/_directives/file-select.directive";
import { CopyButtonDirective } from "../core/_directives/copy-button.directive";
import { SelectizeDirective } from "../core/_directives/selectize.directive";
import { UnderlineDirective } from "../core/_directives/underline.directive";
import { FileDropDirective } from "../core/_directives/file-drop.directive";


@NgModule({
  declarations: [
    FileSelectDirective,
    CopyButtonDirective,
    SelectizeDirective,
    UnderlineDirective,
    FileDropDirective,
  ],
  imports: [CommonModule],
  exports: [
    FileSelectDirective,
    CopyButtonDirective,
    SelectizeDirective,
    UnderlineDirective,
    FileDropDirective,

  ]
})
export class DirectivesModule {}




