import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { EditPreconfiguredTasksComponent } from './edit-preconfigured-tasks/edit-preconfigured-tasks.component';
import { NewPreconfiguredTasksComponent } from "./new-preconfigured-tasks/new-preconfigured-tasks.component";
import { PreconfiguredTasksComponent } from "./preconfigured-tasks/preconfigured-tasks.component";
import { EditSupertasksComponent } from './edit-supertasks/edit-supertasks.component';
import { NewSupertasksComponent } from "./new-supertasks/new-supertasks.component";
import { WrbulkComponent } from './import-supertasks/wrbulk/wrbulk.component';
import { MasksComponent } from './import-supertasks/masks/masks.component';
import { SupertasksComponent } from "./supertasks/supertasks.component";
import { ShowTasksComponent } from "./show-tasks/show-tasks.component";
import { EditTasksComponent } from './edit-tasks/edit-tasks.component';
import { NewTasksComponent } from "./new-tasks/new-tasks.component";
import { ComponentsModule } from "../shared/components.module";
import { TasksRoutingModule } from "./tasks-routing.module";
import { ChunksComponent } from "./chunks/chunks.component";
import { PipesModule } from "../shared/pipes.module";
import { ApplyHashlistComponent } from "./supertasks/applyhashlist.component";

@NgModule({
  declarations:[
    EditPreconfiguredTasksComponent,
    NewPreconfiguredTasksComponent,
    PreconfiguredTasksComponent,
    EditSupertasksComponent,
    NewSupertasksComponent,
    ApplyHashlistComponent,
    SupertasksComponent,
    ShowTasksComponent,
    EditTasksComponent,
    NewTasksComponent,
    ChunksComponent,
    MasksComponent,
    WrbulkComponent
  ],
  imports:[
    ReactiveFormsModule,
    TasksRoutingModule,
    FontAwesomeModule,
    DataTablesModule,
    ComponentsModule,
    CommonModule,
    RouterModule,
    PipesModule,
    FormsModule,
    NgbModule
 ]
})
export class TasksModule {}
