import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import { AgentBinService } from '../../service/config/agentbinary.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html'
})
export class NewTasksComponent implements OnInit {
  public isCollapsed = true;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    Swal.fire({
      title: "Good job!",
      text: "New Binary created!",
      icon: "success",
      button: "Close",
    });
  }


}
