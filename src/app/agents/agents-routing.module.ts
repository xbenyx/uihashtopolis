import { AuthGuard } from "../auth/auth.guard";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { AgentStatusComponent } from "./agent-status/agent-status.component";
import { NewAgentComponent } from "./new-agent/new-agent.component";
import { ShowAgentsComponent } from "./show-agents/show-agents.component";

const routes: Routes = [
  {
    path: 'agents',
    children: [
      {
        path: 'agent-status', component: AgentStatusComponent,
        data: {
            kind: 'agent-status',
            breadcrumb: 'Agent Status'
        },
        canActivate: [AuthGuard]},
      {
        path: 'new-agent', component: NewAgentComponent,
        data: {
            kind: 'new-agent',
            breadcrumb: 'New Agent'
        },
        canActivate: [AuthGuard]},
      {
        path: 'show-agents', component: ShowAgentsComponent,
        data: {
            kind: 'show-agents',
            breadcrumb: 'Show Agent'
        },
        canActivate: [AuthGuard]},
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class AgentsRoutingModule {}
