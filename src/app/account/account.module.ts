import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AccountRoutingModule } from "./account-routing.module";
import { ComponentsModule } from "../shared/components.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";
import { PipesModule } from "../shared/pipes.module";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";

import { NewNotificationComponent } from './notifications/notification/new-notification.component';
import { AccountSettingsComponent } from "./settings/acc-settings/acc-settings.component";
import { UiSettingsComponent } from './settings/ui-settings/ui-settings.component';
import { NotificationsComponent } from "./notifications/notifications.component";
import { AccountComponent } from "./account.component";

@NgModule({
  declarations:[
    NewNotificationComponent,
    AccountSettingsComponent,
    NotificationsComponent,
    UiSettingsComponent,
    AccountComponent,
  ],
  imports:[
    AccountRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DataTablesModule,
    ComponentsModule,
    RouterModule,
    CommonModule,
    PipesModule,
    FormsModule,
    NgbModule,
  ]
})
export class AccountModule {}
