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

@Component({
  selector: 'app-new-tasks',
  templateUrl: './new-tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTasksComponent implements OnInit {
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

    this.crackerService.getCrackerType().subscribe((crackers: any) => {
      this.crackertype = crackers.values;
    });

    this.preprocessorService.getPreprocessors(params_prep).subscribe((prep: any) => {
      this.prep = prep.values;
    });

    this.createForm = new FormGroup({
      'taskName': new FormControl('', [Validators.required]),
      'attackCmd': new FormControl('', [Validators.required]),
      'chunkTime': new FormControl(null || 600),
      'statusTimer': new FormControl(null || 5),
      'priority': new FormControl(null || 0,[Validators.required, Validators.pattern("^[0-9]*$")]),
      'maxAgents': new FormControl(null || 0 ),
      'color': new FormControl(''),
      'isCpuTask': new FormControl(''),
      'skipKeyspace': new FormControl(null || 0,[Validators.required, Validators.pattern("^[0-9]*$")]),
      'crackerBinaryId': new FormControl(''),
      "crackerBinaryTypeId": new FormControl(''),
      "isArchived": new FormControl(''),
      'notes': new FormControl(''),
      'staticChunks': new FormControl(''),
      'chunkSize': new FormControl(null || 600),
      'forcePipe': new FormControl(''),
      'usePreprocessor': new FormControl(''),
      'preprocessorCommand': new FormControl(''),
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
    this.crackerService.getCrackerBinary(params).subscribe((crackers: any) => {
      this.crackerversions = crackers.values;
    });
  }

  onSubmit(){

  }


}
