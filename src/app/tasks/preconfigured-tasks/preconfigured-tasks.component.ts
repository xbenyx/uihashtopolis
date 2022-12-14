import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faEdit, faTrash, faLock, faFileImport, faFileExport, faPlus, faHomeAlt, faArchive, faCopy, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { environment } from './../../../environments/environment';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DataTableDirective } from 'angular-datatables';

import { PreTasksService } from '../../core/_services/tasks/pretasks.sevice';

@Component({
  selector: 'app-preconfigured-tasks',
  templateUrl: './preconfigured-tasks.component.html'
})
export class PreconfiguredTasksComponent implements OnInit {
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

  constructor(
    private preTasksService: PreTasksService
  ) { }

  allpretasks: any = [];
  private maxResults = environment.config.prodApiMaxResults

  ngOnInit(): void {

    let params = {'maxResults': this.maxResults}

    this.preTasksService.getAllPretasks(params).subscribe((pretasks: any) => {
      this.allpretasks = pretasks.values;
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

}
