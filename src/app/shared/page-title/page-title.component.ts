import { faPlus }  from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html'
})
export class PageTitleComponent  {

  faPlus=faPlus;

  @Input() title: any;
  @Input() buttontitle?: any;
  @Input() buttonlink?: any;
  @Input() subbutton?: boolean;

  constructor(
    private router: Router
  ) { }

  redirect(){
    this.router.navigate([this.buttonlink]);
  }

}
