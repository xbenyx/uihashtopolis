import { Component, OnInit, OnDestroy } from '@angular/core';
import { CrackerService } from '../../core/_services/shared/cracker.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-new-agent',
  templateUrl: './new-agent.component.html'
})
export class NewAgentComponent implements OnInit, OnDestroy {

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  crackerbinary: any = [];
  constructor(private crackerService: CrackerService) { }

  ngOnInit(): void {
    this.crackerService.crackerBinary().subscribe((binary: any) => {
      this.crackerbinary = binary;
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
