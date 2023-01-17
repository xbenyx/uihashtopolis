import { Component, OnInit, ComponentRef } from '@angular/core';
import { faDigitalTachograph, faMicrochip, faHomeAlt, faPlus, faUserSecret,faEye, faTemperature0, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AgentsService } from '../../core/_services/agents/agents.service';

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
  faInfoCircle=faInfoCircle;

  showagents: any = [];
  agents = [{rack: 'Rack AB jkhjkhjkh'},{rack: 'Rack CB'}, {rack: 'Rack AB'},{rack: 'Rack AB'},{rack: 'Rack CB'}, {rack: 'Rack AB'},{rack: 'Rack AB'},{rack: 'Rack CB'}, {rack: 'Rack AB'}];
  _filteredCustomers: any;
  mapComponentRef: ComponentRef<any> = {} as ComponentRef<any>;

  constructor(
    private agentsService: AgentsService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {

    this.agentsService.getAgents().subscribe((agents: any) => {
      this.showagents = agents.values;
    });

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

  // Modal Agent utilisation
  closeResult = '';
  open(content) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}



}
