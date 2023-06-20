import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonActionsComponent } from './button-actions.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [
    ButtonActionsComponent
  ],
  declarations: [
    ButtonActionsComponent
  ]
})
export class TableModule { }
