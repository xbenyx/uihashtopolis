import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../service/projects/projects.service';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  public isCollapsed = true;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;
  faEdit=faEdit;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  public projects: {preprocessorId: number}[] = [];


  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    this.projectService.projects().subscribe((proj: any) => {
      this.projects = proj;
      this.dtTrigger.next(void 0);
    });
    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      stateSave: true,
      select: true,
      buttons: ['copy', 'excel', 'csv', 'edit']
    };
  }

}
