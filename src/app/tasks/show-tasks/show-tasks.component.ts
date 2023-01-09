import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faTrash, faLock, faFileImport, faFileExport, faPlus, faHomeAlt, faArchive, faCopy, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { environment } from './../../../environments/environment';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DataTableDirective } from 'angular-datatables';

import { TasksService } from '../../core/_services/tasks/tasks.sevice';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html'
})
export class ShowTasksComponent implements OnInit {
  faEdit=faEdit;
  faTrash=faTrash;
  faLock=faLock;
  faFileImport=faFileImport;
  faFileExport=faFileExport;
  faPlus=faPlus;
  faHome=faHomeAlt;
  faArchive=faArchive;
  faCopy=faCopy;
  faBookmark=faBookmark;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  alltasks: any = [];
  isArchived: boolean;
  whichView: string;

  private maxResults = environment.config.prodApiMaxResults

  constructor(
    private tasksService: TasksService,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      switch (data['kind']) {

        case 'show-tasks':
          this.whichView = 'live';
          this.isArchived = false;
        break;

        case 'show-tasks-archived':
          this.whichView = 'archived';
          this.isArchived = true;
        break;

      }

    let params = {'maxResults': this.maxResults, 'expand': 'crackerBinary,crackerBinaryType', 'filter': 'isArchived='+this.isArchived+''}

    this.tasksService.getAlltasks(params).subscribe((tasks: any) => {
      this.alltasks = tasks.values;
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

 });

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

  onArchive(id: number){
    this.tasksService.archiveTask(id).subscribe((tasks: any) => {
      Swal.fire({
        title: "Good job!",
        text: "Archived!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });
      this.ngOnInit();
      this.rerender();  // rerender datatables
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
        this.tasksService.deleteTask(id).subscribe(() => {
          Swal.fire(
            "Task has been deleted!",
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
          'No worries, your Task is safe!',
          'error'
        )
      }
    });
  }

}
