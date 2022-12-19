import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../core/_services/tasks/tasks.sevice';
import { faEdit, faTrash, faLock, faFileImport, faFileExport, faPlus, faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

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

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  alltasks: any = [];
  constructor(private tasksService: TasksService) { }

  ngOnInit(): void {
    this.tasksService.getAlltasks().subscribe((tasks: any) => {
      this.alltasks = tasks;
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

  deleteTask(id: number){

  }

}
