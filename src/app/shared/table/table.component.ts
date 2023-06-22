import { faEdit, faCopy, faBookmark, faArchive, faTrash  }  from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  template: `
<div class="card shadow">
  <div class="card-body table-responsive">
      <div #content><ng-content></ng-content></div>
  </div>
</div>
  `
})
export class TableComponent  {

  constructor(
    private router: Router
  ) { }

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};


}
