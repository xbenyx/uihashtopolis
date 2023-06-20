import { faEdit, faCopy, faBookmark, faArchive, faTrash  }  from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'grid-form-input',
  template: `
<div class="form-group">
  <div class="form-outline form-input-custom">
      <label class="form-label {{labelclass}}" for={{name}} >{{name}}</label>
      <div #content><ng-content></ng-content></div>
  </div>
</div>
  `
})
export class GridFormInputComponent  {

  @Input() name?: any;
  @Input() labelclass?: any;

  constructor(
    private router: Router
  ) { }

}
