import { Component, OnInit } from '@angular/core';
import { faTrash, faHomeAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-binary',
  templateUrl: './new-binary.component.html'
})
export class NewBinaryComponent implements OnInit {
  faTrash=faTrash;
  faHome=faHomeAlt;
  faPlus=faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
