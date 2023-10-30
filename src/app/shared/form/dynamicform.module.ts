
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PageTitleModule } from '../page-headers/page-title.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from "./dynamicform.component";
import { GridModule } from '../grid-containers/grid.module';
import { ButtonsModule } from '../buttons/buttons.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './form.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

@NgModule({
  declarations:[
    DynamicFormComponent,
    FormComponent,
  ],
  imports:[
    ReactiveFormsModule,
    FontAwesomeModule,
    PageTitleModule,
    ButtonsModule,
    FormsModule,
    GridModule,
    NgbModule,
    CommonModule
  ],
  exports:[
    DynamicFormComponent,
    FormComponent,
  ]
})
export class DynamicFormModule {}
