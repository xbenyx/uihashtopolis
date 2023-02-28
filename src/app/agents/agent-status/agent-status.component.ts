import { Component, OnInit, ComponentRef, Input } from '@angular/core';
import { faDigitalTachograph, faMicrochip, faHomeAlt, faPlus, faUserSecret,faEye, faTemperature0, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ASC } from '../../core/_constants/agentsc.config';

import { AgentsService } from '../../core/_services/agents/agents.service';
import { FilterService } from 'src/app/core/_services/filter.service';
import { environment } from 'src/environments/environment';
import { UIConfigService } from 'src/app/core/_services/shared/storage.service';
import { AgentStatService } from 'src/app/core/_services/agents/agentstats.service';
import { CookieService } from 'src/app/core/_services/shared/cookies.service';

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
  faEye=faEye;
  faTemperature0=faTemperature0;
  faInfoCircle=faInfoCircle;

  public statusOrderBy = environment.config.agents.statusOrderBy;
  public statusOrderByName = environment.config.agents.statusOrderByName;

  showagents: any[] = [];
  _filteresAgents: any[] = [];
  filterText: string = '';

  totalRecords = 0;
  pageSize = 20;

  private maxResults = environment.config.prodApiMaxResults
  params = {'maxResults': this.maxResults}

  constructor(
    private agentsService: AgentsService,
    private astatService: AgentStatService,
    private modalService: NgbModal,
    private filterService: FilterService,
    private uiService: UIConfigService,
    private cookieService: CookieService
  ) { }

  // View Menu

  view: any;

  setView(value: string){
    this.cookieService.setCookie('asview', value, 365);
    this.ngOnInit();
  }

  getView(){
    return this.cookieService.getCookie('asview');
  }

  get filteredAgents() {
    return this._filteresAgents;
  }

  set filteredAgents(value: any[]) {
    this._filteresAgents = value;
  }

  ngOnInit(): void {
    this.view = this.getView() || 0;
    this.getAgentsPage(1);
    this.getAgentStats();
  }

  pageChanged(page: number) {
    this.getAgentsPage(page);
  }

  groupArr: any;

  getAgentsPage(page: number) {
    this.agentsService.getAgents(this.params).subscribe((agents: any) => {
      this.showagents = this.filteredAgents = agents.values;
      this.totalRecords = agents.total;
      this.groupArr = this.groupBy(this.showagents);
      console.log(this.showagents)
      console.log(this.groupArr)
    });
  }

  // Agents Stats
  statDevice: any[] = [];
  statTemp: any[] = [];
  statCpu: any[] = [];

  getAgentStats(){
    let paramsstat = {'maxResults': this.maxResults}
    this.astatService.getAstats(paramsstat).subscribe((stats: any) => {
      this.statTemp = stats.values.filter(u=> u.statType == ASC.GPU_TEMP); // filter Device Temperature
      this.statDevice = stats.values.filter(u=> u.statType == ASC.GPU_UTIL); // filter Device Utilization
      this.statCpu = stats.values.filter(u=> u.statType == ASC.CPU_UTIL); // filter CPU utilization
    });

  }

  // Filter

  filterChanged(data: string) {
    if (data && this.showagents) {
        data = data.toUpperCase();
        const props = ['agentName', 'agentId'];
        this._filteresAgents = this.filterService.filter<any>(this.showagents, data, props);
    } else {
      this._filteresAgents = this.showagents;
    }
  }

  groupBy(arr: Array<any>){
    if(!arr){
       return null;
    }
    const list = arr.reduce(function (r,a){
          r[a.agentName] = r[a.agentName] || [];
          r[a.agentName].push(a);
    return r;
    },{});
    return Object.keys(list).map(k => ({ k, value: list[k] }));
  }

  // Modal Agent utilisation

  getTemp1(){  // Temperature Config Setting
    return this.uiService.getUIsettings('agentTempThreshold1').value;
  }

  getTemp2(){  // Temperature Config Setting
    return this.uiService.getUIsettings('agentTempThreshold2').value;
  }

  getUtil1(){  // CPU Config Setting
    return this.uiService.getUIsettings('agentUtilThreshold1').value;
  }

  getUtil2(){  // CPU Config Setting
    return this.uiService.getUIsettings('agentUtilThreshold2').value;
  }

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
