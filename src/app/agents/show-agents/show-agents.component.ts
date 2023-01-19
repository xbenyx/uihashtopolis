import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { faEdit, faLock, faPauseCircle,faHomeAlt, faPlus, faFileText, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Subject} from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { AgentsService } from '../../core/_services/agents/agents.service';
import { environment } from 'src/environments/environment';

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

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

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
