import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperTasksService } from '../../core/_services/tasks/supertasks.sevice';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { environment } from './../../../environments/environment';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-supertasks',
  templateUrl: './supertasks.component.html'
})
export class SupertasksComponent implements OnInit {

  faEdit=faEdit;
  faTrash=faTrash;
  faPlus=faPlus;

  allsupertasks: any = [];

  constructor(
    private supertaskService: SuperTasksService,
    private route:ActivatedRoute
  ) { }

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private maxResults = environment.config.prodApiMaxResults

  ngOnInit(): void {
    let params = {'maxResults': this.maxResults }

    this.supertaskService.getAllsupertasks(params).subscribe((stasks: any) => {
      this.allsupertasks = stasks.values;
      this.dtTrigger.next(void 0);
    });

    this.dtOptions = {
      dom: 'Bfrtip',
      stateSave: true,
      select: true,
      pageLength: 50,
      "order": [ [6, 'desc'], [0, 'asc'] ],
      "columnDefs": [
        { "orderable": false, "targets": [3, 8] },
        { "orderable": true, "targets": [0, 1, 2, 4, 5, 6, 7] }
      ],
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
      text: "Once deleted, it can not be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.supertaskService.deleteSupertask(id).subscribe(() => {
          Swal.fire(
            "SuperTask has been deleted!",
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
          'No worries, your SuperTask is safe!',
          'error'
        )
      }
    });
  }

}
