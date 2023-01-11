import { Component, OnInit, ChangeDetectionStrategy ,ChangeDetectorRef  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ListsService } from '../../core/_services/hashlist/hashlist.service';
import { PreprocessorService } from '../../core/_services/config/preprocessors.service';
import { CrackerService } from '../../core/_services/config/cracker.service';
import { TasksService } from 'src/app/core/_services/tasks/tasks.sevice';

@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewTasksComponent implements OnInit {
  // Loader
  isLoading = false;
  // Config
  private priority = environment.config.tasks.priority;
  private maxAgents = environment.config.tasks.maxAgents;
  private chunkTime = environment.config.tasks.chunkTime;
  private statusTimer = environment.config.tasks.statusTimer;
  private chunkSize = environment.config.tasks.chunkSize;

  public isCollapsed = true;
  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;
  color: string = '#fff'

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  allhashlists: any;
  prep: any;
  crackertype: any;
  crackerversions: any = [];
  createForm: FormGroup

  constructor(
    private taskService: TasksService,
    private listsService:ListsService,
    private preprocessorService:PreprocessorService,
    private crackerService: CrackerService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  private maxResults = environment.config.prodApiMaxResults

  ngOnInit(): void {

    let params = {'maxResults': this.maxResults, 'filter': 'isArchived=false'}
    let params_prep = {'maxResults': this.maxResults }

    this.listsService.getAllhashlists(params).subscribe((list: any) => {
      this.allhashlists = list.values;
    });

    let params_crack = {'filter': 'crackerBinaryTypeId=1'};
    this.crackerService.getCrackerType().subscribe((crackers: any) => {
      this.crackertype = crackers.values;
    });
    this.crackerService.getCrackerBinaries(params_crack).subscribe((crackers: any) => {
      this.crackerversions = crackers.values;
    });

    this.preprocessorService.getPreprocessors(params_prep).subscribe((prep: any) => {
      this.prep = prep.values;
    });

    this.createForm = new FormGroup({
      'taskName': new FormControl('', [Validators.required]),
      'notes': new FormControl(''),
      'hashlistId': new FormControl('', [Validators.required]),
      'attackCmd': new FormControl('', [Validators.required]),
      'priority': new FormControl(null || this.priority,[Validators.required, Validators.pattern("^[0-9]*$")]),
      'maxAgents': new FormControl(null || this.maxAgents),
      'chunkTime': new FormControl(null || this.chunkTime),
      'statusTimer': new FormControl(null || this.statusTimer),
      'color': new FormControl(''),
      'isCpuTask': new FormControl(null || false),
      'skipKeyspace': new FormControl(null || 0),
      'crackerBinaryId': new FormControl(null || 1),
      "crackerBinaryTypeId": new FormControl(),
      "isArchived": new FormControl(false),
      'staticChunks': new FormControl(null || 0),
      'chunkSize': new FormControl(null || this.chunkSize),
      'forcePipe': new FormControl(null || false),
      'usePreprocessor': new FormControl(null || 0),
      'preprocessorCommand': new FormControl(''),
      'isSmall': new FormControl(null || false),
      'useNewBench': new FormControl(null || true)
    });

  }

  OnChangeValue(value){
    this.createForm.patchValue({
      color: value
    });
    this._changeDetectorRef.detectChanges();
  }

  onChangeBinary(id: string){
    let params = {'filter': 'crackerBinaryTypeId='+id+''};
    this.crackerService.getCrackerBinaries(params).subscribe((crackers: any) => {
      this.crackerversions = crackers.values;
    });
  }

  onSubmit(){
    if (this.createForm.valid) {

      this.isLoading = true;

      this.taskService.createTask(this.createForm.value).subscribe((hasht: any) => {
        const response = hasht;
        console.log(response);
        this.isLoading = false;
          Swal.fire({
            title: "Good job!",
            text: "New Task created!",
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
            text: "Task was not created, please try again!",
            icon: "warning",
            showConfirmButton: true
          });
        }
      );
    }
  }


}
