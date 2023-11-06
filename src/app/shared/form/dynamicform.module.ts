
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormUIsettingsComponent } from './formuisettings.component';
import { PageTitleModule } from '../page-headers/page-title.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from "./dynamicform.component";
import { FormConfigComponent } from './formconfig.component';
import { GridModule } from '../grid-containers/grid.module';
import { ButtonsModule } from '../buttons/buttons.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './form.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HorizontalNavModule } from '../navigation/navigation.module';

@NgModule({
  declarations:[
    FormUIsettingsComponent,
    DynamicFormComponent,
    FormConfigComponent,
    FormComponent,
  ],
  imports:[
    ReactiveFormsModule,
    HorizontalNavModule,
    FontAwesomeModule,
    PageTitleModule,
    ButtonsModule,
    FormsModule,
    GridModule,
    NgbModule,
    CommonModule
  ],
  exports:[
    FormUIsettingsComponent,
    DynamicFormComponent,
    FormConfigComponent,
    FormComponent,
  ]
})
export class DynamicFormModule {}
