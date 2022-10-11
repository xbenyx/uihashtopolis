import { Component, OnInit } from '@angular/core';
import { faTrash, faHomeAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['../files.component.scss']
})
export class OtherComponent implements OnInit {
  faTrash=faTrash;
  faHome=faHomeAlt;
  faPlus=faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
