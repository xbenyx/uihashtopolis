import { AuthGuard } from "../auth/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { FilesComponent } from "./files.component";
import { FilesEditComponent } from "./files-edit/files-edit.component";

const routes: Routes = [
  {
    path: 'files',
    children: [
      {
        path: 'wordlist',  component: FilesComponent,
        data: {
            kind: 'wordlist',
            breadcrumb: 'Wordlist'
        },
        canActivate: [AuthGuard]},
      {
        path: ':id/wordlist-edit',  component: FilesEditComponent,
        data: {
            kind: 'wordlist-edit',
            breadcrumb: 'Wordlist Edit'
        },
        canActivate: [AuthGuard]},
      {
        path: 'rules', component: FilesComponent,
        data: {
            kind: 'rules',
            breadcrumb: 'Rules'
        },
        canActivate: [AuthGuard]},
      {
        path: ':id/rules-edit',  component: FilesEditComponent,
        data: {
            kind: 'rules-edit',
            breadcrumb: 'Rules Edit'
        },
        canActivate: [AuthGuard]},
      {
        path: 'other', component: FilesComponent,
        data: {
            kind: 'other',
            breadcrumb: 'Other'
        },
        canActivate: [AuthGuard]},
      {
        path: ':id/other-edit',  component: FilesEditComponent,
        data: {
            kind: 'other-edit',
            breadcrumb: 'Other Edit'
        },
        canActivate: [AuthGuard]},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class FilesRoutingModule {}
