import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { faHomeAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Observable, Subject } from 'rxjs';

import { ChunkService } from '../../core/_services/chunks.service';
import { TasksService } from '../../core/_services/tasks/tasks.sevice';
import { AgentsService } from '../../core/_services/agents/agents.service';
import { CrackerService } from '../../core/_services/config/cracker.service';
import { PendingChangesGuard } from 'src/app/core/_guards/pendingchanges.guard';
import { UIConfigService } from 'src/app/core/_services/shared/storage.service';

@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html'
})
export class EditTasksComponent implements OnInit,PendingChangesGuard {

  editMode = false;
  editedTaskIndex: number;
  editedTask: any // Change to Model

  faHome=faHomeAlt;
  faEye=faEye;
  isLoading = false;

  constructor(
    private crackerService: CrackerService,
    private agentsService: AgentsService,
    private tasksService: TasksService,
    private chunkService: ChunkService,
    private uiService:UIConfigService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  updateForm: FormGroup;
  color: string = '';
  private maxResults = environment.config.prodApiMaxResults

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};
  uidateformat:any;
  crackerinfo:any;
  getchunks: any;

  ngOnInit() {
    this.uidateformat = this.uiService.getUIsettings('timefmt').value;

    this.route.params
    .subscribe(
      (params: Params) => {
        this.editedTaskIndex = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        this.assignChunksInit(this.editedTaskIndex);
      }
    );

    this.updateForm = new FormGroup({
      'taskId': new FormControl({value: '', disabled: true}),
      'forcePipe': new FormControl({value: '', disabled: true}),
      'skipKeyspace': new FormControl({value: '', disabled: true}),
      'keyspace': new FormControl({value: '', disabled: true}),
      'keyspaceProgress': new FormControl({value: '', disabled: true}),
      'crackerBinaryId': new FormControl({value: '', disabled: true}),
      'chunkSize': new FormControl({value: '', disabled: true}),
      'updateData': new FormGroup({
        'taskName': new FormControl(''),
        'attackCmd': new FormControl(''),
        'notes': new FormControl(''),
        'color': new FormControl(''),
        'chunkTime': new FormControl(''),
        'statusTimer': new FormControl(''),
        'priority': new FormControl(''),
        'maxAgents': new FormControl(''),
        'isCpuTask': new FormControl(''),
        'isSmall': new FormControl(''),
      }),
    });

  }

  OnChangeValue(value){
    this.updateForm.patchValue({
      updateData:{color: value}
    });
  }

  onSubmit(){
    if (this.updateForm.valid) {

      this.isLoading = true;

      this.tasksService.updateTask(this.editedTaskIndex,this.updateForm.value['updateData']).subscribe((tasks: any) => {
        const response = tasks;
        console.log(response);
        this.isLoading = false;
          Swal.fire({
            title: "Good job!",
            text: "Task updated!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.updateForm.reset(); // success, we reset form
          this.router.navigate(['tasks/show-tasks']);
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

  private initForm() {
    this.isLoading = true;
    if (this.editMode) {
    this.tasksService.getTask(this.editedTaskIndex).subscribe((result)=>{
      this.color = result['color'];
      this.crackerService.getCrackerBinary(result['crackerBinaryId']).subscribe((val) => {
        this.crackerinfo = val;
      });
      this.tkeyspace = result['keyspace'];
      this.tusepreprocessor = result['usePreprocessor'];
      this.updateForm = new FormGroup({
        'taskId': new FormControl(result['taskId']),
        'forcePipe': new FormControl(result['forcePipe']== true? 'Yes':'No'),
        'skipKeyspace': new FormControl(result['skipKeyspace'] > 0?result['skipKeyspace']:'N/A'),
        'keyspace': new FormControl(result['keyspace']),
        'keyspaceProgress': new FormControl(result['keyspaceProgress']),
        'crackerBinaryId': new FormControl(result['crackerBinaryId']),
        'chunkSize': new FormControl(result['chunkSize']),
        'updateData': new FormGroup({
          'taskName': new FormControl(result['taskName'], Validators.required),
          'attackCmd': new FormControl(result['attackCmd'], Validators.required),
          'notes': new FormControl(result['notes'], Validators.required),
          'color': new FormControl(result['color'], Validators.required),
          'chunkTime': new FormControl(result['chunkTime'], Validators.required),
          'statusTimer': new FormControl(result['statusTimer'], Validators.required),
          'priority': new FormControl(result['priority'], Validators.required),
          'maxAgents': new FormControl(result['maxAgents'], Validators.required),
          'isCpuTask': new FormControl(result['isCpuTask'], Validators.required),
          'isSmall': new FormControl(result['isSmall'], Validators.required),
        }),
      });
      this.isLoading = false;
    });
   }
  }

  attachFilesInit(id: number){
    this.dtOptions[0] = {
      dom: 'Bfrtip',
      scrollY: "700px",
      scrollCollapse: true,
      paging: false,
      autoWidth: false,
      buttons: {
          dom: {
            button: {
              className: 'dt-button buttons-collection btn btn-sm-dt btn-outline-gray-600-dt',
            }
          },
      buttons:[]
      }
    }
  }

  assingAgentInit(id: number){
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
  }

/**
 * This function calculates Keyspace searched, Time Spent and Estimated Time
 *
**/
  // Keyspace searched
  cprogress: any;
  tkeyspace: any;
  tusepreprocessor: any;
  // Time Spent
  ctimespent: any;
  timeCalc(chunks){
      var cprogress = [];
      var timespent = [];
      var current = 0;
      for(let i=0; i < chunks.length; i++){
        cprogress.push(chunks[i].checkpoint - chunks[i].skip);
        if(chunks[i].dispatchTime > current){
          timespent.push(chunks[i].solveTime - chunks[i].dispatchTime);
        } else if (chunks[i].solveTime > current) {
          timespent.push(chunks[i].solveTime- current);
        }
      }
      this.cprogress = cprogress.reduce((a, i) => a + i);
      this.ctimespent = timespent.reduce((a, i) => a + i);
  }

  assignChunksInit(id: number){
    let params = {'maxResults': this.maxResults};
    this.chunkService.getChunks(params).subscribe((result: any)=>{
      var getchunks = result.values.filter(u=> u.taskId == id);
      this.timeCalc(getchunks);
      this.agentsService.getAgents(params).subscribe((agents: any) => {
      this.getchunks = getchunks.map(mainObject => {
        let matchObject = agents.values.find(element => element.agentId === mainObject.agentId)
        return { ...mainObject, ...matchObject }
        })
      this.dtTrigger.next(void 0);
      });
    });

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
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
        $event.returnValue = "IE and Edge Message";
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.updateForm.valid) {
    return false;
    }
    return true;
  }

}
