import { Component, OnInit, ChangeDetectionStrategy ,ChangeDetectorRef, HostListener, ViewChild  } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { faHomeAlt, faPlus, faTrash, faInfoCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ListsService } from '../../core/_services/hashlist/hashlist.service';
import { PreprocessorService } from '../../core/_services/config/preprocessors.service';
import { CrackerService } from '../../core/_services/config/cracker.service';
import { TasksService } from 'src/app/core/_services/tasks/tasks.sevice';
import { FilesService } from '../../core/_services/files/files.service';
import { DataTableDirective } from 'angular-datatables';

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

  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;
  faInfoCircle=faInfoCircle;
  faLock=faLock;
  color: string = '#fff'

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  allhashlists: any;  // ToDo change to interface
  prep: any;  // ToDo change to interface
  crackertype: any;  // ToDo change to interface
  crackerversions: any = [];
  createForm: FormGroup

  // ToDo change to interface
  public allfiles: {
      fileId: number,
      filename: string,
      size: number,
      isSecret: number,
      fileType: number,
      accessGroupId: number,
      lineCount:number
      accessGroup: {
        accessGroupId: number,
        groupName: string
      }
    }[] = [];

  constructor(
    private taskService: TasksService,
    private listsService:ListsService,
    private preprocessorService:PreprocessorService,
    private filesService: FilesService,
    private crackerService: CrackerService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  private maxResults = environment.config.prodApiMaxResults;

  ngOnDestroy(){
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {

   this.fetchData();

    this.dtOptions[0] = {
      dom: 'Bfrtip',
      scrollY: "700px",
      scrollCollapse: true,
      paging: false,
      autoWidth: false,
      // destroy: true,
      buttons: {
          dom: {
            button: {
              className: 'dt-button buttons-collection btn btn-sm-dt btn-outline-gray-600-dt',
            }
          },
      buttons:[]
      }
    }

    this.dtOptions[1] = {
      dom: 'Bfrtip',
      scrollY: "700px",
      scrollCollapse: true,
      paging: false,
      destroy: true,
      buttons: {
          dom: {
            button: {
              className: 'dt-button buttons-collection btn btn-sm-dt btn-outline-gray-600-dt',
            }
          },
      buttons:[]
      }
    }

    this.dtOptions[2] = {
      dom: 'Bfrtip',
      scrollY: "700px",
      scrollCollapse: true,
      paging: false,
      destroy: true,
      buttons: {
          dom: {
            button: {
              className: 'dt-button buttons-collection btn btn-sm-dt btn-outline-gray-600-dt',
            }
          },
      buttons:[]
      }
    }

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

  async fetchData() {
    let params = {'maxResults': this.maxResults, 'filter': 'isArchived=false'}
    let params_prep = {'maxResults': this.maxResults }
    let params_crack = {'filter': 'crackerBinaryTypeId=1'};
    let params_f = {'maxResults': this.maxResults, 'expand': 'accessGroup'}

    await this.listsService.getAllhashlists(params).subscribe((list: any) => {
      this.allhashlists = list.values;
    });

    await this.crackerService.getCrackerType().subscribe((crackers: any) => {
      this.crackertype = crackers.values;
    });

    await this.crackerService.getCrackerBinaries(params_crack).subscribe((crackers: any) => {
      this.crackerversions = crackers.values;
    });

    await this.preprocessorService.getPreprocessors(params_prep).subscribe((prep: any) => {
      this.prep = prep.values;
    });

    await this.filesService.getFiles(params_f).subscribe((files: any) => {
      this.allfiles = files.values;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        setTimeout(() => {
          this.dtTrigger[0].next(null);
          dtInstance.columns.adjust();
        });
     });
    });
  }

  active= 0; //Active show first table wordlist

  ngAfterViewInit() {

    setTimeout(() => {
      this.active = 1;
    },2000);
    this.dtTrigger.next(null);

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

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
      $event.returnValue = "IE and Edge Message";
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.createForm.valid) {
    return false;
    }
    return true;
  }

}
