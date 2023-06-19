import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageTitleComponent } from './page-title.component';
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
    PageTitleComponent
  ],
  declarations: [
    PageTitleComponent
  ]
})
export class PageTitleModule { }
