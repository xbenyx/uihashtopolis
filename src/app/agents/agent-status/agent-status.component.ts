import { faDigitalTachograph, faMicrochip, faHomeAlt, faPlus, faUserSecret,faEye, faTemperature0, faInfoCircle, faServer, faUsers, faChevronDown, faLock, faPauseCircle} from '@fortawesome/free-solid-svg-icons';
import { ModalDismissReasons, NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

import { ASC } from '../../core/_constants/agentsc.config';
import { environment } from 'src/environments/environment';
import { FilterService } from 'src/app/core/_services/filter.service';
import { ChunkService } from 'src/app/core/_services/chunks.service';
import { AgentsService } from '../../core/_services/agents/agents.service';
import { CookieService } from 'src/app/core/_services/shared/cookies.service';
import { UIConfigService } from 'src/app/core/_services/shared/storage.service';
import { AgentStatService } from 'src/app/core/_services/agents/agentstats.service';

@Component({
  selector: 'app-agent-status',
  templateUrl: './agent-status.component.html'
})
export class AgentStatusComponent implements OnInit {
  public isCollapsed = true;

  faServer=faServer;
  faUsers=faUsers;
  faChevronDown=faChevronDown;
  faDigitalTachograph=faDigitalTachograph;
  faMicrochip=faMicrochip;
  faHomeAlt=faHomeAlt;
  faPlus=faPlus;
  faUserSecret=faUserSecret;
  faEye=faEye;
  faTemperature0=faTemperature0;
  faPauseCircle=faPauseCircle;
  faLock=faLock;
  faInfoCircle=faInfoCircle;

  public statusOrderBy = environment.config.agents.statusOrderBy;
  public statusOrderByName = environment.config.agents.statusOrderByName;

  showagents: any[] = [];
  _filteresAgents: any[] = [];
  filterText: string = '';

  totalRecords = 0;
  pageSize = 20;

  private maxResults = environment.config.prodApiMaxResults

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  uidateformat:any;

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  constructor(
    private astatService: AgentStatService,
    private offcanvasService: NgbOffcanvas,
    private agentsService: AgentsService,
    private filterService: FilterService,
    private cookieService: CookieService,
    private chunkService: ChunkService,
    private uiService: UIConfigService,
    private modalService: NgbModal
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
    this.uidateformat = this.uiService.getUIsettings('timefmt').value;
    this.view = this.getView() || 0;
    this.getAgentsPage(1);
    this.getAgentStats();

    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      destroy: true,
      scrollY: "20vh",
      select: {
        style: 'multi',
        },
      buttons: []
      }
  }

  pageChanged(page: number) {
    this.getAgentsPage(page);
  }

  getAgentsPage(page: number) {
    let params = {'maxResults': this.maxResults}
    this.agentsService.getAgents(params).subscribe((agents: any) => {
      var getData = agents.values;
      this.totalRecords = agents.total;
      this.chunkService.getChunks(params).subscribe((chunks: any)=>{
        this.showagents = this.filteredAgents = getData.map(mainObject => {
        let matchObject = chunks.values.find(element => element.agentId === mainObject.agentId)
        return { ...mainObject, ...matchObject }
        })
        console.log(this.showagents)
        this.dtTrigger.next(void 0);
      })
    });
  }

  // Agents Stats
  statDevice: any[] = [];
  statTemp: any[] = [];
  statCpu: any[] = [];

  getAgentStats(){
    let paramsstat = {'maxResults': this.maxResults, 'filter': 'time>'+this.gettime()+''}
    this.astatService.getAstats(paramsstat).subscribe((stats: any) => {
      this.statTemp = stats.values.filter(u=> u.statType == ASC.GPU_TEMP); // filter Device Temperature
      this.statDevice = stats.values.filter(u=> u.statType == ASC.GPU_UTIL); // filter Device Utilization
      this.statCpu = stats.values.filter(u=> u.statType == ASC.CPU_UTIL); // filter CPU utilization
    });

  }

  gettime(){
    let time = (Date.now() - this.uiService.getUIsettings('agenttimeout').value)
    return time;
  }

  // On change filter

  filterChanged(data: string) {
    if (data && this.showagents) {
        data = data.toUpperCase();
        const props = ['agentName', 'agentId'];
        this._filteresAgents = this.filterService.filter<any>(this.showagents, data, props);
    } else {
      this._filteresAgents = this.showagents;
    }
  }

  // Modal Agent utilisation and OffCanvas menu

  getTemp1(){  // Temperature Config Setting
    return this.uiService.getUIsettings('agentTempThreshold1').value;
  }

  getTemp2(){  // Temperature 2 Config Setting
    return this.uiService.getUIsettings('agentTempThreshold2').value;
  }

  getUtil1(){  // CPU Config Setting
    return this.uiService.getUIsettings('agentUtilThreshold1').value;
  }

  getUtil2(){  // CPU 2 Config Setting
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

  openEnd(content: TemplateRef<any>) {
		this.offcanvasService.open(content, { position: 'end' });
	}


}
