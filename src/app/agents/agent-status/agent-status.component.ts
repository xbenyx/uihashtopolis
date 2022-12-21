import { Component, OnInit, ComponentRef } from '@angular/core';
import { faDigitalTachograph, faMicrochip, faHomeAlt, faPlus, faUserSecret,faEye, faTemperature0 } from '@fortawesome/free-solid-svg-icons';
// import { FilterService } from '../../core/_services/filter.service';

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
  faEdit=faEye;
  faTemperature0=faTemperature0;

  agents = [{rack: 'Rack AB jkhjkhjkh'},{rack: 'Rack CB'}, {rack: 'Rack AB'},{rack: 'Rack AB'},{rack: 'Rack CB'}, {rack: 'Rack AB'},{rack: 'Rack AB'},{rack: 'Rack CB'}, {rack: 'Rack AB'}];
  _filteredCustomers: any;
  mapComponentRef: ComponentRef<any> = {} as ComponentRef<any>;

  constructor(
    // private filterService: FilterService,
  ) { }

  ngOnInit(): void {
  }

  get filteredCustomers() {
    return this._filteredCustomers;
  }

  set filteredCustomers(value: any[]) {
    this._filteredCustomers = value;
    this.updateMapComponentDataPoints();
  }

  filterChanged(data: string) {
    if (data && this.agents) {
        data = data.toUpperCase();
        const props = ['firstName', 'lastName', 'city', 'state.name'];
        // this.filteredCustomers = this.filterService.filter<any>(this.agents, data, props);
    } else {
      this.filteredCustomers = this.agents;
    }
  }

  updateMapComponentDataPoints() {
    if (this.mapComponentRef && this.mapComponentRef.instance) {
      this.mapComponentRef.instance.dataPoints = this.filteredCustomers;
    }
  }



}
