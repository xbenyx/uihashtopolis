import { Component, OnInit, OnDestroy } from '@angular/core';
import { faHomeAlt, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { TasksService } from '../../core/_services/tasks/tasks.sevice';

@Component({
  selector: 'app-edit-tasks',
  templateUrl: './edit-tasks.component.html'
})
export class EditTasksComponent implements OnInit {

  editMode = false;
  editedTaskIndex: number;
  editedTask: any // Change to Model

  faHome=faHomeAlt;
  isLoading = false;

  constructor(
    private tasksService: TasksService,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  color: string = '';
  private maxResults = environment.config.prodApiMaxResults

  updateForm = new FormGroup({
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

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.editedTaskIndex = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
    this.tasksService.getTask(this.editedTaskIndex).subscribe((result)=>{      });
  }

  OnChangeValue(value){
    this.updateForm.patchValue({
      updateData:{color: value}
    });
  }

  onSubmit(){
    if (this.updateForm.valid) {

      this.isLoading = true;

      this.tasksService.updateTask(this.editedTaskIndex,this.updateForm.value['updateData']).subscribe((hasht: any) => {
        const response = hasht;
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
      this.updateForm = new FormGroup({
        'taskId': new FormControl(result['taskId']),
        'forcePipe': new FormControl(result['forcePipe']),
        'skipKeyspace': new FormControl(result['skipKeyspace']),
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

}
