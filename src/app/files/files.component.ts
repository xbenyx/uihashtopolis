import { Component, OnInit } from '@angular/core';
import { faTrash, faHomeAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  faTrash=faTrash;
  faHome=faHomeAlt;
  faPlus=faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
