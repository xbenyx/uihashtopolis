import { AuthGuard } from "../auth/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { HashlistComponent } from "./hashlist/hashlist.component";
import { NewHashlistComponent } from "./new-hashlist/new-hashlist.component";
import { SuperhashlistComponent } from "./superhashlist/superhashlist.component";
import { NewSuperhashlistComponent } from "./new-superhashlist/new-superhashlist.component";
import { SearchHashComponent } from "./search-hash/search-hash.component";
import { ShowCracksComponent } from "./show-cracks/show-cracks.component";

const routes: Routes = [
  {
    path: 'hashlists',
    children: [
      {
        path: 'hashlist', component: HashlistComponent,
        data: {
            kind: 'hashlist',
            breadcrumb: 'Hashlist'
        },
        canActivate: [AuthGuard]},
      {
        path: 'archived', component: HashlistComponent,
        data: {
            kind: 'archived',
            breadcrumb: 'Hashlist Archived'
        },
        canActivate: [AuthGuard]},
      {
        path: 'new-hashlist', component: NewHashlistComponent,
        data: {
            kind: 'new-hashlist',
            breadcrumb: 'New Hashlist'
        },
        canActivate: [AuthGuard]},
      {
        path: 'superhashlist', component: SuperhashlistComponent,
        data: {
            kind: 'super-hashlist',
            breadcrumb: 'Super Hashlist'
        },
        canActivate: [AuthGuard]},
      {
        path: 'new-superhashlist', component: NewSuperhashlistComponent,
        data: {
            kind: 'new-superhashlist',
            breadcrumb: 'New Super Hashlist'
        },
        canActivate: [AuthGuard]},
      {
        path: 'search-hash', component: SearchHashComponent,
        data: {
            kind: 'search-hash',
            breadcrumb: 'Search-hash'
        },
        canActivate: [AuthGuard]},
      {
        path: 'show-cracks', component: ShowCracksComponent,
        data: {
            kind: 'show-cracks',
            breadcrumb: 'Show Cracks'
        },
        canActivate: [AuthGuard]},
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class HashlistRoutingModule {}
