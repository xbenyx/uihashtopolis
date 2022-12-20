import { AuthGuard } from "../auth/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ServerComponent } from "./server/server.component";
import { LogComponent } from "./log/log.component";
import { HealthChecksComponent } from "./health-checks/health-checks.component";
import { AgentBinariesComponent } from "./engine/agent-binaries/agent-binaries.component";
import { CrackersComponent } from "../engine/crackers/crackers.component";
import { PreprocessorsComponent } from "../engine/preprocessors/preprocessors.component";
import { HashtypesComponent } from "./hashtypes/hashtypes.component";

const routes: Routes = [
  {
    path: '',
    children: [
        {
          path: 'cracking',  component: ServerComponent,
          data: {
              kind: 'cracking',
              breadcrumb: 'Cracking'
          },
          canActivate: [AuthGuard]},
        {
          path: 'finetunning',  component: ServerComponent,
          data: {
              kind: 'finetunning',
              breadcrumb: 'Finetunning'
          },
          canActivate: [AuthGuard]},
        {
          path: 'ui',  component: ServerComponent,
          data: {
              kind: 'ui',
              breadcrumb: 'UI'
          },
          canActivate: [AuthGuard]},
        {
          path: 'yubikey',  component: ServerComponent,
          data: {
              kind: 'yubikey',
              breadcrumb: 'Yubikey'
          },
          canActivate: [AuthGuard]},
        {
          path: 'notifications',  component: ServerComponent,
          data: {
              kind: 'notifications',
              breadcrumb: 'Notifications'
          },
          canActivate: [AuthGuard]},
        {
          path: 'server',  component: ServerComponent,
          data: {
              kind: 'server',
              breadcrumb: 'Server'
          },
          canActivate: [AuthGuard]},
        {
          path: 'hashtypes',  component: HashtypesComponent,
          data: {
              kind: 'hashtypes',
              breadcrumb: 'Hashtypes'
          },
          canActivate: [AuthGuard]},
        {
          path: 'log',  component: LogComponent,
          data: {
              kind: 'log',
              breadcrumb: 'Logs'
          },
          canActivate: [AuthGuard]},
        {
          path: 'health-checks',  component: HealthChecksComponent,
          data: {
              kind: 'health-checks',
              breadcrumb: 'Health Checks'
          },
          canActivate: [AuthGuard]},
        {
          path: 'engine/agent-binaries',  component: AgentBinariesComponent,
          data: {
              kind: 'agent-binaries',
              breadcrumb: 'Engine > Agent-binaries'
          },
          canActivate: [AuthGuard]},
        {
          path: 'engine/crackers',  component: CrackersComponent,
          data: {
              kind: 'crackers',
              breadcrumb: 'Engine > Crackers'
          },
          canActivate: [AuthGuard]},
        {
          path: 'engine/preprocessors',  component: PreprocessorsComponent,
          data: {
              kind: 'preprocessors',
              breadcrumb: 'Engine > Preprocessors'
          },
          canActivate: [AuthGuard]},
    ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class ConfigRoutingModule {}
