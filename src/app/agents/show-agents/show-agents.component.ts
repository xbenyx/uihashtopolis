import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { faEdit, faLock, faPauseCircle,faHomeAlt, faPlus, faFileText, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { AgentsService } from '../../core/_services/agents/agents.service';
import { environment } from 'src/environments/environment';

declare let $:any;

@Component({
  selector: 'app-show-agents',
  templateUrl: './show-agents.component.html'
})
export class ShowAgentsComponent implements OnInit, OnDestroy {
  faEdit=faEdit;
  faLock=faLock;
  faPauseCircle=faPauseCircle;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faFileText=faFileText;
  faTrash=faTrash;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  isChecked:boolean =false;

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // ToDo add model
  showagents: any = [];

  constructor(
    private agentsService: AgentsService
  ) { }

  ngOnInit(): void {

    this.agentsService.getAgents().subscribe((agents: any) => {
      this.showagents = agents.values;
      // this.showagents.forEach(f => (f.checked = false));
      this.dtTrigger.next(void 0);
    });

    const self = this;
    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      stateSave: true,
      destroy: true,
      scrollY: "50vh",
      select: {
        style: 'multi',
        },
      columnDefs: [ {
        width: "10% !important;",
        targets: 0,
        searchable: false,
        orderable: false,
        // className: "dt-body-center"
      } ],
      buttons: [
        {
          extend: 'collection',
          text: 'Export',
          buttons: [
            {
              extend: 'excelHtml5',
              exportOptions: {
                columns: [1, 2, 3, 4, 5]
              },
            },
            {
              extend: 'print',
              exportOptions: {
                columns: [1, 2, 3, 4, 5]
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
                  data = "Agents\n\n"+  dt;
                }
                return data;
             }
            },
              'copy'
             ]
        },
        {
          extend: 'collection',
          text: 'Bulk Actions',
          buttons: [
                {
                  text: 'Delete Agents',
                  autoClose: true,
                  action: function (e, dt, node, config) {
                    let selectionnum = self.onSelectedAgents();
                      selectionnum.forEach(function (value) {
                        Swal.fire('Deleting....Please wait')
                        Swal.showLoading()
                        self.onDeleteBulk(value);
                      });
                    self.onDone();
                  }
                },
                {
                  text: 'Activate Agents',
                  autoClose: true,
                  action: function ( e, dt, node, config ) {
                    let selectionnum = self.onSelectedAgents();
                    selectionnum.forEach(function (id) {
                      Swal.fire('Activating....Please wait')
                      Swal.showLoading()
                      const isActive = {isActive: true};
                      self.onUpdateBulk(id,isActive);
                    });
                    self.onDone();
                  }
                },
                {
                  text: 'Deactivate Agents',
                  autoClose: true,
                  action: function ( e, dt, node, config ) {
                    let selectionnum = self.onSelectedAgents()
                    selectionnum.forEach(function (id) {
                        Swal.fire('Deactivating....Please wait')
                        Swal.showLoading()
                        const isActive = {isActive: false};
                        self.onUpdateBulk(id,isActive);
                    });
                    self.onDone();
                  }
                },
             ]
        }
      ],
    };
  }

  setCheckAll(){
    let chkBoxlength = $(".checkboxCls:checked").length;
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

  onDone(){
    setTimeout(() => {
      this.ngOnInit();
      this.rerender();  // rerender datatables
      Swal.close();
      Swal.fire({
        title: 'Done!',
        type: 'success',
        timer: 1500,
        showConfirmButton: false
      })
    },3000);
  }

  onSelectedAgents(){
    $(".dt-button-background").trigger("click");
    let selection = $($(this.dtElement).DataTable.tables()).DataTable().rows({ selected: true } ).data().pluck(0).toArray();
    if(selection.length == 0) return;
    let selectionnum = selection.map(i=>Number(i));

    return selectionnum;
  }

  onDeleteBulk(id: number){
    this.agentsService.deleteAgent(id).subscribe(() => {
    });
  }

  onUpdateBulk(id: number, value: any){
    this.agentsService.updateAgent(id, value).subscribe((agent: any) => {
    });
  }

  onDelete(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, it cannot be recover.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.agentsService.deleteAgent(id).subscribe(() => {
          Swal.fire(
            "Agent has been deleted!",
            {
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit();
          this.rerender();  // rerender datatables
        });
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'No worries, your Agent is safe!',
          'error'
        )
      }
    });
  }

}
