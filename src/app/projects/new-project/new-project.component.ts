import { faHomeAlt, faPlus, faTrash, faEdit, faCode, faCalendar, faFileText, faBook, faFilePdf} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html'
})

export class NewProjectComponent implements OnInit {

  constructor() { }

  faBook=faBook;

  ngOnInit() {

  }


}
