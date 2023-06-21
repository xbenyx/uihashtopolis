import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'grid-main',
  template: `
<div class="container grid-container-buttompadding">
  <div class="row justify-content-center">
    <div class="col-12 d-flex align-items-center justify-content-center">
      <div class="layout-col shadow border-0 rounded p-4 p-lg-5 w-100 {{class}}">
      <div #content><ng-content></ng-content></div>
    </div>
  </div>
</div>
  `
})
export class GridMainComponent  {

  @Input() class: any;

  constructor(
    private router: Router
  ) { }

}
