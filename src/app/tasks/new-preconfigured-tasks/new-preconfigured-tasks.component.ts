import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';

import { PreTasksService } from '../../core/_services/tasks/pretasks.sevice';
import { CrackerService } from '../../core/_services/config/cracker.service';

@Component({
  selector: 'app-new-preconfigured-tasks',
  templateUrl: './new-preconfigured-tasks.component.html'
})
export class NewPreconfiguredTasksComponent implements OnInit {
  // Loader
  isLoading = false;
  // Config
  private priority = environment.config.tasks.priority;
  private maxAgents = environment.config.tasks.maxAgents;
  private chunkTime = environment.config.tasks.chunkTime;
  private statusTimer = environment.config.tasks.statusTimer;

  constructor(
    private preTasksService: PreTasksService,
    private crackerService: CrackerService,
  ) { }

  createForm: FormGroup
  crackertype: any
  color: string = '#fff'

  ngOnInit(): void {

    this.createForm = new FormGroup({
      'taskName': new FormControl('', [Validators.required]),
      'attackCmd': new FormControl('', [Validators.required]),
      'priority': new FormControl(null || this.priority,[Validators.required, Validators.pattern("^[0-9]*$")]),
      'maxAgents': new FormControl(null || this.maxAgents),
      'chunkTime': new FormControl(null || this.chunkTime),
      'statusTimer': new FormControl(null || this.statusTimer),
      'color': new FormControl(''),
      'isCpuTask': new FormControl(null || false),
      "crackerBinaryTypeId": new FormControl(null || 0),
      'isSmall': new FormControl(null || false),
      'useNewBench': new FormControl(null || true),
      'isMaskImport': new FormControl(false),
      'files': new FormControl('')
    });

    this.crackerService.getCrackerType().subscribe((crackers: any) => {
      this.crackertype = crackers.values;
    });

  }

  OnChangeValue(value){
    this.createForm.patchValue({
      color: value
    });
    // this._changeDetectorRef.detectChanges();
  }

  onSubmit(){
    if (this.createForm.valid) {

      this.isLoading = true;

      this.preTasksService.createPretask(this.createForm.value).subscribe((pret: any) => {
        const response = pret;
        console.log(response);
        this.isLoading = false;
          Swal.fire({
            title: "Good job!",
            text: "New PreTask created!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.createForm.reset(); // success, we reset form
        },
        errorMessage => {
          // check error status code is 500, if so, do some action
          Swal.fire({
            title: "Error!",
            text: "PreTask was not created, please try again!",
            icon: "warning",
            showConfirmButton: true
          });
        }
      );
    }
  }

}
