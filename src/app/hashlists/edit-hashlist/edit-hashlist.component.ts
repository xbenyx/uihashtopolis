import { Component, OnInit, ViewChild} from '@angular/core';
import { faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { environment } from './../../../environments/environment';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { ListsService } from '../../core/_services/hashlist/hashlist.service';

@Component({
  selector: 'app-edit-hashlist',
  templateUrl: './edit-hashlist.component.html'
})
export class EditHashlistComponent implements OnInit {

  editMode = false;
  editedHashlistIndex: number;
  editedHashlist: any // Change to Model

  faHome=faHomeAlt;
  isLoading = false;

  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: any = {};

  constructor(
    private listsService: ListsService,
    private route:ActivatedRoute,
    private router: Router
  ) { }

  private maxResults = environment.config.prodApiMaxResults

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.editedHashlistIndex = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
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

  private initForm() {
    this.isLoading = true;
    if (this.editMode) {
    this.listsService.getHashlist(this.editedHashlistIndex).subscribe((result)=>{
      this.editedHashlist = result;
      // this.updateForm = new FormGroup({
      //   'pretaskId': new FormControl(result['pretaskId'], Validators.required),
      //   'statusTimer': new FormControl(result['statusTimer'], Validators.required),
      //   'useNewBench': new FormControl(result['useNewBench'], Validators.required),
      //   'updateData': new FormGroup({
      //     'taskName': new FormControl(result['taskName'], Validators.required),
      //     'attackCmd': new FormControl(result['attackCmd'], Validators.required),
      //     'chunkTime': new FormControl(result['chunkTime'], Validators.required),
      //     'color': new FormControl(result['color'], Validators.required),
      //     'priority': new FormControl(result['priority'], Validators.required),
      //     'maxAgents': new FormControl(result['maxAgents'], Validators.required),
      //     'isCpuTask': new FormControl(result['isCpuTask'], Validators.required),
      //     'isSmall': new FormControl(result['isSmall'], Validators.required),
      //   }),
      // });
      this.isLoading = false;
    });
   }
  }

}
