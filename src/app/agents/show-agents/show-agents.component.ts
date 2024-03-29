import { faEdit, faLock, faPauseCircle,faHomeAlt, faPlus, faFileText, faTrash, faCheckCircle, faArrowCircleDown, faMicrochip, faTerminal} from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Subject} from 'rxjs';

import { UIConfigService } from 'src/app/core/_services/shared/storage.service';
import { AlertService } from 'src/app/core/_services/shared/alert.service';
import { GlobalService } from 'src/app/core/_services/main.service';
import { PageTitle } from 'src/app/core/_decorators/autotitle';
import { SERV } from '../../core/_services/main.config';

declare let $:any;

@Component({
  selector: 'app-show-agents',
  templateUrl: './show-agents.component.html'
})
@PageTitle(['Show Agents'])
export class ShowAgentsComponent implements OnInit, OnDestroy {

  faArrowCircleDown=faArrowCircleDown;
  faCheckCircle=faCheckCircle;
  faPauseCircle=faPauseCircle;
  faMicrochip=faMicrochip;
  faTerminal=faTerminal;
  faFileText=faFileText;
  faHome=faHomeAlt;
  faTrash=faTrash;
  faEdit=faEdit;
  faLock=faLock;
  faPlus=faPlus;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  isChecked =false;

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // ToDo add model
  showagents: any = [];

  private maxResults = environment.config.prodApiMaxResults

  constructor(
    private uiService: UIConfigService,
    private alert: AlertService,
    private gs: GlobalService
  ) { }

  ngOnInit(): void {

    const params = {'maxResults': this.maxResults, 'expand':'accessGroups'}

    this.gs.getAll(SERV.AGENTS,params).subscribe((agents: any) => {
      this.showagents = agents.values;
      // this.showagents.forEach(f => (f.checked = false));
      this.dtTrigger.next(void 0);
    });

    const self = this;
    this.dtOptions = {
      dom: 'Bfrtip',
      scrollX: true,
      pageLength: 25,
      lengthMenu: [
          [10, 25, 50, 100, 250, -1],
          [10, 25, 50, 100, 250, 'All']
      ],
      stateSave: true,
      destroy: true,
      select: {
        style: 'multi',
        },
      // columnDefs: [ {
      //   width: "10% !important;",
      //   targets: 0,
      //   searchable: false,
      //   orderable: false,
      // } ],
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
                columns: [1, 2, 3, 4, 5, 6, 7, 8]
              },
            },
            {
              extend: 'print',
              exportOptions: {
                columns: [1, 2, 3, 4, 5, 6, 7, 8]
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
                self.onSelectedAgents();
                let data = "";
                for (let i = 0; i < dt.length; i++) {
                  data = "Agents\n\n"+  dt;
                }
                return data;
             }
            },
            {
              extend: 'copy',
            }
             ]
        },
        {
          extend: 'collection',
          text: 'Bulk Actions',
          className: 'dt-button buttons-collection btn btn-sm-dt btn-outline-gray-600-dt',
          buttons: [
                {
                  text: 'Delete Agents',
                  autoClose: true,
                  action: function (e, dt, node, config) {
                    self.onDeleteBulk();
                  }
                },
                {
                  text: 'Activate Agents',
                  autoClose: true,
                  action: function ( e, dt, node, config ) {
                    const edit = {isActive: true};
                    self.onUpdateBulk(edit);
                  }
                },
                {
                  text: 'Deactivate Agents',
                  autoClose: true,
                  action: function ( e, dt, node, config ) {
                    const edit = {isActive: false};
                    self.onUpdateBulk(edit);
                  }
                },
                {
                  text: 'Edit Rack',
                  autoClose: true,
                  action: function ( e, dt, node, config ) {
                    const title = 'Update Rack (Missing Field)'
                    self.onModal(title)
                  }
                },
             ]
          },
          {
            extend: 'colvis',
            text: 'Column View',
            columns: [ 1, 2, 3, 4, 5, 6, 7, 8 ],
          },
          {
            extend: "pageLength",
            className: "btn-sm"
          }
        ],
      }
    };
  }

  onRefresh(){
    this.rerender();
    this.ngOnInit();
  }

  setCheckAll(){
    const chkBoxlength = $(".checkboxCls:checked").length;
    if (this.isChecked == true) {
      $(".checkboxCls").prop("checked", false);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.rows(  ).deselect();
        this.isChecked = false;
      });
    } else {
      $(".checkboxCls").prop("checked", true);
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.rows(  ).select();
        this.isChecked = true;
      });
    }
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

  onSelectedAgents(){
    $(".dt-button-background").trigger("click");
    const selection = $($(this.dtElement).DataTable.tables()).DataTable().rows({ selected: true } ).data().pluck(0).toArray();
    if(selection.length == 0) {
      this.alert.okAlert('You have not selected any Agent','');
      return;
    }
    const selectionnum = selection.map(i=>Number(i));

    return selectionnum;
  }

  async onDeleteBulk() {
    const AgentIds = this.onSelectedAgents();
    this.alert.bulkDeleteAlert(AgentIds,'Agents',SERV.AGENTS);
    this.onRefreshTable();
  }

  async onUpdateBulk(value: any) {
    const AgentIds = this.onSelectedAgents();
    this.alert.bulkUpdateAlert(AgentIds,value,'Agents',SERV.AGENTS);
    this.onRefreshTable();
  }

  onModal(title: string){
    (async () => {

      $(".dt-button-background").trigger("click");
      const selection = $($(this.dtElement).DataTable.tables()).DataTable().rows({ selected: true } ).data().pluck(0).toArray();
      if(selection.length == 0) {
        this.alert.okAlert('You have not selected any Agent','');
        return;
      }

      const { value: formValues } = await Swal.fire({
        title: title,
        html:
          '<input id="agent-input" class="swal2-input">',
        focusConfirm: false,
        confirmButtonColor: '#4B5563',
        preConfirm: () => {
          return [
            (<HTMLInputElement>document.getElementById('agent-input')).value,
          ]
        }
      })

      const rack = []
      if (formValues) {
        rack.push({rack: formValues})
        // we need to send pus
        // this.onUpdateBulk(formValues);
        Swal.fire(JSON.stringify(rack))

      }

      })()
  }

  onDelete(id: number, name: string){
    this.alert.deleteConfirmation(name,'Agents').then((confirmed) => {
      if (confirmed) {
        // Deletion
        this.gs.delete(SERV.AGENTS, id).subscribe(() => {
          // Successful deletion
          this.alert.okAlert(`Deleted Agent ${name}`, '');
          this.onRefreshTable(); // Refresh the table
        });
      } else {
        // Handle cancellation
        this.alert.okAlert(`Agent ${name} is safe!`,'');
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
