import { AuthGuard } from "../auth/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ProjectsComponent } from "./projects.component";
import { EditProjectComponent } from "./edit-project/edit-project.component";
import { NewProjectComponent } from "./new-project/new-project.component";

const routes: Routes = [
  {
    path: 'projects',
    children: [
      {
        path: '',  component: ProjectsComponent,
        data: {
            kind: 'projects',
            breadcrumb: 'Projects'
        },
        canActivate: [AuthGuard]},
      {
        path: 'new-project',  component: NewProjectComponent,
        data: {
            kind: 'new-project',
            breadcrumb: 'New Project'
        },
        canActivate: [AuthGuard]},
      {
        path: ':id/edit-project',  component: EditProjectComponent,
        data: {
            kind: 'edit-project',
            breadcrumb: 'Edit Project'
        },
        canActivate: [AuthGuard]},
      ]
    }
  ]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ProjectsRoutingModule {}
