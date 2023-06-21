import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GridFormInputComponent } from './grid-formgroup';
import { GridMainComponent } from './grid-main';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    GridFormInputComponent,
    GridMainComponent
  ],
  declarations: [
    GridFormInputComponent,
    GridMainComponent
  ]
})
export class GridModule { }
