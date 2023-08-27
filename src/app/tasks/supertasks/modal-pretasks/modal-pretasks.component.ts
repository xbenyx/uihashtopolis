import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

import { GlobalService } from 'src/app/core/_services/main.service';
import { SERV } from '../../../core/_services/main.config';

@Component({
  selector: 'app-modal-st-pretasks',
  templateUrl: './modal-pretasks.component.html'
})
export class ModalPretasksComponent implements OnInit {

  @Input() title?: any;
  faTrash=faTrash;
  pretasks: any;
  prep: any;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  createForm: FormGroup;

  constructor(
    public modal: NgbActiveModal
    ) { }

  ngOnInit(): void {

    this.pretasks = this.prep;
    this.dtTrigger.next(null);

    this.dtOptions = {
      dom: 'Bfrtip',
      destroy: true,
      select: {
        style: 'multi',
        },
      buttons:[]
    };

    this.createForm = new FormGroup({
      'action': new FormControl('' || [])
    });

  }

  ngAfterViewInit(){
    this.dtTrigger.next(null);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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

  filesFormArray: Array<any> = [];
  onChange(fileId:number, $target: EventTarget) {
    const isChecked = (<HTMLInputElement>$target).checked;
    if(isChecked) {
      this.filesFormArray = this.createForm.get('action').value;
      this.createForm.get('action').value;
      this.createForm.patchValue({files: this.filesFormArray});
    }

  }

}
