import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LogentryService } from '../../service/config/logentry.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { faHomeAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['../config.component.scss']
})
export class LogComponent implements OnInit {
  faHome=faHomeAlt;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  public logs: {logEntryId: number, issuer: string, issuerId: number, level: string, message: string, time: number}[] = [];

  constructor(private logentryService: LogentryService,
    private route:ActivatedRoute, private router:Router) { }

    ngOnInit(): void {
      this.logentryService.getLogs().subscribe((log: any) => {
        this.logs = log;
        this.dtTrigger.next(void 0);
      });
      this.dtOptions = {
        dom: 'Bfrtip',
        pageLength: 10,
        stateSave: true,
        select: true,
        buttons: ['copy', 'excel', 'csv']
      };
    }

    getLogColor(level: string): string{
      if(level == 'information')
        return '#397b39';
      else if (level == 'warning')
        return '#b16a06';
      else if (level == 'error')
        return '#8b0010';
      else if (level == 'fatal error')
        return '#750404';
      else
        return 'white';
    }

}


