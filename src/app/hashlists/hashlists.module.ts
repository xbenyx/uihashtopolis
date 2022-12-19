import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";

import { HashlistComponent } from "./hashlist/hashlist.component";
import { HashlistRoutingModule } from "./hashlists-routing.module";
import { NewHashlistComponent } from "./new-hashlist/new-hashlist.component";
import { NewSuperhashlistComponent } from "./new-superhashlist/new-superhashlist.component";
import { SearchHashComponent } from "./search-hash/search-hash.component";
import { ShowCracksComponent } from "./show-cracks/show-cracks.component";
import { SuperhashlistComponent } from "./superhashlist/superhashlist.component";
import { PipesModule } from "../shared/pipes.module";


@NgModule({
  declarations:[
    HashlistComponent,
    NewHashlistComponent,
    SuperhashlistComponent,
    NewSuperhashlistComponent,
    SearchHashComponent,
    ShowCracksComponent
  ],
  imports:[
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    FontAwesomeModule,
    NgbModule,
    PipesModule,
    HashlistRoutingModule
  ]
})
export class HashlistModule {}
