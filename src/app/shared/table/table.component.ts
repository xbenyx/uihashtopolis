import { DataTableDirective } from 'angular-datatables';
import { Component, ViewChild } from '@angular/core';
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
