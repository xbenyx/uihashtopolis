import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faEdit, faTrash, faEyeDropper} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { HealthcheckService } from '../../core/_services/config/healthcheck.service';
import { HashtypeService } from '../../core/_services/hashtype.service';
import { AgentBinService } from '../../core/_services/config/agentbinary.service';

@Component({
  selector: 'app-health-checks',
  templateUrl: './health-checks.component.html'
})
export class HealthChecksComponent implements OnInit {
  // Loader
  isLoading = false;
  // Form attributtes
  public isCollapsed = true;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;
  faEdit=faEdit;
  faEyeDropper=faEyeDropper;

  // Form create Health Check
  signupForm: FormGroup;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  constructor(
    private healthcheckService: HealthcheckService,
    private hashtypeService: HashtypeService,
    private agentBinService: AgentBinService,
    private route:ActivatedRoute,
    private router:Router) { }

  public binaries: {
    agentBinaryId: number,
    type: string,
    version: string,
    operatingSystems: string,
    filename: string,
    updateTrack: string,
    updateAvailable: string
  }[] = [];

  public healthc: {
    attackCmd: string,
    checkType: number,
    crackerBinaryId: number,
    expectedCracks: number,
    hashtypeId: number,
    hashtypeName: string,
    healthCheckId: number,
    status: number,
    time: number
  }[] = [];

  public htypes: {
    hashTypeId: number,
    description: string,
    isSalted: number,
    isSlowHash: number,
   }[] = [];

  private maxResults = environment.config.prodApiMaxResults;

  public mergedObjects: any

  ngOnInit(): void {

  this.signupForm = new FormGroup({
    'checkType': new FormControl(0),
    'hashtypeId': new FormControl(null || 0, [Validators.required]),
    'crackerBinaryId': new FormControl('', [Validators.required])
  });

  this.agentBinService.getAgentBin().subscribe((bin: any) => {
    this.binaries = bin;
  });

  let params = {'maxResults': this.maxResults};

  this.healthcheckService.getHealthChecks(params).subscribe((check: any) => {
    this.hashtypeService.getHashTypes().subscribe((hasht: any) => {
    this.mergedObjects = check.values.map(mainObject => {
      let matchObject = hasht.values.find(element => element.hashTypeId === mainObject.hashtypeId)
      return { ...mainObject, ...matchObject }
    })
    this.dtTrigger.next(void 0);
    });
  });

  this.dtOptions = {
    dom: 'Bfrtip',
    pageLength: 10,
    stateSave: true,
    select: true,
    buttons: ['copy', 'excel', 'csv', 'edit']
  };

  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      setTimeout(() => {
        this.dtTrigger['new'].next();
      });
    });
  }

  onSubmit(){
    if (this.signupForm.valid) {
      console.log(this.signupForm);

      this.isLoading = true;

      this.healthcheckService.createHealthCheck(this.signupForm.value).subscribe((hasht: any) => {
        const response = hasht;
        console.log(response);
        this.isLoading = false;
          Swal.fire({
            title: "Good job!",
            text: "New Health Check created!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.isCollapsed = true; //Close button new hashtype
          this.signupForm.reset(); // success, we reset form
          this.ngOnInit();
          this.rerender();  // rerender datatables
        },
        errorMessage => {
          // check error status code is 500, if so, do some action
          Swal.fire({
            title: "Error!",
            text: "Health Check was not created, please try again!",
            icon: "warning",
            showConfirmButton: true
          });
        }
      );
    }
  }

  onDelete(id: number){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        this.healthcheckService.deleteHealthCheck(id).subscribe(() => {
          Swal.fire(
            "Health Check has been deleted!",
            {
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit();
          this.rerender();  // rerender datatables
        });
      } else {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'No worries, your Health Check Task is safe!',
          'error'
        )
      }
    });
  }

}
