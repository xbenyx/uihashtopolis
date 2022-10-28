import { Component, OnInit } from '@angular/core';
import { faDigitalTachograph, faMicrochip, faHomeAlt, faPlus, faUserSecret } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agent-status',
  templateUrl: './agent-status.component.html'
})
export class AgentStatusComponent implements OnInit {
  public isCollapsed = true;
  faDigitalTachograph=faDigitalTachograph;
  faMicrochip=faMicrochip;
  faHomeAlt=faHomeAlt;
  faPlus=faPlus;
  faUserSecret=faUserSecret;

  constructor() { }

  ngOnInit(): void {
  }

}
