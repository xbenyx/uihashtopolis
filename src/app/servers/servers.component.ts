import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // template: '<app-server></app-server><app-server></app-server>',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewAgent = false;
  agentCreationStatus = 'No Agent was created!';
  AgentName = '';
  AgentCreated = false;
  Agents = ['agent 1', 'agent 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewAgent = true;
    }, 2000);

  }

  ngOnInit(): void {
  }

  onCreateAgent(){
    this.AgentCreated =true;
    this.Agents.push(this.AgentName);
    this.agentCreationStatus = 'Agent was created, agent new name is ' + this.AgentName;
  }

  onUpdateAgentName(event: Event){
    this.AgentName = (<HTMLInputElement>event.target).value;

  }

}
