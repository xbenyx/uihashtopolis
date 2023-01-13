import { Component, OnInit, OnDestroy, ChangeDetectionStrategy ,ChangeDetectorRef, ViewChild   } from '@angular/core';
import { faHomeAlt, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { environment } from './../../../environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DataTableDirective } from 'angular-datatables';

import { PreTasksService } from '../../core/_services/tasks/pretasks.sevice';
import { Pretask } from '../../core/_models/pretask';


@Component({
  selector: 'app-edit-preconfigured-tasks',
  templateUrl: './edit-preconfigured-tasks.component.html'
})
export class EditPreconfiguredTasksComponent implements OnInit{

  editMode = false;
  editedPretaskIndex: number;
  editedPretask: any // Change to Model

  faHome=faHomeAlt;
  faPlus=faPlus;
  faTrash=faTrash;
  isLoading = false;

  constructor(
    private preTasksService: PreTasksService,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  pretask: any = [];
  color: string = '';
  updateForm: FormGroup
  private maxResults = environment.config.prodApiMaxResults

  // Table Files
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  files: any //Add Model

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.editedPretaskIndex = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );

    this.updateForm = new FormGroup({
      'pretaskId': new FormControl({value: '', disabled: true}),
      'statusTimer': new FormControl({value: '', disabled: true}),
      'useNewBench': new FormControl({value: '', disabled: true}),
      'updateData': new FormGroup({
      'taskName': new FormControl(''),
      'attackCmd': new FormControl(''),
      'chunkTime': new FormControl(''),
      'color': new FormControl(''),
      'priority': new FormControl(''),
      'maxAgents': new FormControl(''),
      'isCpuTask': new FormControl(''),
      'isSmall': new FormControl(''),
      }),
    });

    // Files Table

    let params = {
      'maxResults': this.maxResults,
      // 'filter': 'pretaskId='+this.editedPretaskIndex+'',
      'expand': 'pretaskFiles'
    }

    this.preTasksService.getAllPretasks(params).subscribe((pretasks: any) => {
      this.files = pretasks.values;
      this.dtTrigger.next(void 0);
    });

    this.dtOptions = {
      dom: 'Bfrtip',
      pageLength: 10,
      stateSave: true,
      select: true,
      buttons: [ 'copy', 'excel', 'csv']
    };

  }

  OnChangeValue(value){
    this.updateForm.patchValue({
      updateData:{color: value}
    });
  }

  onSubmit(){
    if (this.updateForm.valid) {

      this.isLoading = true;

      this.preTasksService.updatePretask(this.editedPretaskIndex,this.updateForm.value['updateData']).subscribe((hasht: any) => {
        const response = hasht;
        console.log(response);
        this.isLoading = false;
          Swal.fire({
            title: "Good job!",
            text: "Pretask updated!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.updateForm.reset(); // success, we reset form
          this.router.navigate(['tasks/preconfigured-tasks']);
        },
        errorMessage => {
          // check error status code is 500, if so, do some action
          Swal.fire({
            title: "Error!",
            text: "Pretask was not created, please try again!",
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
    this.preTasksService.getPretask(this.editedPretaskIndex).subscribe((result)=>{
      this.pretask = result;
      this.color = result['color'];
      this.updateForm = new FormGroup({
        'pretaskId': new FormControl(result['pretaskId'], Validators.required),
        'statusTimer': new FormControl(result['statusTimer'] + ' seconds', Validators.required),
        'useNewBench': new FormControl(result['useNewBench'], Validators.required),
        'updateData': new FormGroup({
          'taskName': new FormControl(result['taskName'], Validators.required),
          'attackCmd': new FormControl(result['attackCmd'], Validators.required),
          'chunkTime': new FormControl(result['chunkTime'], Validators.required),
          'color': new FormControl(result['color'], Validators.required),
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
