import { AuthGuard } from "../auth/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ShowTasksComponent } from "./show-tasks/show-tasks.component";
import { EditTasksComponent } from "./edit-tasks/edit-tasks.component";
import { NewTasksComponent } from "./new-tasks/new-tasks.component";
import { PreconfiguredTasksComponent } from "./preconfigured-tasks/preconfigured-tasks.component";
import { NewPreconfiguredTasksComponent } from "./new-preconfigured-tasks/new-preconfigured-tasks.component";
import { EditPreconfiguredTasksComponent } from "./edit-preconfigured-tasks/edit-preconfigured-tasks.component";
import { SupertasksComponent } from "./supertasks/supertasks.component";
import { NewSupertasksComponent } from "./new-supertasks/new-supertasks.component";
import { EditSupertasksComponent } from "./edit-supertasks/edit-supertasks.component";
import { ImportSupertasksComponent } from "./import-supertasks/import-supertasks.component";
import { ChunksComponent } from "./chunks/chunks.component";


const routes: Routes = [
  {
    path: '',
    children: [
        {
          path: 'show-tasks', component: ShowTasksComponent,
          data: {
              kind: 'show-tasks',
              breadcrumb: 'Show tasks'
          },
          canActivate: [AuthGuard]},
        {
          path: 'show-tasks-archived', component: ShowTasksComponent,
          data: {
              kind: 'show-tasks-archived',
              breadcrumb: 'Show Archived Tasks'
          },
          canActivate: [AuthGuard]},
        {
          path: 'show-tasks/:id/edit', component: EditTasksComponent,
          data: {
              kind: 'edit-task',
              breadcrumb: 'Edit Task'
          },
          canActivate: [AuthGuard]},
        {
          path: 'new-tasks', component: NewTasksComponent,
          data: {
              kind: 'new-tasks',
              breadcrumb: 'New tasks'
          },
          canActivate: [AuthGuard]},
        {
          path: 'preconfigured-tasks', component: PreconfiguredTasksComponent,
          data: {
              kind: 'preconfigured-tasks',
              breadcrumb: 'Preconfigured tasks'
          },
          canActivate: [AuthGuard]},
        {
          path: 'new-preconfigured-tasks', component: NewPreconfiguredTasksComponent,
          data: {
              kind: 'new-preconfigured-tasks',
              breadcrumb: 'New Preconfigured tasks'
          },
          canActivate: [AuthGuard]},
        {
          path: 'edit-preconfigured-tasks/:id/edit', component: EditPreconfiguredTasksComponent,
          data: {
              kind: 'edit-preconfigured-tasks',
              breadcrumb: 'Edit Preconfigured tasks'
          },
          canActivate: [AuthGuard]},
        {
          path: 'supertasks', component: SupertasksComponent,
          data: {
            kind: 'supertasks',
            breadcrumb: 'Supertasks'
           },
           canActivate: [AuthGuard]},
        {
          path: 'new-supertasks', component: NewSupertasksComponent,
          data: {
            kind: 'new-supertasks',
            breadcrumb: 'New Supertasks'
          },
          canActivate: [AuthGuard]},
        {
          path: ':id/edit', component: EditSupertasksComponent,
          data: {
            kind: 'edit-supertasks',
            breadcrumb: 'Edit Supertasks'
          },
          canActivate: [AuthGuard]},
        {
          path: 'import-supertasks', component: ImportSupertasksComponent,
          data: {
            kind: 'import-supertasks',
            breadcrumb: 'Import Supertasks'
          },
          canActivate: [AuthGuard]},
        {
          path: 'chunks', component: ChunksComponent,
          data: {
            kind: 'chunks',
            breadcrumb: 'Chunks'
          },
          canActivate: [AuthGuard]},
        ]
     }
  ]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class TasksRoutingModule {}
