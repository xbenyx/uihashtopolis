import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentsService } from '../../service/agents/agents.service';
import { faEdit, faLock, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-show-agents',
  templateUrl: './show-agents.component.html',
  styleUrls: ['./show-agents.component.scss']
})
export class ShowAgentsComponent implements OnInit, OnDestroy {
  faEdit=faEdit;
  faLock=faLock;
  faPauseCircle=faPauseCircle;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  showagents: any = [];
  constructor(private agentsService: AgentsService) { }

  ngOnInit(): void {
    this.agentsService.showAgents().subscribe((users: any) => {
      this.showagents = users;
      this.dtTrigger.next(void 0);
    });
    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      stateSave: true,
      select: true,
      buttons: [
        'copy', 'excel', 'csv', 'edit'
    ]
    };
  }
}
