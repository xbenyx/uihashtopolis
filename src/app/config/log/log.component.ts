import { Component, OnInit, SimpleChanges } from '@angular/core';
import { faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { UIConfigService } from 'src/app/core/_services/shared/storage.service';
import { LogentryService } from '../../core/_services/config/logentry.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html'
})
export class LogComponent implements OnInit {
  faHome=faHomeAlt;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  uidateformat:any;

  public logs: {logEntryId: number, issuer: string, issuerId: number, level: string, message: string, time: number}[] = [];

  private maxResults = environment.config.prodApiMaxResults;

  totalRecords:number = 0;
  pageSize:number = 5;
  isLast: boolean = false;
  showLabel: string;

  constructor(
    private logentryService: LogentryService,
    private uiService: UIConfigService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {

    this.loadLogs(1);
    this.uidateformat = this.uiService.getUIsettings('timefmt').value;

  }

  pageChanged(page: number) {
    this.ngOnDestroy();
    this.loadLogs(page);
  }

  loadLogs(page: number){
    let params = {'maxResults': this.pageSize, 'startsAt': (page - 1) * this.pageSize};

    this.logentryService.getLogs(params).subscribe((log: any) => {
      this.logs = log.values;
      this.totalRecords = log.total;
      this.isLast = log.isLast;
      this.dtTrigger.next(null);
    });

    this.dtOptions = {
      dom: 'Bfrtip',
      bStateSave:true,
      scrollY: true,
      columnDefs: [
        {
            targets: 0,
            className: 'noVis'
        }
      ],
      stateSaveParams: function (settings, data) {
        for ( var i=0, ien=data.columns.length ; i<ien ; i++ ) {
          // delete data.columns[i].visible;
        }
      },
      buttons: {
        dom: {
          button: {
            className: 'dt-button buttons-collection btn btn-sm-dt btn-outline-gray-600-dt',
          }
        },
      buttons: [
        {
          extend: 'collection',
          text: 'Export',
          buttons: [
            {
              extend: 'excelHtml5',
              exportOptions: {
                columns: [0, 1, 2, 3, 4]
              },
            },
            {
              extend: 'print',
              exportOptions: {
                columns: [0, 1, 2, 3, 4]
              },
              customize: function ( win ) {
                $(win.document.body)
                    .css( 'font-size', '10pt' )
                $(win.document.body).find( 'table' )
                    .addClass( 'compact' )
                    .css( 'font-size', 'inherit' );
              }
            },
            {
              extend: 'csvHtml5',
              exportOptions: {modifier: {selected: true}},
              select: true,
              customize: function (dt, csv) {
                var data = "";
                for (var i = 0; i < dt.length; i++) {
                  data = "Logs\n\n"+  dt;
                }
                return data;
              }
            },
              'copy'
            ]
          },
          {
            extend: 'colvis',
            text: 'Column View',
            columns: [ 1,2,3,4 ],
          },
          {
            extend: "pageLength",
            className: "btn-sm"
          },
        ],
      }
    };

  }

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }



    ngOnChanges(simpleChange: SimpleChanges) {


    }

}
