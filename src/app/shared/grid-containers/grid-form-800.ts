import { faEdit, faCopy, faBookmark, faArchive, faTrash  }  from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'grid-form-800',
  template: `
<div class="container">
  <div class="row justify-content-center">
    <div class="col-12 d-flex align-items-center justify-content-center">
      <div class="layout-col shadow border-0 rounded p-4 p-lg-5 w-100 fmxw-800">
      <div #content><ng-content></ng-content></div>
    </div>
  </div>
</div>
  `
})
export class GridForm800Component  {

  constructor(
    private router: Router
  ) { }

}
