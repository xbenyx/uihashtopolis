import { IsAuth } from "../core/_guards/auth.guard";
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";

import { EditNotificationComponent } from "./notifications/notification/edit-notification.component";
import { NewNotificationComponent } from "./notifications/notification/new-notification.component";
import { AccountSettingsComponent } from "./settings/acc-settings/acc-settings.component";
import { UiSettingsComponent } from "./settings/ui-settings/ui-settings.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { AccountComponent } from "./account.component";

const routes: Routes = [
  {
    path: '',
    children: [
        {
          path: '', component: AccountComponent,
          data: {
              kind: 'account',
              breadcrumb: ''
          },
          canActivate: [IsAuth]},
        {
          path: 'acc-settings', component: AccountSettingsComponent,
          data: {
              kind: 'acc-settings',
              breadcrumb: 'Account Settings'
          },
          canActivate: [IsAuth]},
        {
          path: 'ui-settings', component: UiSettingsComponent,
          data: {
              kind: 'ui-settings',
              breadcrumb: 'UI Settings'
          },
          canActivate: [IsAuth]},
        {
          path: 'notifications', component: NotificationsComponent,
          data: {
              kind: 'notifications',
              breadcrumb: 'Notifications'
          },
          canActivate: [IsAuth]},
        {
          path: 'notifications/:id/edit', component: EditNotificationComponent,
          data: {
              kind: 'notifications-edit',
              breadcrumb: 'Edit Notification'
          },
          canActivate: [IsAuth]},
        {
          path: 'notifications/new-notification', component: NewNotificationComponent,
          data: {
              kind: 'new-notifications',
              breadcrumb: 'New Notification'
          },
          canActivate: [IsAuth]},
        ]
      }
   ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class AccountRoutingModule {}
