import { faHomeAlt, faPlus, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { AlertService } from 'src/app/core/_services/shared/alert.service';
import { environment } from './../../../../environments/environment';
import { GlobalService } from 'src/app/core/_services/main.service';
import { PageTitle } from 'src/app/core/_decorators/autotitle';
import { SERV } from '../../../core/_services/main.config';

@Component({
  selector: 'app-preprocessors',
  templateUrl: './preprocessors.component.html'
})
@PageTitle(['Show Preprocessors'])
export class PreprocessorsComponent implements OnInit {
  public isCollapsed = true;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;
  faEdit=faEdit;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  public preproc: {preprocessorId: number, name: string, url: string, binaryName: string, keyspaceCommand: string, skipCommand: string, limitCommand: string}[] = [];

  constructor(
    private alert: AlertService,
    private gs: GlobalService,
  ) { }

  private maxResults = environment.config.prodApiMaxResults


    ngOnInit(): void {
      const params = {'maxResults': this.maxResults }
      this.gs.getAll(SERV.PREPROCESSORS,params).subscribe((pre: any) => {
        this.preproc = pre.values;
        this.dtTrigger.next(void 0);
      });
      const self = this;
      this.dtOptions = {
        dom: 'Bfrtip',
        scrollX: true,
        lengthMenu: [
          [10, 25, 50, 100, 250, -1],
          [10, 25, 50, 100, 250, 'All']
        ],
        pageLength: 25,
        stateSave: true,
        select: true,
        buttons: {
          dom: {
            button: {
              className: 'dt-button buttons-collection btn btn-sm-dt btn-outline-gray-600-dt',
            }
          },
        buttons: [
          {
            text: '↻',
            autoClose: true,
            action: function (e, dt, node, config) {
              self.onRefresh();
            }
          },
          {
            extend: 'collection',
            text: 'Export',
            buttons: [
              {
                extend: 'excelHtml5',
                exportOptions: {
                  columns: [0, 1]
                },
              },
              {
                extend: 'print',
                exportOptions: {
                  columns: [0, 1]
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
                  let data = "";
                  for (let i = 0; i < dt.length; i++) {
                    data = "Preprocessors\n\n"+  dt;
                  }
                  return data;
               }
              },
                'copy'
              ]
            }
          ],
        }
      };

    }

    onRefresh(){
      this.rerender();
      this.ngOnInit();
    }

    rerender(): void {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        setTimeout(() => {
          this.dtTrigger['new'].next();
        });
      });
    }

    onDelete(id: number, name: string){
      this.alert.deleteConfirmation(name,'Preprocessors').then((confirmed) => {
        if (confirmed) {
          // Deletion
          this.gs.delete(SERV.PREPROCESSORS, id).subscribe(() => {
            // Successful deletion
            this.alert.okAlert(`Deleted Preprocessor ${name}`, '');
            this.onRefreshTable(); // Refresh the table
          });
        } else {
          // Handle cancellation
          this.alert.okAlert(`Preprocessor ${name} is safe!`,'');
        }
      });
    }

    onRefreshTable(){
      setTimeout(() => {
        this.ngOnInit();
        this.rerender();  // rerender datatables
      },2000);
    }

}
