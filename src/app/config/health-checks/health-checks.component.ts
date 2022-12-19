import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faTrash, faEyeDropper} from '@fortawesome/free-solid-svg-icons';
import { HealthcheckService } from '../../core/_services/config/healthcheck.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-health-checks',
  templateUrl: './health-checks.component.html'
})
export class HealthChecksComponent implements OnInit {
  public isCollapsed = true;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;
  faEyeDropper=faEyeDropper;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  constructor(private healthcheckService: HealthcheckService,
    private route:ActivatedRoute, private router:Router, private http: HttpClient) { }

  public healthc: {healthCheckId: number, time: number, status: number, checkType: number, hashtypeId: number, crackerBinaryId:number, expectedCracks: number,  attackCmd:string }[] = [];

  mergedSubjects: []

  ngOnInit(): void {

    const healthc = this.healthcheckService.getHealthChecks().subscribe((check: any) => {
      this.healthc = check;
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

  onSubmit(){
    Swal.fire({
      title: "Good job!",
      text: "New Hashtype created!",
      icon: "success",
      button: "Close",
    });
  }

  onDelete(id: number){
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      showCancelButton: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        Swal.fire(
          "File has been deleted!",
          {
          icon: "success",
        });
      } else {
        Swal.fire("Your imaginary file is safe!")
      }
    });
  }

}
