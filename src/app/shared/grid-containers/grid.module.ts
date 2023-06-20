import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GridFormInputComponent } from './grid-formgroup';
import { GridForm800Component } from './grid-form-800';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    GridFormInputComponent,
    GridForm800Component
  ],
  declarations: [
    GridFormInputComponent,
    GridForm800Component
  ]
})
export class GridModule { }
