import { CommonModule } from "@angular/common";
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from "@angular/router";

import { AgentStatusComponent } from "./agent-status/agent-status.component";
import { NewAgentComponent } from "./new-agent/new-agent.component";
import { ShowAgentsComponent } from "./show-agents/show-agents.component";
import { AgentsRoutingModule } from "./agents-routing.module";


@NgModule({
  declarations:[
    AgentStatusComponent,
    NewAgentComponent,
    ShowAgentsComponent
  ],
  imports:[
    CommonModule,
    RouterModule,
    DataTablesModule,
    FontAwesomeModule,
    NgbModule,
    AgentsRoutingModule
  ]
})
export class AgentsModule {}
